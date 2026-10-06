---
title: "Un webhook de APM que rompió todos los pipelines"
summary: "De un día para otro fallaban los pipelines de decenas de namespaces en el primer paso. La causa era un mutating webhook instalado por un agente de monitoreo."
date: 2026-09-10
tags: ["Tekton", "SCC", "Admission webhooks", "CI/CD"]
draft: false
---

## Contexto

Cluster OpenShift con cientos de pipelines Tekton. Los pods de CI corren con UID 65532 bajo una SCC específica de pipelines.

## Síntoma

PipelineRuns fallando en el clone del código, con dos errores: PodAdmissionFailed por runAsUser fuera de rango y Permission denied en el home del usuario git.

```plaintext
PodAdmissionFailed: runAsUser: Invalid value: 65532:
  must be in the ranges: [1000660000, 1000669999]
```

## Diagnóstico

1. Confirmé que era masivo: decenas de namespaces, siempre en el mismo paso, desde una hora concreta.
2. El UID 65532 no era nuevo: está en todas las ClusterTasks del catálogo y la SCC de pipelines lo permite.
3. Listando los mutating webhooks apareció uno nuevo, de un agente APM instalado la tarde anterior, que intercepta cada pod del cluster.
4. El webhook inyectaba un init-container con UID y seccomp fijos. Con el pod mutado, la evaluación de SCC caía en restricted-v2, que exige un UID dentro del rango del namespace.
5. Usé el audit log del apiserver para reconstruir la línea de tiempo: instalación, primer fallo, desinstalación y primer pipeline exitoso.

## Causa raíz

Un mutating webhook global que modificaba también los pods efímeros de CI y los sacaba de la SCC que les correspondía.

## Solución

1. La mitigación fue desinstalar el operador del agente; los pipelines volvieron a pasar en minutos.
2. Documenté un efecto secundario: una task de actualización de manifiestos sin HOME definido fallaba al copiar credenciales SSH. Propuse fijar HOME=/tekton/home.
3. Dejé la recomendación para una reinstalación: excluir los namespaces de CI de la inyección del agente.

## Aprendizajes

- Ante fallos masivos de admisión, lo primero es listar los webhooks mutantes y validantes.
- El audit log del apiserver permite reconstruir quién cambió qué y cuándo.
- Las herramientas que inyectan sidecars tienen que tener un alcance explícito: CI no debería estar incluido por defecto.
