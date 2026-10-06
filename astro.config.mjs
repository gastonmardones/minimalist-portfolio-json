import { defineConfig } from 'astro/config';

// Sitio 100% estático: Netlify sirve dist/ (incluye public/_headers)
// https://astro.build/config
export default defineConfig({
	output: 'static',
	site: 'https://gastonmardones.dev/',
});
