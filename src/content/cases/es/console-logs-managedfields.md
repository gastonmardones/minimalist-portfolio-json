---
title: "La vista de logs de la consola, rota por un managedFields viejo"
summary: "Varios equipos no veían sus namespaces de QA en Observe → Logs. Parecía RBAC; era un conflicto de Server-Side Apply que tenía al operador de observabilidad degradado hacía meses."
date: 2026-10-05
tags: ["OpenShift", "Operators", "Server-Side Apply", "RBAC"]
draft: false
---

## Contexto

Consola de OpenShift con el plugin de logs gestionado por el Cluster Observability Operator. Los permisos de lectura de logs se otorgan por RoleBinding vía GitOps.

## Síntoma

Usuarios de distintos proyectos solo veían sus namespaces de desarrollo en el filtro de logs, nunca los de QA. Después de un upgrade del operador, la pestaña de logs directamente desapareció.

```plaintext
updater failed to patch: .spec.i18n: field not declared in schema
```

## Diagnóstico

1. Descarté RBAC con una SubjectAccessReview real contra la API (allowed: true). El oc auth can-i local daba un falso negativo con este recurso.
2. Verifiqué que GitOps estuviera sincronizado, sin drift, y comparé con grupos de control a los que sí les funcionaba.
3. Aislé temporalmente a un usuario en un solo grupo de control: el síntoma seguía. Era sistémico, no de permisos.
4. El UIPlugin del operador estaba Degraded desde hacía 5 meses, con un error en loop: "field not declared in schema".
5. El CRD v1 sí declaraba esos campos. El managedFields del ConsolePlugin tenía registrada una única entrada con apiVersion v1alpha1, de la instalación original.

## Causa raíz

Al hacer Server-Side Apply en v1, el apiserver convertía el field set guardado como v1alpha1, versión que no tiene esos campos, y rechazaba el patch. El operador nunca terminaba de reconciliar ni de registrar el plugin en la consola.

## Solución

1. Backup del recurso y limpieza del managedFields viejo con un patch.
2. Forcé una reconciliación del UIPlugin: pasó a Reconciled y Available por primera vez en 5 meses.
3. El plugin volvió a registrarse en la consola y el operador quedó sin errores. Sin abrir caso de soporte.

## Aprendizajes

- Validar permisos con SubjectAccessReview y no solo con can-i.
- Cuando el error dice "field not declared in schema" y el CRD sí lo declara, revisar managedFields y la apiVersion con la que se registraron.
- Un recurso Degraded durante meses suele explicar síntomas que parecen de otra capa.
