import defaultTheme from '../themes/default';
import { localStore } from '../util/localStore';

export const defaultSettings = {
	clock: {
		displays: {
			primary: 'analog', // analog, time, date, datetime
			secondary: 'date', // time, date, datetime, none
			primaryPalette: 'base',
			secondaryPalette: 'base',
			primaryFontSize: 'medium',
			secondaryFontSize: 'medium',
			battery: false
		},
		theme: JSON.parse(JSON.stringify(defaultTheme)),
		secondHandMovement: 'sweeping',

		timeFormat: null, // overridden in _layout onMount to user device's preference
		timeFormatCustom: null, // overridden in _layout onMount to user device's preference
		dateFormat: 'ddd, MMMM D',
		dateFormatCustom: 'ddd, MMMM D',

		datetimeFontWeight: '300'
	},
	worldclock: {
		displays: {
			primary: 'analog_digital',
			secondary: 'rows'
		},
		timezones: [
			{ name: '', zone: 'America/Los_Angeles' },
			{ name: '', zone: 'America/New_York' },
			{ name: '', zone: 'Europe/London' },
			{ name: '', zone: 'Asia/Colombo' },
			{ name: '', zone: 'Asia/Tokyo' }
		],
		theme: JSON.parse(JSON.stringify(defaultTheme)),
		secondHandMovement: 'sweeping',

		timeFormat: null,
		timeFormatCustom: null,
		dateFormat: 'ddd, MMMM D',
		dateFormatCustom: 'ddd, MMMM D',

		timetable: {
			times: ['9:00', '12:00', '15:00', '18:00'],
			ampm: null
		}
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
	fontFamily: 'Bai Jamjuree',
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
