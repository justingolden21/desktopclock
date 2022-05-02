// http://localhost:3000/robots.txt

import { app_url } from '$lib/data/consts';

export async function get() {
	return {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'text/plain'
		},
		body: `User-agent: *
Disallow:
Sitemap: ${app_url}/sitemap.xml`.trim()
	};
}
