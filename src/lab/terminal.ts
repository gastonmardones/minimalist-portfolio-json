// Terminal interactiva del portfolio + motor del Incident Lab (solo cliente).
import { SCENARIOS, getScenario, type Scenario } from "@/lab/scenarios"
import { STRINGS, type TerminalStrings } from "@/lab/strings"

type Lang = "es" | "en"

export interface TerminalContext {
  lang: Lang
  name: string
  label: string
  summary: string
  location: string
  email: string
  links: { linkedin?: string; github?: string }
  startYear: number
  metrics: { value: string; label: string }[]
  now: { label: string; text: string }[]
  skills: { category: string; items: string[] }[]
  work: { name: string; position: string; years: string }[]
  cases: { key: string; title: string; url: string; date: string }[]
  paths: { home: string; otherHome: string; cv: string; cases: string; lab: string; security: string }
  sections: Record<string, string> // nombre → id del ancla en la home
  build: string
}

type Tone = "out" | "cmd" | "ok" | "err" | "dim" | "accent" | "title"

interface GameState {
  scenario: Scenario
  clues: Set<string>
  hintsUsed: number
  commands: number
  started: number
  awaitingAnswer: boolean
  nudged: boolean
}

const SOLVED_KEY = "lab-solved"

const normalize = (value: string) => value.trim().replace(/\s+/g, " ")

const readSolved = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(SOLVED_KEY) ?? "[]") as string[]
  } catch {
    return []
  }
}

const markSolved = (id: string) => {
  try {
    const solved = new Set(readSolved())
    solved.add(id)
    localStorage.setItem(SOLVED_KEY, JSON.stringify([...solved]))
  } catch {
    // sin almacenamiento: el progreso no se guarda
  }
}

