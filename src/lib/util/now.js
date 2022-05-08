// exports a vanilla JS date to be used as a universal point of truth
// can be converted to a dayjs object for timezone, locale, etc.

import { writable, get } from 'svelte/store';
import { settings } from '$lib/stores/settings';

export const now = writable(new Date());

let dateTimeInterval;
export function startInterval() {
	if (dateTimeInterval) clearInterval(dateTimeInterval);

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
