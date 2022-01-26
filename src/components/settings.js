import defaultTheme from '../themes/default';
import { localStore } from '../util/localStore';

export const defaultSettings = {
	clock: {
		displays: {
			primary: 'analog', // analog, time, date, datetime
			secondary: 'date', // time, date, datetime, none
			primaryPalette: 'base',
			secondaryPalette: 'base',
			battery: false
		},
		theme: JSON.parse(JSON.stringify(defaultTheme)),

		timeFormat: null, // overridden in _layout onMount to user device's preference
		timeFormatCustom: null, // overridden in _layout onMount to user device's preference
		dateFormat: 'ddd, MMMM D',
		dateFormatCustom: 'ddd, MMMM D',

		datetimeFontWeight: '300'
	},

	// appearance
	baseColorPalette: 'slate',
	accentColorPalette: 'red',
	darkMode: null, // overridden in _layout onMount to user device's preference
	showDarkButton: true,
	showPrimaryButton: true,
	showSecondaryButton: false,
	showCastButton: false,
	showFullscreenButton: true,
	smallerMenu: false,
	alwaysCollapseMenu: false,
	hideTitlebarWhenIdle: false,
	secondsUntilIdle: 2,
	fontFamily: 'Comfortaa',
	fontFamilyBody: 'Bitter',

	// general
	doubleclickFullscreen: false,
	keyboardShortcuts: true,
	locale: {
		// null values overridden in _layout onMount to user device's preference
		datetime: null,
		language: null,
		timezone: null,
		automaticDatetime: true,
		automaticLanguage: true,
		automaticTimezone: true
	}
};

// deep copy to preserve original defaultSettings
export const settings = localStore('settings', JSON.parse(JSON.stringify(defaultSettings)));
