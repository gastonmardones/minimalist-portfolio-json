import { e as createAstro, f as createComponent, r as renderTemplate, i as renderSlot, j as renderHead, h as addAttribute, m as maybeRenderHead, k as renderComponent } from '../astro_esoUY_RW.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import 'cssesc';
/* empty css                          */

const basics = {
	name: "Gastón Mardones",
	label: "Full Stack Developer",
	image: "/me.jpeg",
	email: "gastonmardones22@gmail.com",
	phone: "+54 294 4321600",
	url: "",
	summary: "Soy una persona autodidacta con mucha pasión por la tecnología y el impacto que generan en el mundo. Tengo la curiosidad de aprender todos los días algo diferente, la motivación para afrontar nuevos desafíos y la necesidad de estar rodeado de personas con intereses similares, siempre con el mismo objetivo: buscar oportunidades para seguir aprendiendo.",
	location: {
		address: "Villa Crespo",
		postalCode: "1416",
		city: "Buenos Aires",
		countryCode: "AR",
		region: "Argentina"
	},
	profiles: [
		{
			network: "LinkedIn",
			username: "gaston-mardones",
			url: "https://linkedin.com/in/gaston-mardones"
		},
		{
			network: "GitHub",
			username: "gastonmardones",
			url: "https://github.com/gastonmardones"
		}
	]
};
const work = [
	{
		name: "EduAnalytica",
		position: "Full Stack Web Developer",
		url: "https://eduanalytica.com.ar/",
		startDate: "2021-01-01",
		endDate: null,
		summary: "Como desarrollador fullstack con enfoque en el framework Django, he estado desempeñando un papel integral en la creación y mejora de soluciones web dirigidas específicamente a escuelas y entornos educativos. Mi tarea se ha centrado en la creación de herramientas innovadoras y funcionales para mejorar la experiencia educativa y administrativa.",
		highlights: [
			null
		]
	}
];
const education = [
	{
		institution: "Universidad de Buenos Aires",
		url: "https://www.uba.ar/",
		area: "Lic. en Ciencias de Datos",
		studyType: "Licenciatura",
		startDate: "2023-01-01",
		endDate: null,
		score: null,
		courses: [
			null
		]
	}
];
const skills = [
	{
		name: "Python",
		level: "Advanced",
		keywords: [
			"Desarrollo Web",
			"Frontend",
			"Backend",
			"JavaScript Superset"
		]
	},
	{
		name: "Django",
		level: "Advanced",
		keywords: [
			"Desarrollo Web",
			"Backend",
			"Python",
			"Servidor"
		]
	},
	{
		name: "HTML",
		level: "Intermediate",
		keywords: [
			"Desarrollo Web",
			"Frontend"
		]
	},
	{
		name: "CSS",
		level: "Basic",
		keywords: [
			"Desarrollo Web",
			"Frontend",
			"Diseño Responsive"
		]
	},
	{
		name: "JavaScript",
		level: "Intermediate",
		keywords: [
			"Desarrollo Web",
			"Frontend",
			"Backend",
			"Fullstack"
		]
	},
	{
		name: "Tailwind",
		level: "Basic",
		keywords: [
			"Desarrollo Web",
			"Frontend",
			"CSS Framework",
			"Diseño Responsive"
		]
	},
	{
		name: "TypeScript",
		level: "Basic",
		keywords: [
			"Desarrollo Web",
			"Frontend",
			"Backend",
			"JavaScript Superset"
		]
	},
	{
		name: "MySQL",
		level: "Intermediate",
		keywords: [
			"Bases de Datos",
			"SQL",
			"Almacenamiento de Datos",
			"Backend"
		]
	},
	{
		name: "Git",
		level: "Intermediate",
		keywords: [
			"Control de Versiones",
			"Colaboración",
			"Código Fuente"
		]
	},
	{
		name: "GitHub",
		level: "Avanzado",
		keywords: [
			"Control de Versiones",
			"Colaboración",
			"Código Fuente",
			"Git"
		]
	},
	{
		name: "Astro",
		level: "Basic",
		keywords: [
			"Desarrollo Web",
			"Frontend",
			"React Framework",
			"SSR",
			"Static Generation"
		]
	},
	{
		name: "React",
		level: "Basic",
		keywords: [
			"Desarrollo Web",
			"Frontend",
			"JavaScript Library",
			"UI"
		]
	}
];
const projects = [
	{
		name: "Facundo Pereyra Web",
		isActive: false,
		description: "Página web para un estilista",
		highlights: [
			"Landing Page",
			"En desarrollo"
		],
		url: "",
		github: ""
	}
];

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$s = createAstro("https://gastonmardones.netlify.app/");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$s, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  const { image, summary, url } = basics;
  return renderTemplate(_a || (_a = __template(['<html lang="es"> <head><meta charset="UTF-8"><title>', '</title><meta name="description"', '><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="preload" as="image"', '><meta property="og:url"', '><meta property="og:type" content="website"><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image" content=""><meta name="twitter:card" content="summary_large_image"><meta property="twitter:domain"', '><meta property="twitter:url"', '><meta name="twitter:title"', '><meta name="twitter:description"', `><meta name="twitter:image" content=""><!-- Google tag (gtag.js) --><script type="text/partytown" async src="https://www.googletagmanager.com/gtag/js?id=G-WYFBN0LNFJ"><\/script><script type="text/partytown">
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-WYFBN0LNFJ');
    <\/script>`, "</head> <body> ", " </body></html>"])), title, addAttribute(summary, "content"), addAttribute(image, "href"), addAttribute(url, "content"), addAttribute(title, "content"), addAttribute(summary, "content"), addAttribute(url.split("//")[1] ?? "", "content"), addAttribute(url, "content"), addAttribute(title, "content"), addAttribute(summary, "content"), renderHead(), renderSlot($$result, $$slots["default"]));
}, "C:/Users/gasto/OneDrive/Documentos/GitHub/minimalist-portfolio-json/src/layouts/Layout.astro", void 0);

