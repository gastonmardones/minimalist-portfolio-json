---
title: "Console log view broken by stale managedFields"
summary: "Several teams couldn't see their QA namespaces in Observe → Logs. It looked like RBAC; it was a Server-Side Apply conflict that had kept the observability operator degraded for months."
date: 2026-10-05
tags: ["OpenShift", "Operators", "Server-Side Apply", "RBAC"]
draft: false
---

## Context

OpenShift console with the logging plugin managed by the Cluster Observability Operator. Log read access is granted through RoleBindings via GitOps.

## Symptom

Users from different projects only saw their development namespaces in the log filter, never QA. After an operator upgrade, the Logs tab disappeared altogether.

```plaintext
updater failed to patch: .spec.i18n: field not declared in schema
```

## Diagnosis

1. Ruled out RBAC with a real SubjectAccessReview against the API (allowed: true). The local oc auth can-i gave a false negative for this resource.
2. Confirmed GitOps was in sync with no drift and compared against control groups for which it worked.
3. Temporarily isolated a user into a single control group: the symptom persisted. It was systemic, not permissions.
4. The operator's UIPlugin had been Degraded for 5 months with a looping "field not declared in schema" error.
5. The v1 CRD did declare those fields. The ConsolePlugin's managedFields held a single entry recorded with apiVersion v1alpha1 from the original install.

## Root cause

On Server-Side Apply in v1, the apiserver converted the field set stored as v1alpha1, a version without those fields, and rejected the patch. The operator never finished reconciling or registering the plugin in the console.

## Fix

1. Backed up the resource and cleared the stale managedFields with a patch.
2. Forced a UIPlugin reconcile: it became Reconciled and Available for the first time in 5 months.
3. The plugin was registered in the console again and the operator stopped erroring. No support case needed.

## Takeaways

- Validate permissions with SubjectAccessReview, not only can-i.
- When the error says "field not declared in schema" but the CRD declares it, check managedFields and the apiVersion they were recorded with.
- A resource Degraded for months often explains symptoms that look like a different layer.
