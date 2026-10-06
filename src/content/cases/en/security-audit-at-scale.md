---
title: "Security audit across ~1,000 repositories, fully local"
summary: "The goal was to find vulnerabilities and exposed secrets across the organization's entire codebase: not just source code, but also scripts, config and docs."
date: 2026-09-25
tags: ["DevSecOps", "Semgrep", "gitleaks", "Python"]
draft: false
---

## Context

Around a thousand Git repositories, one per application, across dozens of languages and frameworks. An existing SonarQube Community instance only analyzed the source directory.

## Symptom

Development teams needed a complete, prioritized view, without relying on external services and without exposing the secrets found.

## Diagnosis

1. SonarQube Community doesn't detect secrets in files without an assigned language (.env, .sh, .md) and has no taint analysis.
2. A bulk run against the existing instance brought it down due to resource limits: the scanner needs the server to fetch rules and store results.
3. Chose Semgrep CE, which runs fully locally with 1,100+ security rules downloaded once and telemetry off, plus gitleaks for secrets in files and history.

## Root cause

The existing tool didn't cover the required scope (the whole repository) and didn't scale to a bulk run.

## Fix

1. Python scripts that clone each repo, run Semgrep and gitleaks, and are resumable (JSONL results) to survive timeouts.
2. A report that merges both tools into one schema: findings, per-project and per-file summaries, flagging files detected by both.
3. Secret values are never written to the report: only location and type.
4. Prioritization by severity and confidence, filtering vendored third-party code.

## Takeaways

- Pick the tool for the real scope (whole repo and history), not for what's already installed.
- In bulk scans, resumability matters as much as the rules.
- A security report must not become a new leak.