const $$Astro$r = createAstro("https://gastonmardones.netlify.app/");
const $$Section = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$r, $$props, $$slots);
  Astro2.self = $$Section;
  const { title } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section data-astro-cid-sh445jdo> ${title && renderTemplate`<h2 data-astro-cid-sh445jdo>${title}</h2>`} ${renderSlot($$result, $$slots["default"])} </section>  `;
}, "C:/Users/gasto/OneDrive/Documentos/GitHub/minimalist-portfolio-json/src/components/Section.astro", void 0);

const $$Astro$q = createAstro("https://gastonmardones.netlify.app/");
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$q, $$props, $$slots);
  Astro2.self = $$About;
  const { summary } = basics;
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "title": "Sobre m\xED" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p> ${summary} </p> ` })}`;
}, "C:/Users/gasto/OneDrive/Documentos/GitHub/minimalist-portfolio-json/src/components/sections/About.astro", void 0);

const $$Astro$p = createAstro("https://gastonmardones.netlify.app/");
const $$Education = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$p, $$props, $$slots);
  Astro2.self = $$Education;
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "title": "Educaci\xF3n", "data-astro-cid-qtcj2w7e": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<ul data-astro-cid-qtcj2w7e> ${education.map(({ institution, startDate, endDate, area }) => {
    const startYear = new Date(startDate).getFullYear();
    const endYear = endDate != null ? new Date(endDate).getFullYear() : "Actual";
    const years = `${startYear} - ${endYear}`;
    return renderTemplate`<li data-astro-cid-qtcj2w7e> <article data-astro-cid-qtcj2w7e> <header data-astro-cid-qtcj2w7e> <div data-astro-cid-qtcj2w7e> <h3 data-astro-cid-qtcj2w7e>${institution}</h3> </div> <time data-astro-cid-qtcj2w7e>${years}</time> </header> <footer data-astro-cid-qtcj2w7e> <p data-astro-cid-qtcj2w7e>${area}</p> </footer> </article> </li>`;
  })} </ul> ` })} `;
}, "C:/Users/gasto/OneDrive/Documentos/GitHub/minimalist-portfolio-json/src/components/sections/Education.astro", void 0);

const $$Astro$o = createAstro("https://gastonmardones.netlify.app/");
const $$Experience = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$o, $$props, $$slots);
  Astro2.self = $$Experience;
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "title": "Experiencia laboral", "data-astro-cid-ghubstuj": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<ul data-astro-cid-ghubstuj> ${work.map(
    ({ name, startDate, endDate, position, summary, highlights, url }) => {
      const startYear = new Date(startDate).getFullYear();
      const endYear = endDate != null ? new Date(endDate).getFullYear() : "Actual";
      const years = `${startYear} - ${endYear}`;
      return renderTemplate`<li data-astro-cid-ghubstuj> <article data-astro-cid-ghubstuj> <header data-astro-cid-ghubstuj> <div data-astro-cid-ghubstuj> <h3 data-astro-cid-ghubstuj> <a${addAttribute(url, "href")}${addAttribute(`Ver ${name}`, "title")} target="_blank" data-astro-cid-ghubstuj> ${name} </a> </h3> <h4 data-astro-cid-ghubstuj>${position}</h4> </div> <time data-astro-cid-ghubstuj>${years}</time> </header> <footer data-astro-cid-ghubstuj> <p data-astro-cid-ghubstuj>${summary}</p> </footer> </article> </li>`;
    }
  )} </ul> ` })} `;
}, "C:/Users/gasto/OneDrive/Documentos/GitHub/minimalist-portfolio-json/src/components/sections/Experience.astro", void 0);

const $$Astro$n = createAstro("https://gastonmardones.netlify.app/");
const $$Mail = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$n, $$props, $$slots);
  Astro2.self = $$Mail;
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail size-4"><title>Mail Icon</title><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>`;
}, "C:/Users/gasto/OneDrive/Documentos/GitHub/minimalist-portfolio-json/src/icons/Mail.astro", void 0);

