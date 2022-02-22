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

{#each worldclocks.timezones as timezone}
	<div class="grid grid-cols-2 gap-4 sm:gap-8 border-t-2 border-base-500 py-4">
		<div class="text-left">
			<p>{$getDate(timezone)}</p>
			<p>{$getTime(timezone)}</p>
			<p>{timezone.split('_').join(' ')}</p>
			<p>UTC {$getUtcOffset(timezone)}</p>
			<p>{$getHourDiff(timezone)}</p>
		</div>
		<div>
			<div class="w-32 h-32 relative">
				<AnalogClock mode="worldclock" {timezone} />
			</div>
		</div>
	</div>
{/each}
