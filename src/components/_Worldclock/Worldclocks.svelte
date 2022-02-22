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
			<div class="w-32 h-32 relative">
				<AnalogClock mode="worldclock" {timezone} />
			</div>
		</div>
	</div>
{/each}
