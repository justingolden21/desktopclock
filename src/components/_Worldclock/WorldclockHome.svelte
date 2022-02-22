<script>
	import { time, date, timezone, utcOffset } from '../../util/timeText';
	import AnalogClock from '../_Clock/AnalogClock.svelte';
</script>

<div class="grid grid-cols-2 gap-4 sm:gap-8">
	<div class="text-left">
		<p>{$timezone}</p>
		<p class="font-bold text-4xl">{$time}</p>
		<p>{$date}</p>
		<p>UTC {$utcOffset}</p>
	</div>
	<div>
		<div class="w-32 h-32 relative">
			<AnalogClock mode="worldclock" />
		</div>
	</div>
</div>
