import defaultTheme from '../themes/default';
import { localStore } from './localStore.js';

export const defaultSettings = {
	clock: {
		displays: {
			primary: 'analog', // analog, time, date, datetime
			secondary: 'date', // time, date, datetime, none
			battery: false
		},
		theme: defaultTheme,

		timeFormat: null, // overridden in _layout onMount to user device's preference
		timeFormatCustom: null, // overridden in _layout onMount to user device's preference
		dateFormat: 'ddd, MMMM D',
		dateFormatCustom: 'ddd, MMMM D',

		datetimeFontWeight: '300'
	},

	// appearance
	colorPalette: 'blueGray',
	darkMode: null, // overridden in _layout onMount to user device's preference
	showDarkButton: true,
	showPrimaryButton: false,
	showSecondaryButton: false,
	showCastButton: false,
	showFullscreenButton: true,
	showThemeButtons: false,
	smallerMenu: false,
	alwaysCollapseMenu: false,
	hideTitlebarWhenIdle: false,
	secondsUntilIdle: 2,
	fontFamily: 'Comfortaa',

	// general
	doubleclickFullscreen: false,
	keyboardShortcuts: true,
	locale: {
		// null values overridden in _layout onMount to user device's preference
		datetime: null,
		language: null, // TODO: this isn't used for the user's language, `headers['accept-language']` above is used and user is unable to change languages
		timezone: null,
		automaticDatetime: true,
		automaticLanguage: true,
		automaticTimezone: true
	}
};

// deep copy to preserve original defaultSettings
export const settings = localStore('settings', JSON.parse(JSON.stringify(defaultSettings)));
