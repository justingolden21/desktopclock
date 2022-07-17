import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

// https://kit.svelte.dev/faq#read-package-json
const file = fileURLToPath(new URL('package.json', import.meta.url));
const json = readFileSync(file, 'utf8');
const pkg = JSON.parse(json);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		vite: {
			define: {
				__version__: JSON.stringify(pkg.version)
			}
		}
	},

	preprocess: [
		preprocess({
			defaults: {
				style: 'postcss'
			},
			postcss: true
		})
	]
};

export default config;