const $$Astro$m = createAstro("https://gastonmardones.netlify.app/");
const $$Phone = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$m, $$props, $$slots);
  Astro2.self = $$Phone;
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><title>Phone Icon</title><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`;
}, "C:/Users/gasto/OneDrive/Documentos/GitHub/minimalist-portfolio-json/src/icons/Phone.astro", void 0);

const $$Astro$l = createAstro("https://gastonmardones.netlify.app/");
const $$X = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$l, $$props, $$slots);
  Astro2.self = $$X;
  return renderTemplate`${maybeRenderHead()}<svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>X</title><path fill="currentColor" d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"></path></svg>`;
}, "C:/Users/gasto/OneDrive/Documentos/GitHub/minimalist-portfolio-json/src/icons/X.astro", void 0);

const $$Astro$k = createAstro("https://gastonmardones.netlify.app/");
const $$LinkedIn = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$k, $$props, $$slots);
  Astro2.self = $$LinkedIn;
  return renderTemplate`${maybeRenderHead()}<svg height="16" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>`;
}, "C:/Users/gasto/OneDrive/Documentos/GitHub/minimalist-portfolio-json/src/icons/LinkedIn.astro", void 0);

const $$Astro$j = createAstro("https://gastonmardones.netlify.app/");
const $$GitHub = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$j, $$props, $$slots);
  Astro2.self = $$GitHub;
  return renderTemplate`${maybeRenderHead()}<svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>`;
}, "C:/Users/gasto/OneDrive/Documentos/GitHub/minimalist-portfolio-json/src/icons/GitHub.astro", void 0);

const $$Astro$i = createAstro("https://gastonmardones.netlify.app/");
const $$WorldMap = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$WorldMap;
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <circle cx="12" cy="12" r="10"></circle> <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path> </svg>`;
}, "C:/Users/gasto/OneDrive/Documentos/GitHub/minimalist-portfolio-json/src/icons/WorldMap.astro", void 0);

const $$Astro$h = createAstro("https://gastonmardones.netlify.app/");
const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$Hero;
  const { name, label, image, location, profiles, phone, email } = basics;
  const { city, region, address } = location;
  const SOCIAL_ICONS = {
    GitHub: $$GitHub,
    LinkedIn: $$LinkedIn,
    X: $$X
  };
  const linkedInfo = profiles.find(({ network }) => network === "LinkedIn");
  const linkedUrl = linkedInfo?.url;
  const printInfo = [email, phone, linkedUrl].filter(Boolean).join(" \u2022 ");
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "data-astro-cid-anhloy43": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container" data-astro-cid-anhloy43> <div class="info" data-astro-cid-anhloy43> <h1 data-astro-cid-anhloy43>${name}</h1> <h2 data-astro-cid-anhloy43>${label}</h2> <span data-astro-cid-anhloy43> ${renderComponent($$result2, "WorldMap", $$WorldMap, { "data-astro-cid-anhloy43": true })} <a${addAttribute(`https://www.google.com/maps/place/${city} ${address}`, "href")} target="_blank" data-astro-cid-anhloy43>${address}, ${city}, ${region}</a> </span> <footer class="print" data-astro-cid-anhloy43> ${printInfo} </footer> <footer class="no-print" data-astro-cid-anhloy43> ${email && renderTemplate`<a${addAttribute(`mailto:${email}`, "href")}${addAttribute(`Enviar un correo electr\xF3nico a ${name} al correo ${email}`, "title")} target="_blank" rel="noopener noreferrer" data-astro-cid-anhloy43> ${renderComponent($$result2, "Mail", $$Mail, { "data-astro-cid-anhloy43": true })} </a>`} ${phone && renderTemplate`<a${addAttribute(`tel:${phone}`, "href")}${addAttribute(`Llamar por tel\xE9fono a ${name} al n\xFAmero ${phone}`, "title")} target="_blank" rel="noopener noreferrer" data-astro-cid-anhloy43> ${renderComponent($$result2, "Phone", $$Phone, { "data-astro-cid-anhloy43": true })} </a>`} ${profiles.map(({ network, url, username }) => {
    const Icon = SOCIAL_ICONS[network];
    return renderTemplate`<a${addAttribute(url, "href")}${addAttribute(`Visitar el perfil de ${name} en ${network}`, "title")} target="_blank" rel="noopener noreferrer" data-astro-cid-anhloy43> ${renderComponent($$result2, "Icon", Icon, { "data-astro-cid-anhloy43": true })} </a>`;
  })} </footer> </div> <figure data-astro-cid-anhloy43> <img${addAttribute(image, "src")}${addAttribute(name, "alt")} data-astro-cid-anhloy43> </figure> </div> ` })} `;
}, "C:/Users/gasto/OneDrive/Documentos/GitHub/minimalist-portfolio-json/src/components/sections/Hero.astro", void 0);

