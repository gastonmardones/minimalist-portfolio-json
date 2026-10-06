// Escenarios del Incident Lab: versiones jugables de los casos reales.
// Las salidas de los comandos están anonimizadas (namespaces, hosts y usuarios ficticios).
import type { Lang } from "@/i18n"

type Localized<T> = Record<Lang, T>

export interface LabCommand {
  // Expresiones regulares que se prueban contra el comando normalizado
  match: RegExp[]
  output: string | Localized<string>
  // Pista descubierta al correr el comando (cuenta para el puntaje)
  clue?: string
}

export interface Scenario {
  id: string // misma clave que el caso en src/content/cases
  difficulty: 1 | 2 | 3
  title: Localized<string>
  brief: Localized<string[]>
  suggestions: string[] // comandos para autocompletar
  commands: LabCommand[]
  hints: Localized<string[]>
  question: Localized<string>
  options: Localized<string[]>
  answer: number // índice de la opción correcta
  explanation: Localized<string>
}

export const SCENARIOS: Scenario[] = [
  {
    id: "loki-wal-checkpoint",
    difficulty: 2,
    title: {
      es: "El WAL que no se vaciaba",
      en: "The WAL that wouldn't drain",
    },
    brief: {
      es: [
        "🚨 ALERTA: los volúmenes WAL de Loki están al 100%.",
        "Los ingesters figuran Ready. Hace unos meses pasó algo parecido por un bucket S3 lleno.",
        "Investigá en el namespace openshift-logging. ¿Es lo mismo de la otra vez?",
      ],
      en: [
        "🚨 ALERT: Loki's WAL volumes are at 100%.",
        "Ingesters report Ready. A few months ago something similar happened because of a full S3 bucket.",
        "Investigate the openshift-logging namespace. Is it the same thing again?",
      ],
    },
    suggestions: [
      "oc get pods -n openshift-logging",
      "oc exec logging-loki-ingester-0 -- df -h /tmp/wal",
      "oc logs logging-loki-ingester-0",
      "oc logs logging-loki-compactor-0",
      "oc exec logging-loki-ingester-0 -- ls -lh /tmp/wal",
      "oc exec logging-loki-ingester-0 -- stat -f /tmp/wal",
    ],
    commands: [
      {
        match: [/^oc get (pods|po)( -n openshift-logging)?$/i, /^oc get (pods|po) -n logging$/i],
        output: `NAME                              READY   STATUS    RESTARTS   AGE
logging-loki-compactor-0          1/1     Running   0          21d
logging-loki-distributor-6b9c8    1/1     Running   0          21d
logging-loki-ingester-0           1/1     Running   0          21d
logging-loki-ingester-1           1/1     Running   0          21d
logging-loki-querier-7f5d4        1/1     Running   0          21d`,
      },
      {
        match: [/df( -h)?( \/tmp\/wal)?$/i],
        clue: "disk-full",
        output: `Filesystem      Size  Used Avail Use% Mounted on
/dev/sdd        147G  140G     0 100% /tmp/wal`,
      },
      {
        match: [/^oc logs (-f )?(pod\/)?logging-loki-ingester-\d/i],
        clue: "checkpoint-loop",
        output: `level=info  caller=flush.go:167 msg="flushing stream" streams=42
level=info  caller=flush.go:167 msg="flushing stream" streams=38
level=info  caller=checkpoint.go:611 msg="starting checkpoint"
level=error caller=checkpoint.go:613 msg="error checkpointing series" err="write /tmp/wal/00080651: no space left on device"
level=info  caller=flush.go:167 msg="flushing stream" streams=40
level=info  caller=checkpoint.go:611 msg="starting checkpoint"
level=error caller=checkpoint.go:613 msg="error checkpointing series" err="write /tmp/wal/00080651: no space left on device"`,
      },
      {
        match: [/^oc logs (-f )?(pod\/)?logging-loki-(compactor|distributor|querier)/i],
        clue: "s3-ok",
        output: `level=info caller=compactor.go:502 msg="uploading compacted index" bucket=loki-dev
level=info caller=compactor.go:518 msg="upload completed" duration=1.2s
level=info caller=retention.go:88 msg="applying retention" days=7
(no errors in the last 24h)`,
      },
      {
        match: [/ls( -[a-z]+)* \/tmp\/wal/i],
        clue: "tmp-checkpoint",
        output: `total 140G
drwxr-xr-x  checkpoint.000118          5.8G   Aug 20
drwxr-xr-x  checkpoint.000119.tmp      7.4G   Aug 24   <- interrupted
-rw-r--r--  00080301                   128M
-rw-r--r--  00080302                   128M
...         (130 more segments)
-rw-r--r--  00080651                     0    <- last write failed`,
      },
      {
        match: [/stat -f( \/tmp\/wal)?$/i],
        clue: "root-reserved",
        output: `  File: "/tmp/wal"
Block size: 4096
Blocks: Total: 38535168   Free: 1929312   Available: 0
# Free > 0 but Available = 0: ext4 reserves ~5% for root,
# and Loki runs as a non-root user.`,
      },
      {
        match: [/^oc get lokistack.*/i],
        output: `NAME            SIZE           RETENTION   STORAGE         STATUS
logging-loki    1x.extra-small 7d          s3 (healthy)    Ready`,
      },
    ],
    hints: {
      es: [
        "Fijate primero si el object storage (S3) está fallando de verdad: mirá los logs del compactor.",
        "Después mirá los logs del ingester: ¿qué operación periódica falla?",
        "Listá /tmp/wal: ¿hay algo a medio terminar?",
      ],
      en: [
        "First check whether object storage (S3) is really failing: look at the compactor logs.",
        "Then look at the ingester logs: which periodic operation is failing?",
        "List /tmp/wal: is anything half-finished?",
      ],
    },
    question: {
      es: "¿Cuál es la causa raíz?",
      en: "What's the root cause?",
    },
    options: {
      es: [
        "El bucket S3 se quedó sin cuota y el flush falla (igual que la vez anterior).",
        "Un checkpoint trabado en loop por disco lleno impide truncar los segmentos del WAL.",
        "Falta CPU en los nodos y los ingesters no llegan a procesar.",
        "Un problema de RBAC impide que el ingester escriba en el volumen.",
      ],
      en: [
        "The S3 bucket ran out of quota and flushes fail (same as last time).",
        "A checkpoint stuck in a disk-full loop prevents WAL segments from being truncated.",
        "The nodes are CPU-starved and the ingesters can't keep up.",
        "An RBAC issue prevents the ingester from writing to the volume.",
      ],
    },
    answer: 1,
    explanation: {
      es: "El flush a S3 funcionaba. El checkpoint fallaba por disco lleno y, sin checkpoint, Loki no puede truncar segmentos: un loop. Se resolvió borrando el checkpoint .tmp interrumpido y el anterior (son solo una optimización de replay), sin reiniciar pods. El WAL bajó de 100% a 3%.",
      en: "S3 flushes were working. The checkpoint failed on a full disk and, without a checkpoint, Loki can't truncate segments: a loop. Fixed by deleting the interrupted .tmp checkpoint and the previous one (they're only a replay optimization), without restarting pods. WAL went from 100% to 3%.",
    },
  },
  {
    id: "mutating-webhook-pipelines",
    difficulty: 2,
    title: {
      es: "Pipelines caídos en todo el cluster",
      en: "Pipelines down across the cluster",
    },
    brief: {
      es: [
        "🚨 ALERTA: desde ayer a la tarde fallan los pipelines de decenas de namespaces.",
        "Siempre en el primer paso: el clone del código. Nadie tocó los pipelines.",
        "¿Qué cambió en el cluster?",
      ],
      en: [
        "🚨 ALERT: since yesterday afternoon, pipelines in dozens of namespaces are failing.",
        "Always at the first step: the code clone. Nobody touched the pipelines.",
        "What changed in the cluster?",
      ],
    },
    suggestions: [
      "oc get pipelineruns -A",
      "oc describe taskrun app-build-fetch-code -n team-a-dev",
      "oc get clustertask git-clone -o yaml",
      "oc get scc pipelines-scc -o yaml",
      "oc get mutatingwebhookconfigurations",
      "oc get pod app-build-fetch-code-pod -n team-a-dev -o yaml",
    ],
    commands: [
      {
        match: [/^oc get (pipelineruns?|pr)( -A| --all-namespaces)?$/i],
        clue: "mass-failure",
        output: `NAMESPACE      NAME                  SUCCEEDED   REASON    STARTTIME
team-a-dev     app-build-x7k2p       False       Failed    14h ago
team-b-qa      api-cd-9fq1z          False       Failed    13h ago
team-c-dev     web-ci-2mzp4          False       Failed    13h ago
team-d-qa      front-cd-7hh3k        False       Failed    12h ago
... 61 more Failed across 38 namespaces (all at task "fetch-code")`,
      },
      {
        match: [/^oc (describe|get) (taskrun|tr)\b.*/i],
        clue: "scc-rejection",
        output: `Status:   False
Reason:   PodAdmissionFailed
Message:  pods "app-build-fetch-code-pod" is forbidden: unable to validate
          against any security context constraint:
          spec.initContainers[0].securityContext.runAsUser:
          Invalid value: 65532: must be in the ranges: [1000660000, 1000669999]`,
      },
      {
        match: [/^oc get clustertasks? git-clone.*/i, /^oc get task git-clone.*/i],
        clue: "uid-not-new",
        output: `steps:
  - name: clone
    securityContext:
      runAsNonRoot: true
      runAsUser: 65532    # unchanged for 2 years (distroless "nonroot" UID)`,
      },
      {
        match: [/^oc get scc( pipelines-scc)?.*/i],
        clue: "scc-allows",
        output: `NAME            RUNASUSER   FSGROUP     PRIORITY
pipelines-scc   RunAsAny    MustRunAs   10
restricted-v2   MustRunAsRange MustRunAs <none>
# pipelines-scc lets UID 65532 through... if the pod still matches it.`,
      },
      {
        match: [/^oc get (mutatingwebhookconfigurations?|mutatingwebhookconfiguration|mwc)$/i],
        clue: "new-webhook",
        output: `NAME                                  WEBHOOKS   AGE
machine-api                           2          2y
pipelines-webhook                     1          2y
webhook.pod.apm-agent.example         1          20h   <- new
webhook.ns.apm-agent.example          1          20h   <- new`,
      },
      {
        match: [/^oc get pods? .*-o (yaml|json).*/i, /^oc describe pods? .*/i],
        clue: "injected",
        output: `metadata:
  annotations:
    apm-agent.example/injected: "true"
    seccomp.security.alpha.kubernetes.io/pod: runtime/default
spec:
  initContainers:
  - name: apm-agent-install        # injected by the webhook
    securityContext:
      runAsUser: 65532
      seccompProfile: { type: RuntimeDefault }`,
      },
      {
        match: [/^oc get events.*/i],
        output: `14h  Warning  FailedCreate  taskrun/app-build-x7k2p  pods "...fetch-code-pod" is forbidden: unable to validate against any security context constraint`,
      },
    ],
    hints: {
      es: [
        "Mirá el detalle de un TaskRun que falló: ¿quién rechaza el pod?",
        "El UID 65532 de la ClusterTask, ¿es nuevo?",
        "Si nadie tocó los pipelines, buscá algo que modifique TODOS los pods del cluster.",
      ],
      en: [
        "Look at a failed TaskRun: who rejects the pod?",
        "Is the ClusterTask's UID 65532 new?",
        "If nobody touched the pipelines, look for something that modifies EVERY pod in the cluster.",
      ],
    },
    question: { es: "¿Cuál es la causa raíz?", en: "What's the root cause?" },
    options: {
      es: [
        "Alguien cambió el runAsUser de la ClusterTask git-clone.",
        "El rango de UID de los namespaces cambió después de un upgrade.",
        "Un mutating webhook global inyecta un init-container en los pods de CI y los saca de su SCC.",
        "El servidor Git está caído.",
      ],
      en: [
        "Someone changed the git-clone ClusterTask's runAsUser.",
        "The namespaces' UID ranges changed after an upgrade.",
        "A cluster-wide mutating webhook injects an init-container into CI pods, pushing them out of their SCC.",
        "The Git server is down.",
      ],
    },
    answer: 2,
    explanation: {
      es: "El agente APM instalado la tarde anterior registró un mutating webhook que inyectaba un init-container en cada pod. Con el pod mutado, la SCC de pipelines dejaba de aplicar y caía en restricted-v2. Desinstalar el operador lo resolvió; la recomendación es excluir los namespaces de CI de la inyección.",
      en: "The APM agent installed the previous afternoon registered a mutating webhook that injected an init-container into every pod. Once mutated, the pipelines SCC no longer applied and pods fell through to restricted-v2. Uninstalling the operator fixed it; the recommendation is to exclude CI namespaces from injection.",
    },
  },
  {
    id: "console-logs-managedfields",
    difficulty: 3,
    title: {
      es: "Los logs que nadie podía ver",
      en: "The logs nobody could see",
    },
    brief: {
      es: [
        "🚨 TICKET: varios equipos no ven sus namespaces de QA en Observe → Logs.",
        "Juran que tienen permisos. Ya les revisaron el RoleBinding dos veces.",
        "¿Es RBAC o es otra cosa?",
      ],
      en: [
        "🚨 TICKET: several teams can't see their QA namespaces in Observe → Logs.",
        "They swear they have permissions. Their RoleBinding was checked twice.",
        "Is it RBAC or something else?",
      ],
    },
    suggestions: [
      "oc get rolebinding -n team-a-qa",
      "oc auth can-i get application --subresource=logs -n team-a-qa --as=dev-user",
      "oc create -f subjectaccessreview.yaml",
      "oc get uiplugin logging -o yaml",
      "oc get crd consoleplugins.console.openshift.io -o yaml",
      "oc get consoleplugin logging-view-plugin -o yaml --show-managed-fields",
    ],
    commands: [
      {
        match: [/^oc get (rolebindings?|rb)( -n [\w-]+)?$/i],
        clue: "rbac-ok",
        output: `NAME                     ROLE                                           AGE
loki-logs-team-a-qa      ClusterRole/cluster-logging-application-view   180d`,
      },
      {
        match: [/^oc auth can-i .*/i],
        clue: "can-i",
        output: `Warning: the server doesn't have a resource type 'application'
no`,
      },
      {
        match: [/^oc create -f .*subjectaccessreview.*/i, /^oc create .*sar.*/i, /^kubectl create -f .*subjectaccessreview.*/i],
        clue: "sar-allowed",
        output: `apiVersion: authorization.k8s.io/v1
kind: SubjectAccessReview
status:
  allowed: true
  reason: 'RBAC: allowed by RoleBinding "loki-logs-team-a-qa/team-a-qa"'`,
      },
      {
        match: [/^oc get uiplugins?( logging)?( -o (yaml|json))?$/i, /^oc describe uiplugins?.*/i],
        clue: "degraded",
        output: `status:
  conditions:
  - type: Reconciled
    status: "False"
  - type: Degraded
    status: "True"
    lastTransitionTime: "2026-04-25T22:39:51Z"   # five months ago
    message: 'updater failed to patch: .spec.i18n: field not declared in schema'`,
      },
      {
        match: [/^oc get crds? consoleplugins.*/i],
        clue: "crd-has-field",
        output: `versions:
- name: v1
  served: true
  storage: true
  schema: ... spec.i18n ✓  spec.backend ✓  spec.proxy[].authorization ✓
- name: v1alpha1
  served: true
  schema: ... (no i18n, no backend)`,
      },
      {
        match: [/^oc get consoleplugins? .*--show-managed-fields.*/i, /^oc get consoleplugins? .*managedfields.*/i],
        clue: "managedfields",
        output: `metadata:
  managedFields:
  - manager: observability-operator
    operation: Apply
    apiVersion: console.openshift.io/v1alpha1   <- recorded at install time
    time: "2026-04-09T10:12:03Z"`,
      },
      {
        match: [/^oc get consoleplugins?( [\w-]+)?( -o (yaml|json))?$/i],
        output: `spec:
  displayName: Logging View
  backend: {}          # the operator never managed to apply the new config
# Tip: managedFields are hidden by default. Try --show-managed-fields`,
      },
    ],
    hints: {
      es: [
        "`oc auth can-i` puede mentir con algunos CRD: probá una SubjectAccessReview real.",
        "Si el permiso está bien, mirá al operador que maneja el plugin de logs (UIPlugin).",
        "El CRD v1 tiene el campo. ¿Con qué apiVersion quedó registrado el recurso en sus managedFields?",
      ],
      en: [
        "`oc auth can-i` can lie with some CRDs: try a real SubjectAccessReview.",
        "If permissions are fine, look at the operator that manages the logs plugin (UIPlugin).",
        "The v1 CRD has the field. Which apiVersion is recorded in the resource's managedFields?",
      ],
    },
    question: { es: "¿Cuál es la causa raíz?", en: "What's the root cause?" },
    options: {
      es: [
        "El RoleBinding de QA está mal configurado.",
        "Es un bug del operador y no hay solución hasta una nueva versión.",
        "Los managedFields registrados con v1alpha1 hacen fallar el Server-Side Apply del operador.",
        "Caché del navegador de los usuarios.",
      ],
      en: [
        "The QA RoleBinding is misconfigured.",
        "It's an operator bug with no fix until a new release.",
        "managedFields recorded with v1alpha1 make the operator's Server-Side Apply fail.",
        "The users' browser cache.",
      ],
    },
    answer: 2,
    explanation: {
      es: "El permiso real era correcto (la SAR daba allowed: true). El operador hacía Server-Side Apply en v1, pero el field set guardado como v1alpha1 no tenía esos campos y el patch se rechazaba: el plugin nunca terminaba de configurarse. Limpiar los managedFields viejos lo reconcilió en el momento.",
      en: "Real permissions were fine (the SAR returned allowed: true). The operator Server-Side Applied in v1, but the field set stored as v1alpha1 lacked those fields and the patch was rejected: the plugin never got configured. Clearing the stale managedFields reconciled it immediately.",
    },
  },
]

export const getScenario = (id: string) => SCENARIOS.find((scenario) => scenario.id === id)
