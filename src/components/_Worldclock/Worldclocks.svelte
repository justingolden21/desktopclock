<script>
	import { settings } from '../settings.js';

	import AnalogClock from '../_Clock/AnalogClock.svelte';
	import WorldclockDropdown from './WorldclockDropdown.svelte';

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
</script>

<!-- Home clock -->
<div class="grid grid-cols-2 gap-4 lg:gap-8 mb-4">
	<div class="text-left">
		<p>{$date}</p>
		<p class="font-bold text-5xl my-4">{$time}</p>
		<p>{$timezone && $timezone.split('_').join(' ')} &mdash; <span>UTC {$utcOffset}</span></p>
	</div>
	<div>
		<div class="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 relative ml-auto">
			<AnalogClock mode="worldclock" />
		</div>
	</div>
</div>

<!-- rows -->
{#each $settings.worldclock.timezones as timezone}
	<div class="relative">
		<div class="grid grid-cols-2 gap-4 lg:gap-8 border-0 border-t-2 p-4 surface">
			<div class="text-left">
				<p>{timezone.split('_').join(' ')}</p>
				<p class="font-bold text-3xl">{$getTime(timezone)}</p>
				<p>{$getDate(timezone)}</p>
				<hr class="w-36" />
				<p>
					UTC {$getUtcOffset(timezone)}
					(<span class="font-bold">{$getHourDiff(timezone)}</span>)
				</p>
			</div>
			<div>
				<div class="w-24 h-24 sm:w-32 sm:h-32 relative ml-auto mr-6">
					<AnalogClock mode="worldclock" {timezone} />
				</div>
			</div>
		</div>
		<WorldclockDropdown />
	</div>
{/each}

<!-- grid clocks -->
<div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8 mt-8">
	<!-- small grid -->
	{#each $settings.worldclock.timezones as timezone}
		<div class="text-left border-2 surface p-4 rounded">
			<p>{timezone.split('_').join(' ')}</p>
			<p class="font-bold text-3xl">{$getTime(timezone)}</p>
			<p>{$getDate(timezone)}</p>
			<hr class="w-36" />
			<p>
				UTC {$getUtcOffset(timezone)}
				(<span class="font-bold">{$getHourDiff(timezone)}</span>)
			</p>
			<WorldclockDropdown />
		</div>
	{/each}

	<!-- large grid -->
	{#each $settings.worldclock.timezones as timezone}
		<div class="text-center border-2 surface p-4 rounded">
			<p>{timezone.split('_').join(' ')}</p>
			<p class="font-bold text-3xl">{$getTime(timezone)}</p>
			<div class="w-24 h-24 sm:w-32 sm:h-32 relative mx-auto">
				<AnalogClock mode="worldclock" {timezone} />
			</div>
			<p>{$getDate(timezone)}</p>
			<hr class="w-48 mx-auto" />
			<p>
				UTC {$getUtcOffset(timezone)}
				(<span class="font-bold">{$getHourDiff(timezone)}</span>)
			</p>
			<WorldclockDropdown />
		</div>
	{/each}
</div>

<!-- TODO translate and move to settings -->
<a class="block mt-4" href="https://en.wikipedia.org/wiki/Lists_of_time_zones" target="_blank"
	>Timezones on Wikipedia</a>
