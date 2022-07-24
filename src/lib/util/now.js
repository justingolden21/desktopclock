// Exports a vanilla JS date to be used as a universal point of truth
// can be converted to a dayjs object for timezone, locale, etc.

import { writable, get } from 'svelte/store';
import { settings } from '$lib/stores/settings';

// Source of truth
const now = writable(new Date());

// Used in `__layout` to set and update interval based on time format settings
let dateTimeInterval;
function startInterval() {
	if (dateTimeInterval) clearInterval(dateTimeInterval);

	// If the user has a format with milliseconds, update every 50ms, else update every 1000ms
	const interval =
		(get(settings).clock.timeFormat === 'custom' &&
			get(settings).clock.timeFormatCustom.includes('SSS')) ||
		(get(settings).worldclock.timeFormat === 'custom' &&
			get(settings).worldclock.timeFormatCustom.includes('SSS'))
			? 50
			: 1000;

	dateTimeInterval = setInterval(() => now.set(new Date()), interval);
	return dateTimeInterval;
}

export { now, startInterval };
