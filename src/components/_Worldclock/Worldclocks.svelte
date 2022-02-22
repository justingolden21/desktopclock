<script>
	import { getTime, getDate, getUtcOffset, getHourDiff } from '../../util/timeText';
	import AnalogClock from '../_Clock/AnalogClock.svelte';

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

<div class="grid grid-cols-2 gap-4 sm:gap-8">
	{#each worldclocks.timezones as timezone}
		<div class="text-left border-y-2 border-base-500">
			<p>{$getDate(timezone)}</p>
			<p>{$getTime(timezone)}</p>
			<p>{timezone.split('_').join(' ')}</p>
			<p>UTC {$getUtcOffset(timezone)}</p>
			<p>{$getHourDiff(timezone)}</p>
		</div>
		<div class="border-y-2 border-base-500">
			<div class="w-32 h-32 relative">
				<AnalogClock mode="worldclock" {timezone} />
			</div>
		</div>
	{/each}
</div>
