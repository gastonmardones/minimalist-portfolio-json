import { defineConfig } from 'astro/config';
import partytown from '@astrojs/partytown'

// Sitio 100% estático: Netlify sirve dist/ (incluye public/_headers)
// https://astro.build/config
export default defineConfig({
	output: 'static',
	site: 'https://gastonmardones.netlify.app/',
	integrations: [
		partytown({
			config: {
			  forward: ["dataLayer.push"],
			},
	  })
	],
});
