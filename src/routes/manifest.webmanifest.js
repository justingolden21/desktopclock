// for readability:
/* eslint-disable dot-notation */

// eslint-disable-next-line import/prefer-default-export
export async function get({ locals }) {
	// https://web.dev/app-shortcuts/
	return {
		status: 200,
		body: {
			name: locals.languageDictionary.appName,
			short_name: locals.languageDictionary.appShortName,
			description: locals.languageDictionary.seo.clock.description,
			categories: ['utilities', 'productivity', 'travel'],
			start_url: '/',
			display: 'standalone',
			background_color: '#FFFFFF',
			theme_color: '#FFFFFF',
			orientation: 'any',
			shortcuts: [
				{
					name: locals.languageDictionary.pageNames['clock'],
					url: '/',
					icons: [{ src: '/img/pages/clock.png', sizes: '192x192' }]
				},
				{
					name: locals.languageDictionary.pageNames['worldclock'],
					url: '/worldclock',
					icons: [{ src: '/img/pages/worldclock.png', sizes: '192x192' }]
				},
				{
					name: locals.languageDictionary.pageNames['stopwatch'],
					url: '/stopwatch',
					icons: [{ src: '/img/pages/stopwatch.png', sizes: '192x192' }]
				}
				// {
				// 	name: locals.languageDictionary.pageNames['timers'],
				// 	url: '/timers',
				// 	icons: [{ src: '/img/pages/timer.png', sizes: '192x192' }]
				// }
			],
			icons: [
				{
					src: 'img/icons/manifest-icon-192.png',
					sizes: '192x192',
					type: 'image/png',
					purpose: 'maskable any'
				},
				{
					src: 'img/icons/manifest-icon-512.png',
					sizes: '512x512',
					type: 'image/png',
					purpose: 'maskable any'
				}
			]
		}
	};
}
