

<div align="center">
<img src="logo.png" height="90px" width="auto" /> 
<h2>
    <em>Résumé</em> minimalista maquetado para web y pdf
</h2>
<p>
Esquema del JSON de CV de <a href="https://jsonresume.org/schema/">jsonresume.org</a>
</p>


<p>
Basado en el diseño de <a href="https://github.com/BartoszJarocki/cv">Bartosz Jarocki</a>

</p>

</div>

<div align="center">
    <a href="#🚀-empezar">
        Empezar
    </a>
    <span>&nbsp;✦&nbsp;</span>
    <a href="#🧞-comandos">
        Comandos
    </a>
    <span>&nbsp;✦&nbsp;</span>
    <a href="#🔑-licencia">
        Licencia
    </a>
    <span>&nbsp;✦&nbsp;</span>
    <a href="https://midu.dev">
        Personal
    </a>
   
</div>

<p></p>

<div align="center">

![Astro Badge](https://img.shields.io/badge/Astro-BC52EE?logo=astro&logoColor=fff&style=flat)
![GitHub stars](https://img.shields.io/github/stars/midudev/minimalist-portfolio-json)
![GitHub issues](https://img.shields.io/github/issues/midudev/minimalist-portfolio-json)
![GitHub forks](https://img.shields.io/github/forks/midudev/minimalist-portfolio-json)
![GitHub PRs](https://img.shields.io/github/issues-pr/midudev/minimalist-portfolio-json)

</div>

<img src="portada.png"></img>

## 🛠️ Stack

- [**Astro**](https://astro.build/) - El framework web de la nueva época.
- [**Typescript**](https://www.typescriptlang.org/) - JavaScript con sintaxis de tipado.
- [**Ninja Keys**](https://github.com/ssleptsov/ninja-keys) - Menu desplegable con atajos de teclado hecho en puro Javascript.


## 🚀 Empezar

### 1. Usa este [repo](https://github.com/midudev/minimalist-portfolio-json) como _template_ de un proyecto de Astro


- Yo uso [pnpm](https://pnpm.io/installation) como gestor de dependencias y empaquetador.

```bash
# Activa pnpm en MacOS, WSL & Linux:
corepack enable
corepack prepare pnpm@latest --activate

# Inicializa el proyecto
pnpm create astro@latest -- --template midudev/minimalist-portfolio-json
```

### 2. Añade tu contenido:
Edita el archivo `cv.json` para crear tu propio Portafolio/CV imprimible.
### 3. Lanza el servidor de desarrollo:

```bash
# Disfruta del resultado
pnpm dev
```


1. Abre [**http://localhost:4321**](http://localhost:4321/) en tu navegador para ver el resultado 🚀


## 📝 Publicar un caso nuevo (flujo mensual)

Cada caso es un archivo Markdown por idioma. La misma clave (nombre del archivo) une las dos traducciones:

```
src/content/cases/es/<clave>.md   →  /casos/<clave>/
src/content/cases/en/<clave>.md   →  /en/cases/<clave>/
```

1. Crear una rama: `git checkout -b caso/<clave>`.
2. Copiar `docs/caso-plantilla.md` a `src/content/cases/es/<clave>.md` (y su versión en inglés) y completar. Dejar `draft: true`.
3. Revisar que no queden datos internos: namespaces, hosts, IPs, usuarios, nombres de personas o cantidades de vulnerabilidades.
4. `git push` y abrir un Pull Request. Netlify genera un **Deploy Preview** con link propio donde el caso se ve con la etiqueta "Borrador".
5. Si está bien, cambiar a `draft: false` y hacer merge a `main`: se publica en producción, en el sitemap y en el RSS.

> Los borradores (`draft: true`) solo aparecen en local y en los Deploy Previews. En producción (`CONTEXT=production`) nunca se publican.

## 📄 CV dinámico

- `/cv/` y `/en/cv/` arman el CV desde `cv.json` / `cv_english.json`.
- Enfoques por URL: `/cv/?enfoque=devsecops|plataforma|datos` y `/en/cv/?focus=devsecops|platform|data`. Cada bullet de experiencia declara sus enfoques en el campo `focus`.
- `npm run cv:pdf` reconstruye el sitio y regenera `public/cv-gaston-mardones.pdf` y `public/cv-gaston-mardones-en.pdf` con Chrome headless (variable `CHROME` opcional).

## 🧞 Comandos

|     | Comando          | Acción                                        |
| :-- | :--------------- | :-------------------------------------------- |
| ⚙️  | `dev` o `start` | Lanza un servidor de desarrollo local en  `localhost:4321`.  |
| ⚙️  | `build`          | Comprueba posibles errores y hace un empaquetado de producción en `./dist/`.      |
| ⚙️  | `preview`        | Vista previa en local `localhost:4321` |
| 📄  | `cv:pdf`         | Construye el sitio y regenera los PDF del CV desde `/cv/` y `/en/cv/` |



## 🔑 Licencia

[MIT](LICENSE.txt) - Creado por [**midudev**](https://midu.dev).



