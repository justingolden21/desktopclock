<script>
	import { session } from '$app/stores';

	import Icon from '../Icon.svelte';
	import AnalogClock from '../_Clock/AnalogClock.svelte';

	import {
		time,
		date,
		timezone,
		utcOffset,
		getTime,
		getDate,
		getUtcOffset,
		getHourDiff
	} from '../../util/timeText';

	const worldclocks = {
		timezones: [
			'Asia/Colombo',
			'Asia/Hong_Kong',
			'Europe/London',
			'America/New_York',
			'America/Los_Angeles'
		],
		style: 'rows'
	};
</script>

<!-- Home clock -->
<div class="grid grid-cols-2 gap-4 sm:gap-8">
	<div class="text-left">
		<p>{$timezone}</p>
		<p class="font-bold text-4xl">{$time}</p>
		<p>{$date}</p>
		<p>UTC {$utcOffset}</p>
	</div>
	<div>
		<div class="w-24 h-24 sm:w-32 sm:h-32 relative ml-auto">
			<AnalogClock mode="worldclock" />
		</div>
	</div>
</div>

<!-- Other clocks -->

{#each worldclocks.timezones as timezone}
	<div class="grid grid-cols-2 gap-4 sm:gap-8 border-0 border-t-2 p-4 surface">
		<div class="text-left">
			<p>{timezone.split('_').join(' ')}</p>
			<p class="font-bold text-3xl">{$getTime(timezone)}</p>
			<p>{$getDate(timezone)}</p>
			<hr class="w-36" />
			<p>UTC {$getUtcOffset(timezone)}</p>
			<p class="font-bold">{$getHourDiff(timezone)}</p>
		</div>
		<div>
			<div class="w-24 h-24 sm:w-32 sm:h-32 relative ml-auto">
				<AnalogClock mode="worldclock" {timezone} />
			</div>
			<button
				class="icon-btn absolute top-4 right-4"
				aria-label={$session.languageDictionary.labels['Menu']}>
				<Icon name="dots_vertical" class="w-6 h-6" />
			</button>
		</div>
	</div>
{/each}