const $$Astro$g = createAstro("https://gastonmardones.netlify.app/");
const $$Projects = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$Projects;
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "title": "Proyectos", "data-astro-cid-44zkpkd5": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<ul data-astro-cid-44zkpkd5> ${projects.map(
    ({ url, description, highlights, name, isActive, github }) => {
      return renderTemplate`<li data-astro-cid-44zkpkd5> <article data-astro-cid-44zkpkd5> <header data-astro-cid-44zkpkd5> <h3 data-astro-cid-44zkpkd5> <a${addAttribute(url, "href")} target="_blank"${addAttribute(`Ver el proyecto ${name}`, "title")} data-astro-cid-44zkpkd5> ${name} </a> <span${addAttribute([
        {
          "active": isActive,
          "inactive": !isActive
        }
      ], "class:list")} data-astro-cid-44zkpkd5>•</span> ${github && renderTemplate`<a class="github-code-link"${addAttribute(github, "href")} target="_blank"${addAttribute(`Ver c\xF3digo fuente del proyecto ${name}`, "title")} data-astro-cid-44zkpkd5> ${renderComponent($$result2, "GitHub", $$GitHub, { "data-astro-cid-44zkpkd5": true })} </a>`} </h3> <p data-astro-cid-44zkpkd5>${description}</p> </header> <footer data-astro-cid-44zkpkd5> ${highlights.map((highlight) => {
        return renderTemplate`<span data-astro-cid-44zkpkd5>${highlight}</span>`;
      })} </footer> </article> </li>`;
    }
  )} </ul> ` })} `;
}, "C:/Users/gasto/OneDrive/Documentos/GitHub/minimalist-portfolio-json/src/components/sections/Projects.astro", void 0);

const $$Astro$f = createAstro("https://gastonmardones.netlify.app/");
const $$Html = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$Html;
  return renderTemplate`${maybeRenderHead()}<svg width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5z"></path><path d="M15.5 8h-7l.5 4h6l-.5 3.5l-2.5 .75l-2.5 -.75l-.1 -.5"></path></svg>`;
}, "C:/Users/gasto/OneDrive/Documentos/GitHub/minimalist-portfolio-json/src/icons/html.astro", void 0);

const $$Astro$e = createAstro("https://gastonmardones.netlify.app/");
const $$Css = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$Css;
  return renderTemplate`${maybeRenderHead()}<svg width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5z"></path><path d="M8.5 8h7l-4.5 4h4l-.5 3.5l-2.5 .75l-2.5 -.75l-.1 -.5"></path></svg>`;
}, "C:/Users/gasto/OneDrive/Documentos/GitHub/minimalist-portfolio-json/src/icons/css.astro", void 0);

const $$Astro$d = createAstro("https://gastonmardones.netlify.app/");
const $$Javascript = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$Javascript;
  return renderTemplate`${maybeRenderHead()}<svg width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5z"></path><path d="M7.5 8h3v8l-2 -1"></path><path d="M16.5 8h-2.5a.5 .5 0 0 0 -.5 .5v3a.5 .5 0 0 0 .5 .5h1.423a.5 .5 0 0 1 .495 .57l-.418 2.93l-2 .5"></path></svg>`;
}, "C:/Users/gasto/OneDrive/Documentos/GitHub/minimalist-portfolio-json/src/icons/javascript.astro", void 0);

