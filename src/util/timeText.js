import { derived } from 'svelte/store';
import { settings } from '../components/settings.js';
import { now } from './now.js';

import dayjs from 'dayjs';
// https://day.js.org/docs/en/plugin/timezone
// https://day.js.org/docs/en/timezone/timezone
import utc from 'dayjs/plugin/utc.js';
import tz from 'dayjs/plugin/timezone.js';
dayjs.extend(utc);
dayjs.extend(tz);

// approx 163kb (comment out and compare build sizes in network tab)
import '../data/all_locales.js';

export const time = derived([now, settings], ([$now, $settings]) => {
	const timeFormat =
		$settings.clock.timeFormat !== 'custom'
			? $settings.clock.timeFormat
			: $settings.clock.timeFormatCustom;

	return new dayjs($now)
		.tz($settings.locale.timezone || 'Etc/GMT')
		.locale($settings.locale.datetime || 'en')
		.format(timeFormat || 'h:mm A');
});

export const date = derived([now, settings], ([$now, $settings]) => {
	const dateFormat =
		$settings.clock.dateFormat !== 'custom'
			? $settings.clock.dateFormat
			: $settings.clock.dateFormatCustom;

	return new dayjs($now)
		.tz($settings.locale.timezone || 'Etc/GMT')
		.locale($settings.locale.datetime || 'en')
		.format(dateFormat || 'ddd, MMMM D');
});

export const utcOffset = derived([now, settings], ([$now, $settings]) => {
	return new dayjs($now).tz($settings.locale.timezone || 'Etc/GMT').format('Z');
});

export const timezone = derived(settings, ($settings) => {
	return $settings.locale.timezone.split('_').join(' ');
});

// getters (other timezones)

export const getTime = derived([now, settings], ([$now, $settings]) => {
	return (timezone) => {
		const timeFormat =
			$settings.clock.timeFormat !== 'custom'
				? $settings.clock.timeFormat
				: $settings.clock.timeFormatCustom;
		return new dayjs($now)
			.tz(timezone)
			.locale($settings.locale.datetime || 'en')
			.format(timeFormat || 'h:mm A');
	};
});

export const getDate = derived([now, settings], ([$now, $settings]) => {
	return (timezone) => {
		const dateFormat =
			$settings.clock.dateFormat !== 'custom'
				? $settings.clock.dateFormat
				: $settings.clock.dateFormatCustom;

		return new dayjs($now)
			.tz(timezone)
			.locale($settings.locale.datetime || 'en')
			.format(dateFormat || 'ddd, MMMM D');
	};
});

export const getUtcOffset = derived(now, ($now) => {
	return (timezone) => {
		return new dayjs($now).tz(timezone).format('Z');
	};
});

export const getHourDiff = derived([now, settings], ([$now, $settings]) => {
	return (timezone) => {
		const currentUtcOffset = new dayjs($now).tz($settings.locale.timezone).utcOffset() / 60;
		const tzUtcOffset = new dayjs($now).tz(timezone).utcOffset() / 60;
		const diff = tzUtcOffset - currentUtcOffset;
		return (diff >= 0 ? '+' + diff : diff) + 'h';
	};
});
