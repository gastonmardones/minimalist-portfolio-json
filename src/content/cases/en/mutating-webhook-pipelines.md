---
title: "An APM webhook that broke every pipeline"
summary: "Overnight, pipelines in dozens of namespaces started failing at the first step. The cause was a mutating webhook installed by a monitoring agent."
date: 2026-09-10
tags: ["Tekton", "SCC", "Admission webhooks", "CI/CD"]
draft: false
---

## Context

OpenShift cluster with hundreds of Tekton pipelines. CI pods run as UID 65532 under a pipelines-specific SCC.

## Symptom

PipelineRuns failing at the code clone step with two errors: PodAdmissionFailed for an out-of-range runAsUser, and Permission denied on the git user's home.

```plaintext
PodAdmissionFailed: runAsUser: Invalid value: 65532:
  must be in the ranges: [1000660000, 1000669999]
```

## Diagnosis

1. Confirmed it was cluster-wide: dozens of namespaces, always the same step, starting at a specific time.
2. UID 65532 wasn't new: every catalog ClusterTask uses it and the pipelines SCC allows it.
3. Listing mutating webhooks revealed a new one from an APM agent installed the previous afternoon, intercepting every pod in the cluster.
4. The webhook injected an init-container with a fixed UID and seccomp profile. Once mutated, SCC evaluation fell through to restricted-v2, which requires a UID within the namespace range.
5. Used the apiserver audit log to rebuild the timeline: install, first failure, uninstall and first successful pipeline.

## Root cause

A cluster-wide mutating webhook that also modified ephemeral CI pods, pushing them out of their intended SCC.

## Fix

1. The mitigation was uninstalling the agent's operator; pipelines recovered within minutes.
2. Documented a side effect: a manifest-update task without HOME set failed to copy SSH credentials. Proposed setting HOME=/tekton/home.
3. Left a recommendation for any reinstall: exclude CI namespaces from agent injection.

## Takeaways

- For mass admission failures, list mutating and validating webhooks first.
- The apiserver audit log lets you rebuild who changed what and when.
- Sidecar-injecting tools need an explicit scope: CI shouldn't be included by default.
