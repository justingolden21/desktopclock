// http://localhost:3000/robots.txt

import { appURL } from '$lib/data/consts';

// eslint-disable-next-line import/prefer-default-export
export async function get() {
	return {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'text/plain'
		},
		body: `User-agent: *
Disallow:
Sitemap: ${appURL}/sitemap.xml`.trim()
	};
}