const $$Astro$c = createAstro("https://gastonmardones.netlify.app/");
const $$Type = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$Type;
  return renderTemplate`${maybeRenderHead()}<svg width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M15 17.5c.32 .32 .754 .5 1.207 .5h.543c.69 0 1.25 -.56 1.25 -1.25v-.25a1.5 1.5 0 0 0 -1.5 -1.5a1.5 1.5 0 0 1 -1.5 -1.5v-.25c0 -.69 .56 -1.25 1.25 -1.25h.543c.453 0 .887 .18 1.207 .5"></path><path d="M9 12h4"></path><path d="M11 12v6"></path><path d="M21 19v-14a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2 -2z"></path></svg>`;
}, "C:/Users/gasto/OneDrive/Documentos/GitHub/minimalist-portfolio-json/src/icons/type.astro", void 0);

const $$Astro$b = createAstro("https://gastonmardones.netlify.app/");
const $$React = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$React;
  return renderTemplate`${maybeRenderHead()}<svg width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M6.306 8.711c-2.602 .723 -4.306 1.926 -4.306 3.289c0 2.21 4.477 4 10 4c.773 0 1.526 -.035 2.248 -.102"></path><path d="M17.692 15.289c2.603 -.722 4.308 -1.926 4.308 -3.289c0 -2.21 -4.477 -4 -10 -4c-.773 0 -1.526 .035 -2.25 .102"></path><path d="M6.305 15.287c-.676 2.615 -.485 4.693 .695 5.373c1.913 1.105 5.703 -1.877 8.464 -6.66c.387 -.67 .733 -1.339 1.036 -2"></path><path d="M17.694 8.716c.677 -2.616 .487 -4.696 -.694 -5.376c-1.913 -1.105 -5.703 1.877 -8.464 6.66c-.387 .67 -.733 1.34 -1.037 2"></path><path d="M12 5.424c-1.925 -1.892 -3.82 -2.766 -5 -2.084c-1.913 1.104 -1.226 5.877 1.536 10.66c.386 .67 .793 1.304 1.212 1.896"></path><path d="M12 18.574c1.926 1.893 3.821 2.768 5 2.086c1.913 -1.104 1.226 -5.877 -1.536 -10.66c-.375 -.65 -.78 -1.283 -1.212 -1.897"></path><path d="M11.5 12.866a1 1 0 1 0 1 -1.732a1 1 0 0 0 -1 1.732z"></path></svg>`;
}, "C:/Users/gasto/OneDrive/Documentos/GitHub/minimalist-portfolio-json/src/icons/react.astro", void 0);

const $$Astro$a = createAstro("https://gastonmardones.netlify.app/");
const $$Node = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Node;
  return renderTemplate`${maybeRenderHead()}<svg width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M9 9v8.044a2 2 0 0 1 -2.996 1.734l-1.568 -.9a3 3 0 0 1 -1.436 -2.561v-6.635a3 3 0 0 1 1.436 -2.56l6 -3.667a3 3 0 0 1 3.128 0l6 3.667a3 3 0 0 1 1.436 2.561v6.634a3 3 0 0 1 -1.436 2.56l-6 3.667a3 3 0 0 1 -3.128 0"></path><path d="M17 9h-3.5a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3h-3.5"></path></svg>`;
}, "C:/Users/gasto/OneDrive/Documentos/GitHub/minimalist-portfolio-json/src/icons/node.astro", void 0);

const $$Astro$9 = createAstro("https://gastonmardones.netlify.app/");
const $$Sql = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Sql;
  return renderTemplate`${maybeRenderHead()}<svg width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M13 21c-1.427 -1.026 -3.59 -3.854 -4 -6c-.486 .77 -1.501 2 -2 2c-1.499 -.888 -.574 -3.973 0 -6c-1.596 -1.433 -2.468 -2.458 -2.5 -4c-3.35 -3.44 -.444 -5.27 2.5 -3h1c8.482 .5 6.421 8.07 9 11.5c2.295 .522 3.665 2.254 5 3.5c-2.086 -.2 -2.784 -.344 -3.5 0c.478 1.64 2.123 2.2 3.5 3"></path><path d="M9 7h.01"></path></svg>`;
}, "C:/Users/gasto/OneDrive/Documentos/GitHub/minimalist-portfolio-json/src/icons/sql.astro", void 0);

const $$Astro$8 = createAstro("https://gastonmardones.netlify.app/");
const $$Git = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Git;
  return renderTemplate`${maybeRenderHead()}<svg width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M16 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path><path d="M12 8m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path><path d="M12 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path><path d="M12 15v-6"></path><path d="M15 11l-2 -2"></path><path d="M11 7l-1.9 -1.9"></path><path d="M13.446 2.6l7.955 7.954a2.045 2.045 0 0 1 0 2.892l-7.955 7.955a2.045 2.045 0 0 1 -2.892 0l-7.955 -7.955a2.045 2.045 0 0 1 0 -2.892l7.955 -7.955a2.045 2.045 0 0 1 2.892 0z"></path></svg>`;
}, "C:/Users/gasto/OneDrive/Documentos/GitHub/minimalist-portfolio-json/src/icons/git.astro", void 0);

