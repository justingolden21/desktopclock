import { writable } from 'svelte/store';

import defaultTheme from '../themes/default';

export const defaultSettings = {
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

		datetimeFontWeight: '300'
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

function localStore(key, default_value) {
	let store = writable(default_value);

	if (typeof localStorage !== 'undefined') {
		const value = localStorage.getItem(key);
		if (value !== null) store.set(JSON.parse(value));

		store.subscribe((value) => {
			localStorage.setItem(key, JSON.stringify(value));
		});
	}

	return store;
}

// deep copy to preserve original defaultSettings
export const settings = localStore('settings', defaultSettings);
