export async function get({ locals }) {
	return {
		status: 200,
		body: {
			name: locals.languageDictionary.appName,
			short_name: locals.languageDictionary.appShortName,
			description: locals.languageDictionary.appDescription,
			start_url: '/',
			display: 'standalone',
			background_color: '#FFFFFF',
			theme_color: '#FFFFFF',
			orientation: 'portrait-primary',
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