export function mountTerminal(root: HTMLElement) {
  const ctx = JSON.parse(root.dataset.context ?? "{}") as TerminalContext
  const s: TerminalStrings = STRINGS[ctx.lang]
  const log = root.querySelector<HTMLElement>("[data-log]")!
  const form = root.querySelector<HTMLFormElement>("[data-form]")!
  const input = root.querySelector<HTMLInputElement>("[data-input]")!
  const promptEl = root.querySelector<HTMLElement>("[data-prompt]")!
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const history: string[] = []
  let historyIndex = -1
  let game: GameState | null = null
  let busy = false

  const user = "guest"
  const host = "gastonmardones"
  const setPrompt = () => {
    promptEl.textContent = game ? `${user}@incident:${game.scenario.id}$` : `${user}@${host}:~$`
  }

  // ---------- salida ----------
  const scrollToEnd = () => {
    log.scrollTop = log.scrollHeight
  }

  const print = (text: string, tone: Tone = "out") => {
    const line = document.createElement("div")
    line.className = `line ${tone}`
    line.textContent = text
    log.appendChild(line)
    scrollToEnd()
  }

  const printLink = (label: string, href: string, prefix = "  ") => {
    const line = document.createElement("div")
    line.className = "line out"
    line.append(prefix)
    const a = document.createElement("a")
    a.href = href
    a.textContent = label
    line.appendChild(a)
    log.appendChild(line)
    scrollToEnd()
  }

  const printBlock = (text: string, tone: Tone = "out") => {
    text.split("\n").forEach((row) => print(row, tone))
  }

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const typeLine = async (text: string, tone: Tone = "out", speed = 14) => {
    if (reduceMotion) {
      print(text, tone)
      return
    }
    const line = document.createElement("div")
    line.className = `line ${tone}`
    log.appendChild(line)
    for (const char of text) {
      line.textContent += char
      scrollToEnd()
      await sleep(speed)
    }
  }

  // ---------- comandos del portfolio ----------
  const yearsSince = () => {
    const now = new Date()
    const months = (now.getFullYear() - ctx.startYear) * 12 + now.getMonth()
    return `${Math.floor(months / 12)}y ${months % 12}m`
  }

  const neofetch = () => {
    const art = [
      "   ____  __  __ ",
      "  / ___||  \\/  |",
      " | |  _ | |\\/| |",
      " | |_| || |  | |",
      "  \\____||_|  |_|",
      "                ",
    ]
    const info = [
      `${user}@${host}`,
      "-----------------------------",
      `${s.nfRole}: ${ctx.label}`,
      `${s.nfLocation}: ${ctx.location}`,
      `${s.nfUptime}: ${yearsSince()} (${s.since} ${ctx.startYear})`,
      `${s.nfStack}: OpenShift · Tekton · ArgoCD · Loki`,
      `${s.nfFocus}: DevSecOps`,
      `${s.nfBuild}: ${ctx.build}`,
    ]
    const rows = Math.max(art.length, info.length)
    for (let i = 0; i < rows; i++) {
      print(`${(art[i] ?? "").padEnd(18)}${info[i] ?? ""}`, i === 0 ? "accent" : "out")
    }
  }

  const listCases = () => {
    print(s.casesHeader, "title")
    ctx.cases.forEach((c, i) => print(`  [${i + 1}] ${c.title}  (${c.date})`))
    print(s.casesFooter, "dim")
  }

  const listLab = () => {
    const solved = new Set(readSolved())
    print(s.labHeader, "title")
    SCENARIOS.forEach((sc, i) => {
      const stars = "★".repeat(sc.difficulty) + "☆".repeat(3 - sc.difficulty)
      const done = solved.has(sc.id) ? `  ✓ ${s.solved}` : ""
      print(`  [${i + 1}] ${sc.title[ctx.lang]}  ${stars}${done}`, done ? "ok" : "out")
    })
    print(s.labFooter, "dim")
  }

  const resolveIndexOrKey = <T extends { key?: string; id?: string }>(arg: string, list: T[]) => {
    const n = Number(arg)
    if (Number.isInteger(n) && n >= 1 && n <= list.length) return list[n - 1]
    return list.find((item) => item.key === arg || item.id === arg)
  }

  // ---------- Incident Lab ----------
  const startGame = async (scenario: Scenario) => {
    game = {
      scenario,
      clues: new Set(),
      hintsUsed: 0,
      commands: 0,
      started: Date.now(),
      awaitingAnswer: false,
      nudged: false,
    }
    setPrompt()
    log.innerHTML = ""
    print(`━━ INCIDENT LAB · ${scenario.title[ctx.lang]} ━━`, "title")
    for (const row of scenario.brief[ctx.lang]) await typeLine(row, row.startsWith("🚨") ? "err" : "out", 10)
    print("")
    print(s.gameHelp, "dim")
    print(`${s.trySuggestion} ${scenario.suggestions[0]}`, "dim")
    root.dispatchEvent(new CustomEvent("lab:start", { detail: scenario.id, bubbles: true }))
  }

  const totalClues = (scenario: Scenario) =>
    new Set(scenario.commands.map((c) => c.clue).filter(Boolean)).size

  const showStatus = () => {
    if (!game) return
    const { scenario, clues, hintsUsed, commands } = game
    print(`${s.statusClues}: ${clues.size}/${totalClues(scenario)} · ${s.statusCommands}: ${commands} · ${s.statusHints}: ${hintsUsed}`, "accent")
  }

  const askAnswer = () => {
    if (!game) return
    game.awaitingAnswer = true
    print(game.scenario.question[ctx.lang], "title")
    game.scenario.options[ctx.lang].forEach((option, i) => print(`  ${i + 1}) ${option}`))
    print(s.answerHow, "dim")
  }

  const checkAnswer = (raw: string) => {
    if (!game) return
    const choice = Number(raw.replace(/[^\d]/g, "")) - 1
    const { scenario } = game
    if (Number.isNaN(choice) || choice < 0 || choice >= scenario.options[ctx.lang].length) {
      print(s.answerInvalid, "err")
      return
    }
    if (choice !== scenario.answer) {
      game.hintsUsed++
      print(`✗ ${s.wrong}`, "err")
      const hint = scenario.hints[ctx.lang][Math.min(game.hintsUsed - 1, scenario.hints[ctx.lang].length - 1)]
      print(`💡 ${hint}`, "dim")
      return
    }

    const seconds = Math.round((Date.now() - game.started) / 1000)
    const found = game.clues.size
    const total = totalClues(scenario)
    // 100 puntos menos 15 por pista/error y 3 por cada comando de más (se toleran 2 por pista)
    const extraCommands = Math.max(0, game.commands - total * 2)
    const score = Math.max(0, Math.min(100, 100 - game.hintsUsed * 15 - extraCommands * 3))
    print("")
    print(`✓ ${s.correct}`, "ok")
    print(scenario.explanation[ctx.lang])
    print("")
    print(`${s.score}: ${score}/100 · ${s.statusClues}: ${found}/${total} · ${s.statusHints}: ${game.hintsUsed} · ${seconds}s`, "accent")
    const caseInfo = ctx.cases.find((c) => c.key === scenario.id)
    if (caseInfo) printLink(`${s.readFullCase} →`, caseInfo.url)
    print(s.afterSolve, "dim")
    markSolved(scenario.id)
    root.dispatchEvent(new CustomEvent("lab:solved", { detail: scenario.id, bubbles: true }))
    game = null
    setPrompt()
  }

  const runGameCommand = (command: string): boolean => {
    if (!game) return false
    const { scenario } = game
    const lower = command.toLowerCase()

    if (game.awaitingAnswer && /^\d+\)?$/.test(lower)) {
      checkAnswer(lower)
      return true
    }

    switch (lower.split(" ")[0]) {
      case "help":
        print(s.gameHelp, "dim")
        print(`${s.suggestionsTitle}:`, "dim")
        scenario.suggestions.forEach((cmd) => print(`  ${cmd}`, "dim"))
        return true
      case "brief":
        scenario.brief[ctx.lang].forEach((row) => print(row))
        return true
      case "hint": {
        const hints = scenario.hints[ctx.lang]
        const hint = hints[Math.min(game.hintsUsed, hints.length - 1)]
        game.hintsUsed++
        print(`💡 ${hint}`, "dim")
        return true
      }
      case "status":
        showStatus()
        return true
      case "answer":
      case "responder": {
        const arg = command.split(" ")[1]
        if (arg) {
          game.awaitingAnswer = true
          checkAnswer(arg)
        } else askAnswer()
        return true
      }
      case "exit":
      case "quit":
      case "salir":
        print(s.leftGame, "dim")
        game = null
        setPrompt()
        return true
    }

    game.commands++
    for (const spec of scenario.commands) {
      if (spec.match.some((pattern) => pattern.test(command))) {
        const output = typeof spec.output === "string" ? spec.output : spec.output[ctx.lang]
        printBlock(output)
        if (spec.clue && !game.clues.has(spec.clue)) {
          game.clues.add(spec.clue)
          print(`  ◆ ${s.newClue} (${game.clues.size}/${totalClues(scenario)})`, "accent")
          if (game.clues.size >= Math.ceil(totalClues(scenario) * 0.6) && !game.awaitingAnswer && !game.nudged) {
            game.nudged = true
            print(`  ${s.readyToAnswer}`, "dim")
          }
        }
        return true
      }
    }

    const first = command.split(" ")[0]
    if (["oc", "kubectl", "df", "ls", "stat", "cat"].includes(first)) {
      print(s.noUsefulOutput, "dim")
    } else {
      print(`${first}: ${s.notFound}`, "err")
    }
    return true
  }

  // ---------- intérprete ----------
  const run = async (raw: string) => {
    const command = normalize(raw)
    const echo = document.createElement("div")
    echo.className = "line cmd"
    echo.textContent = `${promptEl.textContent} ${command}`
    log.appendChild(echo)
    if (!command) return scrollToEnd()

    history.unshift(command)
    historyIndex = -1

    if (command === "clear" || command === "cls") {
      log.innerHTML = ""
      return
    }
    if (command === "history") {
      history.slice(1).reverse().forEach((cmd, i) => print(`${String(i + 1).padStart(4)}  ${cmd}`, "dim"))
      return
    }

    if (runGameCommand(command)) return

    const [name, ...args] = command.split(" ")
    const arg = args.join(" ")

    switch (name.toLowerCase()) {
      case "help":
      case "ayuda":
      case "man":
        print(s.helpTitle, "title")
        s.help.forEach(([cmd, desc]) => print(`  ${cmd.padEnd(18)}${desc}`))
        break
      case "whoami":
        print(`${ctx.name} — ${ctx.label}`, "accent")
        print(ctx.summary)
        break
      case "about":
      case "cat":
        if (name === "cat" && arg && !/about|sobre|readme/i.test(arg)) {
          print(`cat: ${arg}: ${s.noSuchFile}`, "err")
          break
        }
        print(ctx.summary)
        break
      case "now":
      case "ahora":
        ctx.now.forEach(({ label, text }) => print(`▸ ${label}: ${text}`))
        break
      case "skills":
      case "habilidades":
        ctx.skills.forEach(({ category, items }) => print(`${category.padEnd(16)}${items.join(" · ")}`))
        break
      case "experience":
      case "exp":
      case "experiencia":
        ctx.work.forEach(({ name: company, position, years }) => print(`▸ ${years.padEnd(14)}${position} @ ${company}`))
        break
      case "metrics":
      case "stats":
        ctx.metrics.forEach(({ value, label }) => print(`  ${value.padStart(7)}  ${label}`, "accent"))
        break
      case "cases":
      case "casos":
        listCases()
        break
      case "open":
      case "abrir": {
        const found = resolveIndexOrKey(arg, ctx.cases)
        if (!found) {
          print(s.openUsage, "err")
          break
        }
        print(`${s.opening} ${found.title}…`, "dim")
        window.location.href = found.url
        break
      }
      case "lab":
      case "incidents":
      case "incidentes":
        listLab()
        break
      case "play":
      case "jugar": {
        const scenario = arg ? resolveIndexOrKey(arg, SCENARIOS) : SCENARIOS[0]
        if (!scenario) {
          print(s.playUsage, "err")
          break
        }
        await startGame(scenario as Scenario)
        break
      }
      case "cv": {
        const focus = args[0] ? `?${ctx.lang === "en" ? "focus" : "enfoque"}=${encodeURIComponent(args[0])}` : ""
        print(`${s.opening} CV…`, "dim")
        window.location.href = `${ctx.paths.cv}${focus}`
        break
      }
      case "security":
      case "seguridad":
        window.location.href = ctx.paths.security
        break
      case "contact":
      case "contacto":
        printLink(ctx.email, `mailto:${ctx.email}`, "  ✉ ")
        if (ctx.links.linkedin) printLink(ctx.links.linkedin.replace(/^https?:\/\//, ""), ctx.links.linkedin, "  in ")
        if (ctx.links.github) printLink(ctx.links.github.replace(/^https?:\/\//, ""), ctx.links.github, "  gh ")
        break
      case "linkedin":
      case "github": {
        const url = ctx.links[name.toLowerCase() as "linkedin" | "github"]
        if (url) window.open(url, "_blank", "noopener")
        break
      }
      case "theme":
      case "tema":
        document.dispatchEvent(new Event("toggle-theme"))
        print(`${s.themeNow} ${document.documentElement.dataset.theme}`, "dim")
        break
      case "lang":
      case "idioma":
        window.location.href = ctx.paths.otherHome
        break
      case "cd": {
        const target = arg.replace(/^~\/?|\/$/g, "")
        if (!target || target === "~") break
        const id = ctx.sections[target.toLowerCase()]
        const el = id ? document.getElementById(id) : null
        if (el) el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" })
        else if (/cas(os|es)/.test(target)) window.location.href = ctx.paths.cases
        else print(`cd: ${target}: ${s.noSuchDir}`, "err")
        break
      }
      case "ls":
        print(Object.keys(ctx.sections).map((k) => `${k}/`).join("  ") + "  cv.pdf  lab/", "accent")
        break
      case "pwd":
        print(`/home/${user}`)
        break
      case "date":
        print(new Date().toString())
        break
      case "uptime":
        print(`up ${yearsSince()}, ${s.uptimeTail}`)
        break
      case "neofetch":
      case "fastfetch":
        neofetch()
        break
      case "echo":
        print(arg)
        break
      case "sudo":
        print(s.sudo, "err")
        break
      case "rm":
        print(s.rm, "err")
        break
      case "exit":
      case "logout":
        print(s.exit, "dim")
        break
      case "kubectl":
      case "oc":
        print(s.ocOutsideLab, "dim")
        break
      case "vim":
      case "vi":
      case "nano":
        print(s.editor, "dim")
        break
      default:
        print(`${name}: ${s.notFound}. ${s.tryHelp}`, "err")
    }
  }

  // ---------- autocompletado ----------
  const completions = () => {
    const base = s.help.map(([cmd]) => cmd.split(" ")[0])
    return game ? [...game.scenario.suggestions, "hint", "status", "answer", "brief", "exit"] : base
  }

  input.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault()
      if (historyIndex < history.length - 1) historyIndex++
      input.value = history[historyIndex] ?? input.value
    } else if (event.key === "ArrowDown") {
      event.preventDefault()
      historyIndex = Math.max(-1, historyIndex - 1)
      input.value = historyIndex === -1 ? "" : history[historyIndex]
    } else if (event.key === "Tab") {
      event.preventDefault()
      const value = input.value
      const matches = completions().filter((c) => c.startsWith(value) && c !== value)
      if (matches.length === 1) input.value = matches[0]
      else if (matches.length > 1) print(matches.join("   "), "dim")
    } else if (event.key === "l" && event.ctrlKey) {
      event.preventDefault()
      log.innerHTML = ""
    }
  })

  form.addEventListener("submit", async (event) => {
    event.preventDefault()
    if (busy) return
    busy = true
    const value = input.value
    input.value = ""
    try {
      await run(value)
    } finally {
      busy = false
    }
  })

  // Click en cualquier parte de la terminal enfoca el input (sin robar selección de texto)
  root.addEventListener("mouseup", () => {
    if (!window.getSelection()?.toString()) input.focus({ preventScroll: true })
  })

  // API para botones externos (p. ej. tarjetas del lab)
  root.addEventListener("terminal:run", (event) => {
    const detail = (event as CustomEvent<string>).detail
    run(detail)
  })

  // ---------- arranque ----------
  const boot = async () => {
    setPrompt()
    const fromQuery = root.dataset.variant === "lab" ? new URLSearchParams(location.search).get("play") : null
    const autoplay = root.dataset.autoplay || fromQuery || undefined
    const scenario = autoplay ? getScenario(autoplay) : undefined
    if (scenario) {
      await startGame(scenario)
      return
    }
    if (root.dataset.variant === "lab") {
      print(s.labWelcome, "title")
      listLab()
      return
    }
    // Home: pequeña secuencia de arranque
    const echoCmd = async (cmd: string) => {
      const line = document.createElement("div")
      line.className = "line cmd"
      line.textContent = `${promptEl.textContent} `
      log.appendChild(line)
      if (reduceMotion) line.textContent += cmd
      else for (const char of cmd) {
        line.textContent += char
        await sleep(45)
      }
    }
    await echoCmd("whoami")
    print(`${ctx.name} — ${ctx.label}`, "accent")
    await sleep(reduceMotion ? 0 : 250)
    print(s.homeIntro, "dim")
  }

  boot()
}
