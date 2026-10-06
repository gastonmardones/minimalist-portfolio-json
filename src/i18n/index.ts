import es from "../../cv.json"
import en from "../../cv_english.json"

export type Lang = "es" | "en"

export const LANGS: Lang[] = ["es", "en"]

const CVS = { es, en: en as typeof es }

export const getCV = (lang: Lang) => CVS[lang]

export const getLang = (url: URL): Lang =>
  url.pathname === "/en" || url.pathname.startsWith("/en/") ? "en" : "es"

// Rutas equivalentes en el otro idioma (home y detalle de casos)
export const homePath = (lang: Lang) => (lang === "en" ? "/en/" : "/")
export const casePath = (lang: Lang, slug: string) =>
  lang === "en" ? `/en/cases/${slug}/` : `/casos/${slug}/`

export const UI = {
  es: {
    pageTitle: (name: string, label: string) => `Portafolio de ${name} - ${label}`,
    about: "Sobre mí",
    experience: "Experiencia laboral",
    education: "Educación",
    certificates: "Certificaciones",
    projects: "Proyectos",
    skills: "Habilidades",
    cases: "Casos",
    casesIntro:
      "Incidentes reales que diagnostiqué y resolví en producción. Los detalles internos están anonimizados.",
    readCase: "Leer caso",
    backHome: "← Volver al inicio",
    context: "Contexto",
    symptom: "Síntoma",
    diagnosis: "Diagnóstico",
    rootCause: "Causa raíz",
    fix: "Solución",
    lessons: "Aprendizajes",
    present: "Actual",
    switchLang: "English",
    switchLangTitle: "View in English",
    keyboardHint: "Pulsa <kbd>Cmd</kbd> + <kbd>K</kbd> para abrir la paleta de comandos.",
    searchCommand: "Buscar comando",
    print: "Imprimir",
    actions: "Acciones",
    visit: (network: string) => `Visitar ${network}`,
    sendMail: (name: string, email: string) => `Enviar un correo electrónico a ${name} al correo ${email}`,
    call: (name: string, phone: string) => `Llamar por teléfono a ${name} al número ${phone}`,
    visitProfile: (name: string, network: string) => `Visitar el perfil de ${name} en ${network}`,
    cvOf: (name: string) => `CV de ${name}`,
    see: (name: string) => `Ver ${name}`,
    issued: "Emitido",
    validUntil: "Válido hasta",
  },
  en: {
    pageTitle: (name: string, label: string) => `${name} - ${label}`,
    about: "About",
    experience: "Work experience",
    education: "Education",
    certificates: "Certifications",
    projects: "Projects",
    skills: "Skills",
    cases: "Case studies",
    casesIntro:
      "Real production incidents I diagnosed and solved. Internal details are anonymized.",
    readCase: "Read case",
    backHome: "← Back to home",
    context: "Context",
    symptom: "Symptom",
    diagnosis: "Diagnosis",
    rootCause: "Root cause",
    fix: "Fix",
    lessons: "Takeaways",
    present: "Present",
    switchLang: "Español",
    switchLangTitle: "Ver en español",
    keyboardHint: "Press <kbd>Cmd</kbd> + <kbd>K</kbd> to open the command palette.",
    searchCommand: "Search command",
    print: "Print",
    actions: "Actions",
    visit: (network: string) => `Visit ${network}`,
    sendMail: (name: string, email: string) => `Send an email to ${name} at ${email}`,
    call: (name: string, phone: string) => `Call ${name} at ${phone}`,
    visitProfile: (name: string, network: string) => `Visit ${name}'s ${network} profile`,
    cvOf: (name: string) => `${name}'s résumé`,
    see: (name: string) => `Visit ${name}`,
    issued: "Issued",
    validUntil: "Valid until",
  },
} as const

export const t = (lang: Lang) => UI[lang]
