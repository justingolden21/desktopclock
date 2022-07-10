import { get } from 'svelte/store';

import defaultNightTheme from '$lib/themes/defaultNight';
// import { fetchLanguage } from '$lib/components/Settings.svelte';
import { settings } from '$lib/stores/settings';

const initializeSettings = async (session) => {
	const s = get(settings);

	// this code doesn't work for some reason. it's instead implemented in __layout.svelte, similar to Settings.svelte
	// if (s.locale.language) {
	// 	session.languageDictionary = await fetchLanguage(s.locale.language);
	// }

	// auto detect user device preferences
	if (s.darkMode === null) {
		s.darkMode = !!window.matchMedia('(prefers-color-scheme: dark)').matches;
		// if darkMode doesn't exist, the user doesn't already have theme settings, it's ok to step on the old theme
		if (s.darkMode) {
			s.clock.theme = JSON.parse(JSON.stringify(defaultNightTheme));
			s.worldclock.theme = JSON.parse(JSON.stringify(defaultNightTheme));
		}
	}
	if (s.locale.timezone === null) {
		s.locale.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'Etc/GMT';
	}

	if (s.locale.language === null) s.locale.language = session.lang ?? 'en';

	if (s.locale.datetime === null)
		s.locale.datetime = Intl.DateTimeFormat().resolvedOptions().locale.substring(0, 2) ?? 'en';

	// https://stackoverflow.com/q/27647918/4907950
	const AMPM =
		Intl.DateTimeFormat(navigator.language, { hour: 'numeric' }).resolvedOptions().hourCycle ===
		'h12';
	if (s.clock.timeFormat === null) {
		s.clock.timeFormat = AMPM ? 'h:mm A' : 'H:mm';
		s.clock.timeFormatCustom = AMPM ? 'h:mm A' : 'H:mm';
	}
	if (s.worldclock.timeFormat === null) {
		s.worldclock.timeFormat = AMPM ? 'h:mm A' : 'H:mm';
		s.worldclock.timeFormatCustom = AMPM ? 'h:mm A' : 'H:mm';
	}
	if (s.worldclock.timetable.ampm === null) {
		s.worldclock.timetable.ampm = AMPM;
	}
	settings.set(s);
};

export default initializeSettings;
