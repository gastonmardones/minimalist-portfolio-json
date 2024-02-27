import { defineConfig } from 'astro/config';
import partytown from '@astrojs/partytown'
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter: netlify(),
	site: 'https://gastonmardones.netlify.app/',
	integrations: [
		partytown({
			config: {
			  forward: ["dataLayer.push"],
			},
	  })
	],
});
