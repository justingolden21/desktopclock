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

const defaultSettings = {
	clock: {
		displays: {
			primary: 'analog', // analog, time, date, datetime
			secondary: 'date', // time, date, datetime, none
			battery: false
		},
		theme: defaultTheme,

		timeFormat: 'h:mm A',
		timeFormatCustom: 'h:mm A',
		dateFormat: 'ddd, MMMM D',
		dateFormatCustom: 'ddd, MMMM D',

		datetimeLocale: 'en',
		datetimeFontWeight: '500'
	},

	// appearance
	colorPalette: 'blueGray',
	darkMode: null, // overridden in _layout onMount to user device's preference
	showDarkButton: true,
	showCastButton: false,
	showFullscreenButton: true,
	showThemeButtons: false,
	smallerMenu: false,
	alwaysCollapseMenu: false,
	hideTitlebarWhenIdle: false,
	secondsUntilIdle: 2,
	fontFamily: 'Jura',

	// general
	doubleclickFullscreen: false,
	keyboardShortcuts: true,
	locale: {
		datetime: 'en',
		language: 'en',
		timezone: null, // overridden in _layout onMount to user device's preference
		automaticDatetime: true,
		automaticLanguage: true,
		automaticTimezone: true
	}
};

export async function handle({ request, resolve }) {
	request.locals.languageDictionary = await getLanguageDictionary(request.headers);
	request.locals.settings = JSON.parse(JSON.stringify(defaultSettings)); // deep copy to save original defaultSettings
	request.locals.defaultSettings = defaultSettings;

	return await resolve(request);
}

export function getSession({ locals }) {
	return {
		languageDictionary: locals.languageDictionary,
		settings: locals.settings,
		defaultSettings: locals.defaultSettings
	};
}
