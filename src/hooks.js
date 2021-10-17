import defaultTheme from './themes/default';

async function getLanguageDictionary(headers) {
	// const lang = 'es'; // testing
	const lang = headers['accept-language']?.substr?.(0, 2) ?? 'en';
	try {
		return (await import(`./lang/${lang}.json`)).default;
	} catch (error) {
		return (await import(`./lang/en.json`)).default;
	}
}

export async function handle({ request, resolve }) {
	request.locals.languageDictionary = await getLanguageDictionary(request.headers);
	request.locals.settings = {
		colorPalette: 'blueGray',
		accentColorPalette: 'red',
		clock: {
			mode: 'analog',
			theme: defaultTheme,

			displays: {
				primary: 'analog', // analog, time, date, datetime
				secondary: 'date', // time, date, datetime, none
				battery: false
			},

			timeFormat: 'h:mm A',
			timeFormatCustom: 'h:mm A',
			dateFormat: 'ddd, MMMM D',
			dateFormatCustom: 'ddd, MMMM D',

			datetimeLocale: 'en'
		},
		darkMode: null, // default to null so the onmount function in layout checks the preferred color scheme
		doubleclickFullscreen: false,
		showFullscreenButton: true,
		showDarkButton: true,
		showCastButton: false,
		showThemeButtons: false,
		alwaysCollapseMenu: false,
		hideTitlebarWhenIdle: false,
		secondsUntilIdle: 2,
		keyboardShortcuts: true,
		fontFamily: 'Jura'
	};

	return await resolve(request);
}

export function getSession({ locals }) {
	return {
		languageDictionary: locals.languageDictionary,
		settings: locals.settings
	};
}