const $$Astro$7 = createAstro("https://gastonmardones.netlify.app/");
const $$Tailwind = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Tailwind;
  return renderTemplate`${maybeRenderHead()}<svg width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M11.667 6c-2.49 0 -4.044 1.222 -4.667 3.667c.933 -1.223 2.023 -1.68 3.267 -1.375c.71 .174 1.217 .68 1.778 1.24c.916 .912 2 1.968 4.288 1.968c2.49 0 4.044 -1.222 4.667 -3.667c-.933 1.223 -2.023 1.68 -3.267 1.375c-.71 -.174 -1.217 -.68 -1.778 -1.24c-.916 -.912 -1.975 -1.968 -4.288 -1.968zm-4 6.5c-2.49 0 -4.044 1.222 -4.667 3.667c.933 -1.223 2.023 -1.68 3.267 -1.375c.71 .174 1.217 .68 1.778 1.24c.916 .912 1.975 1.968 4.288 1.968c2.49 0 4.044 -1.222 4.667 -3.667c-.933 1.223 -2.023 1.68 -3.267 1.375c-.71 -.174 -1.217 -.68 -1.778 -1.24c-.916 -.912 -1.975 -1.968 -4.288 -1.968z"></path></svg>`;
}, "C:/Users/gasto/OneDrive/Documentos/GitHub/minimalist-portfolio-json/src/icons/tailwind.astro", void 0);

const $$Astro$6 = createAstro("https://gastonmardones.netlify.app/");
const $$Next = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Next;
  return renderTemplate`${maybeRenderHead()}<svg width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M9 15v-6l7.745 10.65a9 9 0 1 1 2.255 -1.993"></path><path d="M15 12v-3"></path></svg>`;
}, "C:/Users/gasto/OneDrive/Documentos/GitHub/minimalist-portfolio-json/src/icons/next.astro", void 0);

const $$Astro$5 = createAstro("https://gastonmardones.netlify.app/");
const $$Django = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Django;
  return renderTemplate`${maybeRenderHead()}<svg fill="#000000" width="16" height="16" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>django</title> <path d="M22.706 1.095h4.882v5.009h-4.882zM27.589 8.609v11.32c0.045 0.437 0.070 0.943 0.070 1.456 0 2.143-0.446 4.181-1.249 6.028l0.038-0.098c-0.871 1.637-2.259 2.903-3.943 3.596l-0.052 0.019-4.534-2.156c1.671-0.593 3.020-1.747 3.85-3.23l0.018-0.036c0.698-1.395 0.919-3.012 0.919-7.26v-9.64h4.882zM14.937 12.445c-0.462-0.162-0.996-0.255-1.55-0.255-0.034 0-0.069 0-0.103 0.001l0.005-0c-0.074-0.005-0.161-0.008-0.248-0.008-2.036 0-3.687 1.651-3.687 3.687 0 0.179 0.013 0.356 0.038 0.528l-0.002-0.020c-0.021 0.146-0.034 0.315-0.034 0.487 0 1.964 1.592 3.556 3.556 3.556 0.122 0 0.242-0.006 0.361-0.018l-0.015 0.001c0.593-0 1.175-0.046 1.743-0.135l-0.063 0.008v-7.832zM14.937 1.069h4.882v22.603c-1.901 0.411-4.089 0.653-6.331 0.666l-0.010 0c-5.961 0-9.068-2.695-9.068-7.864-0.008-0.134-0.013-0.29-0.013-0.447 0-4.302 3.488-7.79 7.79-7.79 0.22 0 0.438 0.009 0.653 0.027l-0.028-0.002c0.045-0.001 0.097-0.001 0.15-0.001 0.702 0 1.382 0.093 2.028 0.267l-0.055-0.012z"></path> </g></svg>`;
}, "C:/Users/gasto/OneDrive/Documentos/GitHub/minimalist-portfolio-json/src/icons/django.astro", void 0);

