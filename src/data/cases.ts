import type { Lang } from "@/i18n"

interface CaseContent {
  title: string
  summary: string
  context: string
  symptom: string
  diagnosis: string[]
  rootCause: string
  fix: string[]
  lessons: string[]
}

export interface Case {
  slug: string
  date: string
  tags: string[]
  snippet?: string
  content: Record<Lang, CaseContent>
}

export const CASES: Case[] = [
  {
    slug: "loki-wal-checkpoint",
    date: "2026-08-28",
    tags: ["Loki", "OpenShift Logging", "Storage", "Troubleshooting"],
    snippet: `level=error caller=checkpoint.go:613 msg="error checkpointing series"
  err="write /tmp/wal/00080651: no space left on device"`,
    content: {
      es: {
        title: "WAL de Loki al 100%: el problema no era el storage",
        summary:
          "Los discos de WAL de los ingesters estaban llenos. Parecía un problema de object storage ya conocido, pero era un checkpoint trabado en un loop de disco lleno.",
        context:
          "Stack de logging de OpenShift (LokiStack) con ingesters que escriben un Write-Ahead Log en volúmenes de 150 GiB antes de hacer flush a un object storage S3 compatible.",
        symptom:
          "Los dos ingesters estaban Ready pero con el volumen de WAL al 100%. Meses antes había pasado algo parecido por un bucket S3 lleno, así que la primera sospecha era la misma.",
        diagnosis: [
          "Descarté el storage: los logs mostraban flush a S3 funcionando, decenas de streams por minuto y cero errores de cuota.",
          "En los logs del ingester apareció el patrón real: cada 5 minutos Loki intentaba un checkpoint y fallaba con \"no space left on device\".",
          "Sin un checkpoint exitoso, Loki no puede truncar los segmentos viejos del WAL, así que el disco nunca se liberaba. Llevaba 4 días en ese loop.",
          "Quedaba además un checkpoint interrumpido (.tmp) de más de 7 GB por ingester.",
        ],
        rootCause:
          "Un loop: disco lleno → checkpoint falla → no se truncan segmentos → disco sigue lleno. El object storage estaba sano.",
        fix: [
          "Borré el checkpoint .tmp interrumpido: nunca se usa para replay.",
          "No alcanzó. df marcaba 95%, pero el proceso corre como usuario no-root y ext4 reserva ~5% para root: el espacio realmente disponible lo mostraba stat -f.",
          "Borré también el checkpoint completo anterior, después de verificar que el flush a S3 seguía activo. El checkpoint es solo una optimización del replay; la fuente de verdad son los segmentos WAL.",
          "El siguiente checkpoint automático completó solo y Loki truncó unos 130 segmentos viejos. El WAL pasó de 100% a 3%, sin reiniciar pods ni perder datos.",
        ],
        lessons: [
          "Un síntoma igual a un incidente anterior no significa la misma causa: hay que volver a descartar desde la evidencia.",
          "Para medir el espacio de un proceso no-root, usar stat -f (Available) y no solo df.",
          "Entender qué parte del estado es optimización y cuál es fuente de verdad permite intervenir sin downtime.",
        ],
      },
      en: {
        title: "Loki WAL at 100%: it wasn't the storage",
        summary:
          "The ingesters' WAL disks were full. It looked like a known object storage issue, but it was a checkpoint stuck in a disk-full loop.",
        context:
          "OpenShift logging stack (LokiStack) whose ingesters write a Write-Ahead Log to 150 GiB volumes before flushing to S3-compatible object storage.",
        symptom:
          "Both ingesters were Ready but their WAL volumes were at 100%. Months earlier a full S3 bucket had caused something similar, so that was the first suspect.",
        diagnosis: [
          "Ruled out storage: logs showed S3 flushes working, dozens of streams per minute and zero quota errors.",
          "The ingester logs showed the real pattern: every 5 minutes Loki tried to checkpoint and failed with \"no space left on device\".",
          "Without a successful checkpoint Loki cannot truncate old WAL segments, so the disk never freed up. It had been looping for 4 days.",
          "There was also an interrupted checkpoint (.tmp) of more than 7 GB per ingester.",
        ],
        rootCause:
          "A loop: full disk → checkpoint fails → no segment truncation → disk stays full. The object storage was healthy.",
        fix: [
          "Deleted the interrupted .tmp checkpoint, which is never used for replay.",
          "Not enough. df showed 95%, but the process runs as non-root and ext4 reserves ~5% for root: stat -f showed the space actually available.",
          "Also deleted the previous complete checkpoint after confirming S3 flushes were still active. A checkpoint is only a replay optimization; the WAL segments are the source of truth.",
          "The next automatic checkpoint completed and Loki truncated about 130 old segments. WAL went from 100% to 3%, with no pod restarts and no data loss.",
        ],
        lessons: [
          "The same symptom as a past incident doesn't mean the same cause: rule things out again from evidence.",
          "To measure the space available to a non-root process, use stat -f (Available), not just df.",
          "Knowing which state is an optimization and which is the source of truth lets you fix things without downtime.",
        ],
      },
    },
  },
  {
    slug: "console-logs-managedfields",
    date: "2026-10-05",
    tags: ["OpenShift", "Operators", "Server-Side Apply", "RBAC"],
    snippet: `updater failed to patch: .spec.i18n: field not declared in schema`,
    content: {
      es: {
        title: "La vista de logs de la consola, rota por un managedFields viejo",
        summary:
          "Varios equipos no veían sus namespaces de QA en Observe → Logs. Parecía RBAC; era un conflicto de Server-Side Apply que tenía al operador de observabilidad degradado hacía meses.",
        context:
          "Consola de OpenShift con el plugin de logs gestionado por el Cluster Observability Operator. Los permisos de lectura de logs se otorgan por RoleBinding vía GitOps.",
        symptom:
          "Usuarios de distintos proyectos solo veían sus namespaces de desarrollo en el filtro de logs, nunca los de QA. Después de un upgrade del operador, la pestaña de logs directamente desapareció.",
        diagnosis: [
          "Descarté RBAC con una SubjectAccessReview real contra la API (allowed: true). El oc auth can-i local daba un falso negativo con este recurso.",
          "Verifiqué que GitOps estuviera sincronizado, sin drift, y comparé con grupos de control a los que sí les funcionaba.",
          "Aislé temporalmente a un usuario en un solo grupo de control: el síntoma seguía. Era sistémico, no de permisos.",
          "El UIPlugin del operador estaba Degraded desde hacía 5 meses, con un error en loop: \"field not declared in schema\".",
          "El CRD v1 sí declaraba esos campos. El managedFields del ConsolePlugin tenía registrada una única entrada con apiVersion v1alpha1, de la instalación original.",
        ],
        rootCause:
          "Al hacer Server-Side Apply en v1, el apiserver convertía el field set guardado como v1alpha1, versión que no tiene esos campos, y rechazaba el patch. El operador nunca terminaba de reconciliar ni de registrar el plugin en la consola.",
        fix: [
          "Backup del recurso y limpieza del managedFields viejo con un patch.",
          "Forcé una reconciliación del UIPlugin: pasó a Reconciled y Available por primera vez en 5 meses.",
          "El plugin volvió a registrarse en la consola y el operador quedó sin errores. Sin abrir caso de soporte.",
        ],
        lessons: [
          "Validar permisos con SubjectAccessReview y no solo con can-i.",
          "Cuando el error dice \"field not declared in schema\" y el CRD sí lo declara, revisar managedFields y la apiVersion con la que se registraron.",
          "Un recurso Degraded durante meses suele explicar síntomas que parecen de otra capa.",
        ],
      },
      en: {
        title: "Console log view broken by stale managedFields",
        summary:
          "Several teams couldn't see their QA namespaces in Observe → Logs. It looked like RBAC; it was a Server-Side Apply conflict that had kept the observability operator degraded for months.",
        context:
          "OpenShift console with the logging plugin managed by the Cluster Observability Operator. Log read access is granted through RoleBindings via GitOps.",
        symptom:
          "Users from different projects only saw their development namespaces in the log filter, never QA. After an operator upgrade, the Logs tab disappeared altogether.",
        diagnosis: [
          "Ruled out RBAC with a real SubjectAccessReview against the API (allowed: true). The local oc auth can-i gave a false negative for this resource.",
          "Confirmed GitOps was in sync with no drift and compared against control groups for which it worked.",
          "Temporarily isolated a user into a single control group: the symptom persisted. It was systemic, not permissions.",
          "The operator's UIPlugin had been Degraded for 5 months with a looping \"field not declared in schema\" error.",
          "The v1 CRD did declare those fields. The ConsolePlugin's managedFields held a single entry recorded with apiVersion v1alpha1 from the original install.",
        ],
        rootCause:
          "On Server-Side Apply in v1, the apiserver converted the field set stored as v1alpha1, a version without those fields, and rejected the patch. The operator never finished reconciling or registering the plugin in the console.",
        fix: [
          "Backed up the resource and cleared the stale managedFields with a patch.",
          "Forced a UIPlugin reconcile: it became Reconciled and Available for the first time in 5 months.",
          "The plugin was registered in the console again and the operator stopped erroring. No support case needed.",
        ],
        lessons: [
          "Validate permissions with SubjectAccessReview, not only can-i.",
          "When the error says \"field not declared in schema\" but the CRD declares it, check managedFields and the apiVersion they were recorded with.",
          "A resource Degraded for months often explains symptoms that look like a different layer.",
        ],
      },
    },
  },
  {
    slug: "mutating-webhook-pipelines",
    date: "2026-09-10",
    tags: ["Tekton", "SCC", "Admission webhooks", "CI/CD"],
    snippet: `PodAdmissionFailed: runAsUser: Invalid value: 65532:
  must be in the ranges: [1000660000, 1000669999]`,
    content: {
      es: {
        title: "Un webhook de APM que rompió todos los pipelines",
        summary:
          "De un día para otro fallaban los pipelines de decenas de namespaces en el primer paso. La causa era un mutating webhook instalado por un agente de monitoreo.",
        context:
          "Cluster OpenShift con cientos de pipelines Tekton. Los pods de CI corren con UID 65532 bajo una SCC específica de pipelines.",
        symptom:
          "PipelineRuns fallando en el clone del código, con dos errores: PodAdmissionFailed por runAsUser fuera de rango y Permission denied en el home del usuario git.",
        diagnosis: [
          "Confirmé que era masivo: decenas de namespaces, siempre en el mismo paso, desde una hora concreta.",
          "El UID 65532 no era nuevo: está en todas las ClusterTasks del catálogo y la SCC de pipelines lo permite.",
          "Listando los mutating webhooks apareció uno nuevo, de un agente APM instalado la tarde anterior, que intercepta cada pod del cluster.",
          "El webhook inyectaba un init-container con UID y seccomp fijos. Con el pod mutado, la evaluación de SCC caía en restricted-v2, que exige un UID dentro del rango del namespace.",
          "Usé el audit log del apiserver para reconstruir la línea de tiempo: instalación, primer fallo, desinstalación y primer pipeline exitoso.",
        ],
        rootCause:
          "Un mutating webhook global que modificaba también los pods efímeros de CI y los sacaba de la SCC que les correspondía.",
        fix: [
          "La mitigación fue desinstalar el operador del agente; los pipelines volvieron a pasar en minutos.",
          "Documenté un efecto secundario: una task de actualización de manifiestos sin HOME definido fallaba al copiar credenciales SSH. Propuse fijar HOME=/tekton/home.",
          "Dejé la recomendación para una reinstalación: excluir los namespaces de CI de la inyección del agente.",
        ],
        lessons: [
          "Ante fallos masivos de admisión, lo primero es listar los webhooks mutantes y validantes.",
          "El audit log del apiserver permite reconstruir quién cambió qué y cuándo.",
          "Las herramientas que inyectan sidecars tienen que tener un alcance explícito: CI no debería estar incluido por defecto.",
        ],
      },
      en: {
        title: "An APM webhook that broke every pipeline",
        summary:
          "Overnight, pipelines in dozens of namespaces started failing at the first step. The cause was a mutating webhook installed by a monitoring agent.",
        context:
          "OpenShift cluster with hundreds of Tekton pipelines. CI pods run as UID 65532 under a pipelines-specific SCC.",
        symptom:
          "PipelineRuns failing at the code clone step with two errors: PodAdmissionFailed for an out-of-range runAsUser, and Permission denied on the git user's home.",
        diagnosis: [
          "Confirmed it was cluster-wide: dozens of namespaces, always the same step, starting at a specific time.",
          "UID 65532 wasn't new: every catalog ClusterTask uses it and the pipelines SCC allows it.",
          "Listing mutating webhooks revealed a new one from an APM agent installed the previous afternoon, intercepting every pod in the cluster.",
          "The webhook injected an init-container with a fixed UID and seccomp profile. Once mutated, SCC evaluation fell through to restricted-v2, which requires a UID within the namespace range.",
          "Used the apiserver audit log to rebuild the timeline: install, first failure, uninstall and first successful pipeline.",
        ],
        rootCause:
          "A cluster-wide mutating webhook that also modified ephemeral CI pods, pushing them out of their intended SCC.",
        fix: [
          "The mitigation was uninstalling the agent's operator; pipelines recovered within minutes.",
          "Documented a side effect: a manifest-update task without HOME set failed to copy SSH credentials. Proposed setting HOME=/tekton/home.",
          "Left a recommendation for any reinstall: exclude CI namespaces from agent injection.",
        ],
        lessons: [
          "For mass admission failures, list mutating and validating webhooks first.",
          "The apiserver audit log lets you rebuild who changed what and when.",
          "Sidecar-injecting tools need an explicit scope: CI shouldn't be included by default.",
        ],
      },
    },
  },
  {
    slug: "security-audit-at-scale",
    date: "2026-09-25",
    tags: ["DevSecOps", "Semgrep", "gitleaks", "Python"],
    content: {
      es: {
        title: "Auditoría de seguridad sobre ~1.000 repositorios, 100% local",
        summary:
          "Había que buscar vulnerabilidades y secretos expuestos en todo el código de la organización: no solo el código fuente, también scripts, configuración y documentación.",
        context:
          "Alrededor de mil repositorios Git, uno por aplicación, en decenas de lenguajes y frameworks. Ya existía un SonarQube Community, pero solo analizaba el directorio de código fuente.",
        symptom:
          "Hacía falta un panorama completo y priorizable para los equipos de desarrollo, sin depender de servicios externos y sin exponer los secretos encontrados.",
        diagnosis: [
          "SonarQube Community no detecta secretos en archivos sin lenguaje asignado (.env, .sh, .md) y no tiene análisis de flujo (taint).",
          "Una corrida masiva contra la instancia existente la tiró por falta de recursos: el scanner necesita el servidor para bajar reglas y guardar resultados.",
          "Elegí Semgrep CE, que corre 100% local, con más de 1.100 reglas de seguridad descargadas una sola vez y telemetría apagada, más gitleaks para secretos en archivos e historial.",
        ],
        rootCause:
          "La herramienta existente no cubría el alcance pedido (todo el repositorio) y no escalaba a una corrida masiva.",
        fix: [
          "Scripts en Python que clonan cada repo, corren Semgrep y gitleaks, y son reanudables (resultados en JSONL) para sobrevivir a timeouts.",
          "Un reporte que unifica ambas herramientas en un mismo esquema: hallazgos, resumen por proyecto y por archivo, marcando los archivos que detectan las dos.",
          "Los valores de los secretos nunca se escriben en el reporte: solo la ubicación y el tipo.",
          "Priorización por severidad y confianza, filtrando código de terceros vendorizado.",
        ],
        lessons: [
          "Elegir la herramienta según el alcance real (todo el repo e historial), no según lo que ya está instalado.",
          "En escaneos masivos, la reanudabilidad importa tanto como las reglas.",
          "Un reporte de seguridad no debe convertirse en una nueva filtración.",
        ],
      },
      en: {
        title: "Security audit across ~1,000 repositories, fully local",
        summary:
          "The goal was to find vulnerabilities and exposed secrets across the organization's entire codebase: not just source code, but also scripts, config and docs.",
        context:
          "Around a thousand Git repositories, one per application, across dozens of languages and frameworks. An existing SonarQube Community instance only analyzed the source directory.",
        symptom:
          "Development teams needed a complete, prioritized view, without relying on external services and without exposing the secrets found.",
        diagnosis: [
          "SonarQube Community doesn't detect secrets in files without an assigned language (.env, .sh, .md) and has no taint analysis.",
          "A bulk run against the existing instance brought it down due to resource limits: the scanner needs the server to fetch rules and store results.",
          "Chose Semgrep CE, which runs fully locally with 1,100+ security rules downloaded once and telemetry off, plus gitleaks for secrets in files and history.",
        ],
        rootCause:
          "The existing tool didn't cover the required scope (the whole repository) and didn't scale to a bulk run.",
        fix: [
          "Python scripts that clone each repo, run Semgrep and gitleaks, and are resumable (JSONL results) to survive timeouts.",
          "A report that merges both tools into one schema: findings, per-project and per-file summaries, flagging files detected by both.",
          "Secret values are never written to the report: only location and type.",
          "Prioritization by severity and confidence, filtering vendored third-party code.",
        ],
        lessons: [
          "Pick the tool for the real scope (whole repo and history), not for what's already installed.",
          "In bulk scans, resumability matters as much as the rules.",
          "A security report must not become a new leak.",
        ],
      },
    },
  },
]

export const getCase = (slug: string) => CASES.find((c) => c.slug === slug)
