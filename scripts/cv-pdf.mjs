// Genera los PDF del CV a partir de /cv/ y /en/cv/ del sitio ya construido.
// Uso: npm run cv:pdf  (requiere Google Chrome o Chromium instalado)
// Variables opcionales: CHROME=/ruta/al/binario
import { execFile, execFileSync } from "node:child_process"
import { promisify } from "node:util"
import { createReadStream, existsSync, statSync } from "node:fs"
import { createServer } from "node:http"
import { extname, join, resolve } from "node:path"

const DIST = resolve("dist")
const PUBLIC = resolve("public")
const TARGETS = [
  { path: "/cv/", out: "cv-gaston-mardones.pdf" },
  { path: "/en/cv/", out: "cv-gaston-mardones-en.pdf" },
]
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
}

const findChrome = () => {
  const candidates = [
    process.env.CHROME,
    "google-chrome",
    "google-chrome-stable",
    "chromium",
    "chromium-browser",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].filter(Boolean)
  for (const bin of candidates) {
    try {
      execFileSync(bin, ["--version"], { stdio: "ignore" })
      return bin
    } catch {
      // probar el siguiente
    }
  }
  throw new Error("No se encontró Chrome/Chromium. Definí la variable CHROME.")
}

if (!existsSync(join(DIST, "cv", "index.html"))) {
  throw new Error("No existe dist/cv/index.html: corré `npm run build` primero.")
}

const server = createServer((req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost")
  let file = join(DIST, decodeURIComponent(url.pathname))
  if (!file.startsWith(DIST)) {
    res.writeHead(403).end()
    return
  }
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html")
  if (!existsSync(file)) {
    res.writeHead(404).end()
    return
  }
  res.writeHead(200, { "Content-Type": TYPES[extname(file)] ?? "application/octet-stream" })
  createReadStream(file).pipe(res)
})

await new Promise((ok) => server.listen(0, "127.0.0.1", ok))
const { port } = server.address()
const chrome = findChrome()

try {
  for (const { path, out } of TARGETS) {
    const target = join(PUBLIC, out)
    // Asíncrono: execFileSync bloquearía el event loop y el servidor no respondería
    await promisify(execFile)(
      chrome,
      [
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--no-pdf-header-footer",
        "--virtual-time-budget=3000",
        `--print-to-pdf=${target}`,
        `http://127.0.0.1:${port}${path}`,
      ],
      { timeout: 60_000 }
    )
    console.log(`✓ ${path} → public/${out}`)
  }
} finally {
  server.close()
}
