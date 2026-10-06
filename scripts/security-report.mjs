// Consolida los reportes del pipeline DevSecOps en src/data/security-report.json
// Uso: node scripts/security-report.mjs <dir-de-reportes>
// Archivos esperados (los que falten quedan como "pending"):
//   gitleaks.json · semgrep.json · npm-audit.json · sbom.cdx.json · headers.txt · lighthouse.json
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const dir = process.argv[2] ?? "reports"
const OUT = "src/data/security-report.json"
const SBOM_PUBLIC = "public/sbom.cdx.json"

const read = (file) => {
  const path = join(dir, file)
  if (!existsSync(path)) return null
  const text = readFileSync(path, "utf8")
  return file.endsWith(".json") ? JSON.parse(text || "null") : text
}

const pending = (tool) => ({ status: "pending", tool, summary: {} })

function secrets() {
  const data = read("gitleaks.json")
  if (data === null) return pending("gitleaks")
  const findings = Array.isArray(data) ? data.length : 0
  return { status: findings === 0 ? "pass" : "fail", tool: "gitleaks", summary: { findings } }
}

function sast() {
  const data = read("semgrep.json")
  if (data === null) return pending("Semgrep CE")
  const count = { error: 0, warning: 0, info: 0 }
  for (const result of data.results ?? []) {
    const severity = String(result.extra?.severity ?? "INFO").toLowerCase()
    if (severity in count) count[severity]++
  }
  const status = count.error > 0 ? "fail" : count.warning > 0 ? "warn" : "pass"
  return { status, tool: "Semgrep CE", summary: { ...count, files: data.paths?.scanned?.length ?? 0 } }
}

function deps() {
  const data = read("npm-audit.json")
  if (data === null) return pending("npm audit")
  const v = data.metadata?.vulnerabilities ?? {}
  const summary = {
    critical: v.critical ?? 0,
    high: v.high ?? 0,
    moderate: v.moderate ?? 0,
    low: v.low ?? 0,
  }
  const status = summary.critical + summary.high > 0 ? "fail" : summary.moderate > 0 ? "warn" : "pass"
  return { status, tool: "npm audit", summary }
}

function sbom() {
  const data = read("sbom.cdx.json")
  if (data === null) return pending("CycloneDX")
  copyFileSync(join(dir, "sbom.cdx.json"), SBOM_PUBLIC)
  const components = data.components?.length ?? 0
  return {
    status: components > 0 ? "pass" : "warn",
    tool: "CycloneDX",
    summary: { components, format: `CycloneDX ${data.specVersion ?? ""}`.trim() },
    file: "/sbom.cdx.json",
  }
}

function headers() {
  const text = read("headers.txt")
  if (text === null) return pending("curl")
  const present = new Set(
    text
      .split(/\r?\n/)
      .map((line) => line.split(":")[0].trim().toLowerCase())
      .filter(Boolean)
  )
  const required = [
    "strict-transport-security",
    "content-security-policy",
    "x-frame-options",
    "x-content-type-options",
    "referrer-policy",
    "permissions-policy",
  ]
  const missing = required.filter((header) => !present.has(header))
  const status = missing.length === 0 ? "pass" : missing.length <= 2 ? "warn" : "fail"
  return {
    status,
    tool: "curl",
    summary: { present: required.filter((h) => present.has(h)), missing },
  }
}

function lighthouse() {
  const data = read("lighthouse.json")
  if (data === null) return pending("Lighthouse")
  const c = data.categories ?? {}
  const score = (key) => Math.round((c[key]?.score ?? 0) * 100)
  const summary = {
    performance: score("performance"),
    accessibility: score("accessibility"),
    bestPractices: score("best-practices"),
    seo: score("seo"),
  }
  const values = Object.values(summary)
  const status = values.some((v) => v < 50) ? "fail" : values.some((v) => v < 90) ? "warn" : "pass"
  return { status, tool: "Lighthouse", summary }
}

const { GITHUB_SHA, GITHUB_SERVER_URL, GITHUB_REPOSITORY, GITHUB_RUN_ID } = process.env
const report = {
  generatedAt: new Date().toISOString(),
  commit: GITHUB_SHA ? GITHUB_SHA.slice(0, 7) : null,
  runUrl:
    GITHUB_SERVER_URL && GITHUB_REPOSITORY && GITHUB_RUN_ID
      ? `${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}`
      : null,
  checks: {
    secrets: secrets(),
    sast: sast(),
    deps: deps(),
    sbom: sbom(),
    headers: headers(),
    lighthouse: lighthouse(),
  },
}

writeFileSync(OUT, `${JSON.stringify(report, null, 2)}\n`)
console.log(`✓ ${OUT}`)
for (const [name, check] of Object.entries(report.checks)) {
  console.log(`  ${check.status.padEnd(8)} ${name.padEnd(11)} ${JSON.stringify(check.summary)}`)
}

// Código de salida para usarlo como gate en CI: 1 si algún control falla
if (process.argv.includes("--gate") && Object.values(report.checks).some((c) => c.status === "fail")) {
  process.exitCode = 1
}
