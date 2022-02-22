<script>
	import { time, date, tz, utcOffset } from '../_Clock/TimeText.svelte';
	import AnalogClock from '../_Clock/AnalogClock.svelte';
</script>

<div class="grid grid-cols-2 gap-4 sm:gap-8">
	<div class="text-left">
		<p>{$date}</p>
		<p>{$time}</p>
		<p>{$tz}</p>
		<p>{$utcOffset}</p>
	</div>
	<div>
		<div class="w-32 h-32 relative">
			<AnalogClock mode="worldclock" />
		</div>
	</div>
</div>
