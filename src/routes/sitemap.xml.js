// https://www.sitemaps.org/protocol.html

// http://localhost:3000/sitemap.xml

import { app_url } from '$lib/data/consts';

const encodeXML = (str) =>
	str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');

const pages = [
	{
		url: '',
		priority: 0.8
	},
	{
		url: 'worldclock'
	}
];

export async function get() {
	return {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'application/xml'
		},
		body: `<?xml version="1.0" encoding="UTF-8" ?>
	<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
		${pages
			.map(
				(page) =>
					`<url>
			<loc>${app_url}/${page.url}</loc>
			<changefreq>monthly</changefreq>
			<priority>${page.priority ?? 0.5}</priority>
		  </url>`
			)
			.join('')}
	</urlset>`.trim()
	};
}
