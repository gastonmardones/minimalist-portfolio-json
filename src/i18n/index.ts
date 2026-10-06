import es from "../../cv.json"
import en from "../../cv_english.json"

export type Lang = "es" | "en"

export const LANGS: Lang[] = ["es", "en"]

const CVS = { es, en: en as typeof es }

export const getCV = (lang: Lang) => CVS[lang]

export const getLang = (url: URL): Lang =>
  url.pathname === "/en" || url.pathname.startsWith("/en/") ? "en" : "es"

export const otherLang = (lang: Lang): Lang => (lang === "es" ? "en" : "es")

// Rutas equivalentes en cada idioma
export const homePath = (lang: Lang) => (lang === "en" ? "/en/" : "/")
export const casesPath = (lang: Lang) => (lang === "en" ? "/en/cases/" : "/casos/")
export const casePath = (lang: Lang, key: string) => `${casesPath(lang)}${key}/`
export const rssPath = (lang: Lang) => `${casesPath(lang)}rss.xml`
export const cvPath = (lang: Lang) => (lang === "en" ? "/en/cv/" : "/cv/")
export const labPath = (lang: Lang) => (lang === "en" ? "/en/lab/" : "/lab/")
export const securityPath = (lang: Lang) => (lang === "en" ? "/en/security/" : "/seguridad/")
export const cvPdfPath = (lang: Lang) =>
  lang === "en" ? "/cv-gaston-mardones-en.pdf" : "/cv-gaston-mardones.pdf"

// Enfoques del CV dinámico (claves estables usadas en los JSON)
export type Focus = "devsecops" | "platform" | "data"
export const FOCUSES: Focus[] = ["devsecops", "platform", "data"]

// Categorías de habilidades (claves estables usadas en los JSON)
export const SKILL_CATEGORIES = [
  "platform",
  "cicd",
  "security",
  "observability",
  "languages",
  "data",
] as const
export type SkillCategory = (typeof SKILL_CATEGORIES)[number]

// Qué categorías de habilidades priorizar según el enfoque
export const FOCUS_CATEGORIES: Record<Focus, SkillCategory[]> = {
  devsecops: ["security", "cicd", "platform", "observability", "languages", "data"],
  platform: ["platform", "cicd", "observability", "security", "languages", "data"],
  data: ["data", "languages", "observability", "platform", "cicd", "security"],
}

