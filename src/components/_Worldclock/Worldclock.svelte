<script>
	import { settings } from '../settings.js';

	import dayjs from 'dayjs';

	// https://day.js.org/docs/en/plugin/timezone
	// https://day.js.org/docs/en/timezone/timezone
	import utc from 'dayjs/plugin/utc.js';
	import timezone from 'dayjs/plugin/timezone.js';
	dayjs.extend(utc);
	dayjs.extend(timezone);

	import { now } from '../../util/now.js';

	// approx 163kb (comment out and compare build sizes in network tab)
	import '../../data/all_locales.js';

	import AnalogClock from '../_Clock/AnalogClock.svelte';

	$: localeSettings = $settings.locale;
	$: clockSettings = $settings.clock;

	$: timeFormat =
		clockSettings.timeFormat !== 'custom'
			? clockSettings.timeFormat
			: clockSettings.timeFormatCustom;
	$: dateFormat =
		clockSettings.dateFormat !== 'custom'
			? clockSettings.dateFormat
			: clockSettings.dateFormatCustom;

	// these update automatically with `$now`
	$: time = new dayjs($now)
		.tz(localeSettings.timezone || 'Etc/GMT')
		.locale(localeSettings.datetime || 'en')
		.format(timeFormat || 'h:mm A');
	$: date = new dayjs($now)
		.tz(localeSettings.timezone || 'Etc/GMT')
		.locale(localeSettings.datetime || 'en')
		.format(dateFormat || 'ddd, MMMM D');
	$: utcOffset =
		'UTC ' +
		new dayjs($now)
			.tz(localeSettings.timezone || 'Etc/GMT')
			.locale(localeSettings.datetime || 'en')
			.format('Z');
	$: tz = $settings.locale.timezone.split('_').join(' ');

	// TODO: LOTS of redundant code above (copied from digital displays) should be in its own util file
</script>

<div class="grid grid-cols-2 gap-4 sm:gap-8">
	<div class="text-left">
		<p>{date}</p>
		<p>{time}</p>
		<p>{tz}</p>
		<p>{utcOffset}</p>
	</div>
	<div>
		<div class="w-32 h-32 relative">
			<AnalogClock mode="worldclock" />
		</div>
	</div>
</div>