const $$Astro$4 = createAstro("https://gastonmardones.netlify.app/");
const $$Python = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Python;
  return renderTemplate`${maybeRenderHead()}<svg width="16" height="16" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>python [#127]</title> <desc>Created with Sketch.</desc> <defs></defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-340.000000, -7599.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M296.744,7457.45798 C296.262,7457.45798 295.872,7457.06594 295.872,7456.58142 C295.872,7456.0969 296.262,7455.70587 296.744,7455.70587 C297.226,7455.70587 297.616,7456.0969 297.616,7456.58142 C297.616,7457.06594 297.226,7457.45798 296.744,7457.45798 M294.072,7459 C299.15,7459 298.833,7456.78649 298.833,7456.78649 L298.827,7454.49357 L293.982,7454.49357 L293.982,7453.80499 L300.751,7453.80499 C300.751,7453.80499 304,7454.17591 304,7449.02614 C304,7443.87636 301.165,7444.0583 301.165,7444.0583 L299.472,7444.0583 L299.472,7446.44873 C299.472,7446.44873 299.563,7449.29855 296.682,7449.29855 L291.876,7449.29855 C291.876,7449.29855 289.176,7449.25533 289.176,7451.9222 L289.176,7456.33112 C289.176,7456.33112 288.766,7459 294.072,7459 M291.257,7440.54202 C291.739,7440.54202 292.128,7440.93406 292.128,7441.41858 C292.128,7441.9031 291.739,7442.29413 291.257,7442.29413 C290.775,7442.29413 290.385,7441.9031 290.385,7441.41858 C290.385,7440.93406 290.775,7440.54202 291.257,7440.54202 M293.928,7439 C288.851,7439 289.168,7441.21351 289.168,7441.21351 L289.174,7443.50643 L294.019,7443.50643 L294.019,7444.19501 L287.249,7444.19501 C287.249,7444.19501 284,7443.82409 284,7448.97386 C284,7454.12364 286.836,7453.9417 286.836,7453.9417 L288.528,7453.9417 L288.528,7451.55127 C288.528,7451.55127 288.437,7448.70145 291.319,7448.70145 L296.124,7448.70145 C296.124,7448.70145 298.824,7448.74467 298.824,7446.0778 L298.824,7441.66888 C298.824,7441.66888 299.234,7439 293.928,7439" id="python-[#127]"></path> </g> </g> </g> </g></svg>`;
}, "C:/Users/gasto/OneDrive/Documentos/GitHub/minimalist-portfolio-json/src/icons/python.astro", void 0);

const $$Astro$3 = createAstro("https://gastonmardones.netlify.app/");
const $$Component = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Component;
  return renderTemplate`${maybeRenderHead()}<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><defs><linearGradient id="a" x1="882.997" x2="638.955" y1="27.113" y2="866.902" gradientTransform="scale(.1)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#000014"></stop><stop offset="1" stop-color="#150426"></stop></linearGradient><linearGradient id="b" x1="1001.68" x2="790.326" y1="652.45" y2="1094.91" gradientTransform="scale(.1)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ff1639"></stop><stop offset="1" stop-color="#ff1639" stop-opacity="0"></stop></linearGradient></defs><path fill="url(#a)" d="M81.504 9.465c.973 1.207 1.469 2.836 2.457 6.09l21.656 71.136a90.079 90.079 0 0 0-25.89-8.765L65.629 30.28a1.833 1.833 0 0 0-3.52.004L48.18 77.902a90.104 90.104 0 0 0-26.003 8.778l21.758-71.14c.996-3.25 1.492-4.876 2.464-6.083a8.023 8.023 0 0 1 3.243-2.398c1.433-.575 3.136-.575 6.535-.575H71.72c3.402 0 5.105 0 6.543.579a7.988 7.988 0 0 1 3.242 2.402Zm0 0"></path><path fill="#000" d="M84.094 90.074c-3.57 3.055-10.696 5.137-18.903 5.137-10.07 0-18.515-3.137-20.754-7.356-.8 2.418-.98 5.184-.98 6.954 0 0-.527 8.675 5.508 14.71a5.671 5.671 0 0 1 5.672-5.671c5.37 0 5.367 4.683 5.363 8.488v.336c0 5.773 3.527 10.719 8.543 12.805a11.62 11.62 0 0 1-1.172-5.098c0-5.508 3.23-7.555 6.988-9.938 2.989-1.894 6.309-4 8.594-8.222a15.513 15.513 0 0 0 1.875-7.41 15.55 15.55 0 0 0-.734-4.735Zm0 0"></path><path fill="url(#b)" d="M84.094 90.074c-3.57 3.055-10.696 5.137-18.903 5.137-10.07 0-18.515-3.137-20.754-7.356-.8 2.418-.98 5.184-.98 6.954 0 0-.527 8.675 5.508 14.71a5.671 5.671 0 0 1 5.672-5.671c5.37 0 5.367 4.683 5.363 8.488v.336c0 5.773 3.527 10.719 8.543 12.805a11.62 11.62 0 0 1-1.172-5.098c0-5.508 3.23-7.555 6.988-9.938 2.989-1.894 6.309-4 8.594-8.222a15.513 15.513 0 0 0 1.875-7.41 15.55 15.55 0 0 0-.734-4.735Zm0 0"></path></svg>`;
}, "C:/Users/gasto/OneDrive/Documentos/GitHub/minimalist-portfolio-json/src/icons/astro.astro", void 0);

