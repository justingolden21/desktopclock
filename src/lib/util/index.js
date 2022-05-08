import TailwindColors from 'tailwindcss/colors';
import defaultNightTheme from '$lib/themes/defaultNight';
import { fetchLanguage } from '$lib/components/Settings.svelte';
import { settings } from '$lib/stores/settings';
import { get } from 'svelte/store';

// https://stackoverflow.com/a/5624139/4907950
export function hexToRgb(hex) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

export async function initializeSettings(session) {
	const s = get(settings);
	if (s.locale.language) {
		s.languageDictionary = await fetchLanguage(s.locale.language);
	}

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
}

// return the hex color given a string or object with color information from a theme
// lightness is a string (100, 200, 300) that represents the lightness of the color in the tailwind theme
// if falsey or '-1', return 'none' (lack of value or '-1' results in a transparent color)
// palette is 'base' unless otherwise specified, 'accent' is the other valid color palette
export function getColor(obj) {
	const palette = obj.palette == 'accent' ? 'accentColorPalette' : 'baseColorPalette';
	return obj.lightness === '-1' ? 'none' : TailwindColors[get(settings)[palette]][obj.lightness];
}
