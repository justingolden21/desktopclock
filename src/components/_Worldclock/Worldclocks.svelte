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
			<AnalogClock theme={$settings.worldclock.theme} mode="worldclock" />
		</div>
	</div>
</div>

<!-- rows -->
{#each $settings.worldclock.timezones as timezone, idx}
	<div class="relative">
		<div class="grid grid-cols-2 gap-4 lg:gap-8 border-0 border-t-2 p-4 surface">
			<div class="text-left">
				{#if timezone.name !== ''}
					<p>{timezone.name}</p>
				{:else}
					<p>{timezone.zone.split('_').join(' ')}</p>
				{/if}
				<p class="font-bold text-3xl">{$getTime(timezone.zone)}</p>
				<p>{$getDate(timezone.zone)}</p>
				<hr class="w-36" />
				<p>
					UTC {$getUtcOffset(timezone.zone)}
					(<span class="font-bold">{$getHourDiff(timezone.zone)}</span>)
				</p>
			</div>
			<div>
				<div class="w-24 h-24 sm:w-32 sm:h-32 relative ml-auto mr-6">
					<AnalogClock
						theme={$settings.worldclock.theme}
						mode="worldclock"
						timezone={timezone.zone} />
				</div>
			</div>
		</div>
		<WorldclockDropdown {idx} />
	</div>
{/each}

<!-- grid clocks -->
<div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8 mt-8">
	<!-- small grid -->
	{#each $settings.worldclock.timezones as timezone, idx}
		<div class="text-left border-2 surface p-4 rounded">
			{#if timezone.name !== ''}
				<p>{timezone.name}</p>
			{:else}
				<p>{timezone.zone.split('_').join(' ')}</p>
			{/if}
			<p class="font-bold text-3xl">{$getTime(timezone.zone)}</p>
			<p>{$getDate(timezone.zone)}</p>
			<hr class="w-36" />
			<p>
				UTC {$getUtcOffset(timezone.zone)}
				(<span class="font-bold">{$getHourDiff(timezone.zone)}</span>)
			</p>
			<WorldclockDropdown {idx} />
		</div>
	{/each}

	<!-- large grid -->
	{#each $settings.worldclock.timezones as timezone, idx}
		<div class="text-center border-2 surface p-4 rounded">
			{#if timezone.name !== ''}
				<p>{timezone.name}</p>
			{:else}
				<p>{timezone.zone.split('_').join(' ')}</p>
			{/if}
			<p class="font-bold text-3xl">{$getTime(timezone.zone)}</p>
			<div class="w-24 h-24 sm:w-32 sm:h-32 relative mx-auto">
				<AnalogClock
					theme={$settings.worldclock.theme}
					mode="worldclock"
					timezone={timezone.zone} />
			</div>
			<p>{$getDate(timezone.zone)}</p>
			<hr class="w-48 mx-auto" />
			<p>
				UTC {$getUtcOffset(timezone.zone)}
				(<span class="font-bold">{$getHourDiff(timezone.zone)}</span>)
			</p>
			<WorldclockDropdown {idx} />
		</div>
	{/each}
</div>