const $$Astro$2 = createAstro("https://gastonmardones.netlify.app/");
const $$Skills = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Skills;
  const SKILLS_ICONS = {
    HTML: $$Html,
    CSS: $$Css,
    JavaScript: $$Javascript,
    TypeScript: $$Type,
    React: $$React,
    Node: $$Node,
    MySQL: $$Sql,
    Git: $$Git,
    GitHub: $$GitHub,
    Next: $$Next,
    Tailwind: $$Tailwind,
    Django: $$Django,
    Python: $$Python,
    Astrojs: $$Component
  };
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "title": "Habilidades", "data-astro-cid-sye7xtqh": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<ul data-astro-cid-sye7xtqh> ${skills.map(({ name }) => {
    const iconName = name === "Astro" ? "Astrojs" : name;
    const Icon = SKILLS_ICONS[iconName];
    return renderTemplate`<li data-astro-cid-sye7xtqh> ${Icon && renderTemplate`${renderComponent($$result2, "Icon", Icon, { "data-astro-cid-sye7xtqh": true })}`} <span data-astro-cid-sye7xtqh>${name}</span> </li>`;
  })} </ul> ` })} `;
}, "C:/Users/gasto/OneDrive/Documentos/GitHub/minimalist-portfolio-json/src/components/sections/Skills.astro", void 0);

const $$Astro$1 = createAstro("https://gastonmardones.netlify.app/");
const $$KeyboardManager = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$KeyboardManager;
  const { profiles } = basics;
  const SOCIAL_ICONS = {
    GitHub: `<svg
  width="16"
  height="16"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
  style="margin-right: 8px"
  ><path
    fill="currentColor"
    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
  ></path></svg
>`,
    LinkedIn: `<svg
  height="16"
  width="16"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
  style="margin-right: 8px"
  ><title>LinkedIn</title><path
    fill="currentColor"
    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
  ></path></svg
>`,
    X: `<svg
  width="16"
  height="16"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
  style="margin-right: 8px"
  ><title>X</title><path
    fill="currentColor"
    d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
  ></path></svg
>
`
  };
  const profilesInfo = profiles.map(({ network, url }) => {
    const icon = SOCIAL_ICONS[network];
    const firstLetter = network[0].toUpperCase();
    return {
      id: network,
      section: "Social",
      title: `Visitar ${network}`,
      url,
      icon,
      hotkey: `ctrl+${firstLetter}`
    };
  });
  return renderTemplate`${maybeRenderHead()}<footer id="normal-footer" class="no-print" data-astro-cid-5uazswxx>
Pulsa <kbd data-astro-cid-5uazswxx>Cmd</kbd> + <kbd data-astro-cid-5uazswxx>K</kbd> para abrir la paleta de comandos.
</footer> <div id="footer-button" class="no-print" data-astro-cid-5uazswxx> <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-command" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#777" fill="none" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-5uazswxx> <path stroke="none" d="M0 0h24v24H0z" fill="none" data-astro-cid-5uazswxx></path> <path d="M7 9a2 2 0 1 1 2 -2v10a2 2 0 1 1 -2 -2h10a2 2 0 1 1 -2 2v-10a2 2 0 1 1 2 2h-10" data-astro-cid-5uazswxx></path> </svg> </div> <div id="hotkeypad" data-placeholder="Buscar comando"${addAttribute(JSON.stringify(profilesInfo), "data-info")} data-astro-cid-5uazswxx></div>  `;
}, "C:/Users/gasto/OneDrive/Documentos/GitHub/minimalist-portfolio-json/src/components/KeyboardManager.astro", void 0);

const $$Astro = createAstro("https://gastonmardones.netlify.app/");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { name, label } = basics;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Portafolio de ${name} - ${label}`, "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Hero", $$Hero, { "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "About", $$About, { "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Experience", $$Experience, { "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Education", $$Education, { "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Projects", $$Projects, { "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Skills", $$Skills, { "data-astro-cid-j7pv25f6": true })} </main> ${renderComponent($$result2, "KeyboardManager", $$KeyboardManager, { "data-astro-cid-j7pv25f6": true })} ` })} `;
}, "C:/Users/gasto/OneDrive/Documentos/GitHub/minimalist-portfolio-json/src/pages/index.astro", void 0);

const $$file = "C:/Users/gasto/OneDrive/Documentos/GitHub/minimalist-portfolio-json/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