export const UI = {
  es: {
    pageTitle: (name: string, label: string) => `Portafolio de ${name} - ${label}`,
    lab: "Lab",
    labTitle: "Incident Lab",
    labIntro:
      "Incidentes reales de producción convertidos en desafíos. Investigá con comandos como en un cluster de verdad, juntá pistas y encontrá la causa raíz.",
    labPlay: "Jugar",
    labSolved: "Resuelto",
    labDifficulty: "Dificultad",
    labCta: "¿Te animás a resolverlo? Probalo en el Incident Lab →",
    terminalTitle: "Terminal interactiva",
    terminalHint: "Escribí help · Tab autocompleta · ↑↓ historial",
    security: "Seguridad",
    securityTitle: "Reporte DevSecOps del sitio",
    securityIntro:
      "Este sitio pasa por el mismo tipo de controles que aplico en el trabajo. Un pipeline de GitHub Actions corre en cada cambio y cada semana, y publica acá sus resultados.",
    securityLastScan: "Último escaneo",
    securityCommit: "Commit",
    securityRun: "Ver ejecución del pipeline",
    securityPending: "Pendiente de la primera ejecución del pipeline",
    securityChecks: {
      secrets: "Secretos en el código e historial",
      sast: "Análisis estático (SAST)",
      deps: "Dependencias vulnerables",
      sbom: "SBOM (inventario de componentes)",
      headers: "Headers de seguridad HTTP",
      lighthouse: "Calidad web (Lighthouse)",
    },
    securityTools: "Herramienta",
    securityDownloadSbom: "Descargar SBOM (CycloneDX)",
    securityStatus: { pass: "OK", warn: "Revisar", fail: "Falla", pending: "Pendiente" },
    statusOperational: "Todos los sistemas operativos",
    statusUptime: "uptime",
    statusBuild: "build",
    about: "Sobre mí",
    now: "Ahora",
    nowUpdated: "Actualizado",
    experience: "Experiencia laboral",
    education: "Educación",
    certificates: "Certificaciones",
    projects: "Proyectos",
    skills: "Habilidades",
    languages: "Idiomas",
    cases: "Casos",
    casesIntro:
      "Incidentes reales que diagnostiqué y resolví en producción. Publico uno nuevo cada mes; los detalles internos están anonimizados.",
    casesAll: "Ver todos los casos →",
    casesTitle: "Casos de troubleshooting",
    casesSearch: "Buscar por título, tecnología o síntoma…",
    casesAllTags: "Todos",
    casesEmpty: "No hay casos que coincidan con la búsqueda.",
    casesCount: (n: number) => (n === 1 ? "1 caso" : `${n} casos`),
    rss: "RSS",
    draft: "Borrador",
    readCase: "Leer caso",
    backHome: "← Volver al inicio",
    backCases: "← Todos los casos",
    present: "Actual",
    switchLang: "English",
    switchLangTitle: "View in English",
    themeToggle: "Cambiar tema claro/oscuro",
    theme: "Cambiar tema",
    keyboardHint: "Pulsa <kbd>Cmd</kbd> + <kbd>K</kbd> para abrir la paleta de comandos.",
    searchCommand: "Buscar comando",
    print: "Imprimir",
    actions: "Acciones",
    navigation: "Navegación",
    visit: (network: string) => `Visitar ${network}`,
    sendMail: (name: string, email: string) => `Enviar un correo electrónico a ${name} al correo ${email}`,
    call: (name: string, phone: string) => `Llamar por teléfono a ${name} al número ${phone}`,
    visitProfile: (name: string, network: string) => `Visitar el perfil de ${name} en ${network}`,
    cvOf: (name: string) => `CV de ${name}`,
    see: (name: string) => `Ver ${name}`,
    cv: "CV",
    cvTitle: (name: string) => `CV de ${name}`,
    cvFocus: "Enfoque",
    cvFocusGeneral: "General",
    cvFocusLabels: { devsecops: "DevSecOps", platform: "Plataforma", data: "Datos" } as Record<Focus, string>,
    cvFocusParam: "enfoque",
    cvFocusValues: { devsecops: "devsecops", platform: "plataforma", data: "datos" } as Record<Focus, string>,
    cvRoleByFocus: {
      devsecops: "DevOps Engineer · DevSecOps",
      platform: "DevOps / Platform Engineer",
      data: "DevOps Engineer · Datos y Automatización",
    } as Record<Focus, string>,
    cvCopyLink: "Copiar link",
    cvCopied: "¡Link copiado!",
    cvPrint: "Imprimir / Guardar PDF",
    cvDownload: "Descargar PDF",
    cvHint: "Elegí un enfoque para reordenar la experiencia y las habilidades, y compartí el link.",
    skillCategories: {
      platform: "Plataforma",
      cicd: "CI/CD y GitOps",
      security: "Seguridad",
      observability: "Observabilidad",
      languages: "Lenguajes",
      data: "Datos",
    } as Record<SkillCategory, string>,
  },
  en: {
    pageTitle: (name: string, label: string) => `${name} - ${label}`,
    lab: "Lab",
    labTitle: "Incident Lab",
    labIntro:
      "Real production incidents turned into challenges. Investigate with commands like on a real cluster, collect clues and find the root cause.",
    labPlay: "Play",
    labSolved: "Solved",
    labDifficulty: "Difficulty",
    labCta: "Think you can solve it? Try it in the Incident Lab →",
    terminalTitle: "Interactive terminal",
    terminalHint: "Type help · Tab completes · ↑↓ history",
    security: "Security",
    securityTitle: "Site DevSecOps report",
    securityIntro:
      "This site goes through the same kind of controls I apply at work. A GitHub Actions pipeline runs on every change and weekly, and publishes its results here.",
    securityLastScan: "Last scan",
    securityCommit: "Commit",
    securityRun: "View pipeline run",
    securityPending: "Waiting for the first pipeline run",
    securityChecks: {
      secrets: "Secrets in code and history",
      sast: "Static analysis (SAST)",
      deps: "Vulnerable dependencies",
      sbom: "SBOM (component inventory)",
      headers: "HTTP security headers",
      lighthouse: "Web quality (Lighthouse)",
    },
    securityTools: "Tool",
    securityDownloadSbom: "Download SBOM (CycloneDX)",
    securityStatus: { pass: "OK", warn: "Review", fail: "Fail", pending: "Pending" },
    statusOperational: "All systems operational",
    statusUptime: "uptime",
    statusBuild: "build",
    about: "About",
    now: "Now",
    nowUpdated: "Updated",
    experience: "Work experience",
    education: "Education",
    certificates: "Certifications",
    projects: "Projects",
    skills: "Skills",
    languages: "Languages",
    cases: "Case studies",
    casesIntro:
      "Real production incidents I diagnosed and solved. I publish a new one every month; internal details are anonymized.",
    casesAll: "See all case studies →",
    casesTitle: "Troubleshooting case studies",
    casesSearch: "Search by title, technology or symptom…",
    casesAllTags: "All",
    casesEmpty: "No case studies match your search.",
    casesCount: (n: number) => (n === 1 ? "1 case study" : `${n} case studies`),
    rss: "RSS",
    draft: "Draft",
    readCase: "Read case",
    backHome: "← Back to home",
    backCases: "← All case studies",
    present: "Present",
    switchLang: "Español",
    switchLangTitle: "Ver en español",
    themeToggle: "Toggle light/dark theme",
    theme: "Toggle theme",
    keyboardHint: "Press <kbd>Cmd</kbd> + <kbd>K</kbd> to open the command palette.",
    searchCommand: "Search command",
    print: "Print",
    actions: "Actions",
    navigation: "Navigation",
    visit: (network: string) => `Visit ${network}`,
    sendMail: (name: string, email: string) => `Send an email to ${name} at ${email}`,
    call: (name: string, phone: string) => `Call ${name} at ${phone}`,
    visitProfile: (name: string, network: string) => `Visit ${name}'s ${network} profile`,
    cvOf: (name: string) => `${name}'s résumé`,
    see: (name: string) => `Visit ${name}`,
    cv: "Résumé",
    cvTitle: (name: string) => `${name} - Résumé`,
    cvFocus: "Focus",
    cvFocusGeneral: "General",
    cvFocusLabels: { devsecops: "DevSecOps", platform: "Platform", data: "Data" } as Record<Focus, string>,
    cvFocusParam: "focus",
    cvFocusValues: { devsecops: "devsecops", platform: "platform", data: "data" } as Record<Focus, string>,
    cvRoleByFocus: {
      devsecops: "DevOps Engineer · DevSecOps",
      platform: "DevOps / Platform Engineer",
      data: "DevOps Engineer · Data & Automation",
    } as Record<Focus, string>,
    cvCopyLink: "Copy link",
    cvCopied: "Link copied!",
    cvPrint: "Print / Save PDF",
    cvDownload: "Download PDF",
    cvHint: "Pick a focus to reorder experience and skills, then share the link.",
    skillCategories: {
      platform: "Platform",
      cicd: "CI/CD & GitOps",
      security: "Security",
      observability: "Observability",
      languages: "Languages",
      data: "Data",
    } as Record<SkillCategory, string>,
  },
}

export const t = (lang: Lang) => UI[lang]
