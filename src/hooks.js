import defaultTheme from './themes/default'

async function getLanguageDictionary(headers)
{
	// const lang = 'es'; // testing
	const lang = headers['accept-language']?.substr?.(0, 2) ?? 'en';
	try
	{
		return ( await import(`./lang/${lang}.json` ) ).default;
	}
	catch( error )
	{
	   return ( await import(`./lang/en.json` ) ).default;
	}
}

export async function handle({ request, resolve })
{
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
				battery: false,
			},

			// https://tc39.es/ecma402/#table-datetimeformat-components
			dateSettings: {
				weekday: 'short',
				// year: 'numeric',
				month: 'long',
				day: 'numeric'
			},
			timeSettings: {
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric'
				// fractionalSecondDigits: '1',
			},
			dateTimeSettings: {},

		},
		darkMode: null, // default to null so the initial check to toggle dark mode doesn't occur
		doubleclickFullscreen: false,
		showFullscreenButton: true,
		showDarkButton: true,
		showThemeButtons: false,
	};

	return await resolve(request);
}

export function getSession({ locals })
{
	return {
		languageDictionary: locals.languageDictionary,
		settings: locals.settings
	}
}