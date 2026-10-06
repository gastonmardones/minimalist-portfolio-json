// Elige la corrida de Lighthouse con la mediana de performance.
// Uso: node scripts/lighthouse-median.mjs <dir>  (lee lighthouse-<n>.json, escribe lighthouse.json)
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const dir = process.argv[2] ?? "reports"
const runs = readdirSync(dir)
  .filter((file) => /^lighthouse-\d+\.json$/.test(file))
  .map((file) => {
    try {
      return JSON.parse(readFileSync(join(dir, file), "utf8"))
    } catch {
      return null
    }
  })
  .filter((run) => run?.categories?.performance?.score != null)

if (runs.length === 0) {
  console.error("Ninguna corrida de Lighthouse terminó correctamente")
  process.exit(1)
}

runs.sort((a, b) => a.categories.performance.score - b.categories.performance.score)
const median = runs[Math.floor(runs.length / 2)]
writeFileSync(join(dir, "lighthouse.json"), JSON.stringify(median))
console.log(
  `performance por corrida: ${runs.map((r) => Math.round(r.categories.performance.score * 100)).join(", ")}` +
    ` → mediana ${Math.round(median.categories.performance.score * 100)}`
)
if (!existsSync(join(dir, "lighthouse.json"))) process.exit(1)
