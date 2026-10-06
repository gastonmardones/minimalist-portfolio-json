---
title: "Loki WAL at 100%: it wasn't the storage"
summary: "The ingesters' WAL disks were full. It looked like a known object storage issue, but it was a checkpoint stuck in a disk-full loop."
date: 2026-08-28
tags: ["Loki", "OpenShift Logging", "Storage", "Troubleshooting"]
draft: false
---

## Context

OpenShift logging stack (LokiStack) whose ingesters write a Write-Ahead Log to 150 GiB volumes before flushing to S3-compatible object storage.

## Symptom

Both ingesters were Ready but their WAL volumes were at 100%. Months earlier a full S3 bucket had caused something similar, so that was the first suspect.

```plaintext
level=error caller=checkpoint.go:613 msg="error checkpointing series"
  err="write /tmp/wal/00080651: no space left on device"
```

## Diagnosis

1. Ruled out storage: logs showed S3 flushes working, dozens of streams per minute and zero quota errors.
2. The ingester logs showed the real pattern: every 5 minutes Loki tried to checkpoint and failed with "no space left on device".
3. Without a successful checkpoint Loki cannot truncate old WAL segments, so the disk never freed up. It had been looping for 4 days.
4. There was also an interrupted checkpoint (.tmp) of more than 7 GB per ingester.

## Root cause

A loop: full disk → checkpoint fails → no segment truncation → disk stays full. The object storage was healthy.

## Fix

1. Deleted the interrupted .tmp checkpoint, which is never used for replay.
2. Not enough. df showed 95%, but the process runs as non-root and ext4 reserves ~5% for root: stat -f showed the space actually available.
3. Also deleted the previous complete checkpoint after confirming S3 flushes were still active. A checkpoint is only a replay optimization; the WAL segments are the source of truth.
4. The next automatic checkpoint completed and Loki truncated about 130 old segments. WAL went from 100% to 3%, with no pod restarts and no data loss.

## Takeaways

- The same symptom as a past incident doesn't mean the same cause: rule things out again from evidence.
- To measure the space available to a non-root process, use stat -f (Available), not just df.
- Knowing which state is an optimization and which is the source of truth lets you fix things without downtime.
