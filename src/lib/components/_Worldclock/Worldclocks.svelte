<script>
	import { settings } from '$lib/stores/settings.js';

	/// COMPONENTS ///
	import AnalogClock from '$lib/components/_Clock/AnalogClock.svelte';
	import WorldclockDropdown from '$lib/components/_Worldclock/WorldclockDropdown.svelte';
	import NoTimezones from '$lib/components/_Worldclock/NoTimezones.svelte';

	/// UTILS ///
	import {
		timezone,
		utcOffset,
		getTime,
		getDate,
		getUtcOffset,
		getHourDiff
	} from '$lib/util/timeText';

	/// STATE ///
	// 'analog_digital', 'digital', or 'none'
	$: primaryDisplay = $settings.worldclock.displays.primary;
	// 'rows', 'analog_grid', or 'digital_grid'
	$: secondaryDisplay = $settings.worldclock.displays.secondary;

	// TODO setting for toggling border
	// TODO setting for toggling background color / transparent
	const hasBorder = true;

	/// METHODS ///
	const getTimezone = (timezone) =>
		timezone.name !== '' ? timezone.name : timezone.zone.split('_').join(' ');
</script>

<!-- primary / home timezone -->
{#if primaryDisplay !== 'none'}
	<div class="grid grid-cols-2 gap-4 lg:gap-8 mb-4">
		<div class="text-left {primaryDisplay !== 'analog_digital' ? 'col-span-2' : ''}">
			<p>{$getDate($settings.locale.timezone || 'Etc/GMT')}</p>
			<p class="font-bold text-5xl my-4">{$getTime($settings.locale.timezone || 'Etc/GMT')}</p>
			<p>{$timezone && $timezone.split('_').join(' ')} &mdash; <span>UTC {$utcOffset}</span></p>
		</div>
		{#if primaryDisplay === 'analog_digital'}
			<div>
				<div class="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 relative ml-auto">
					<AnalogClock theme={$settings.worldclock.theme} mode="worldclock" />
				</div>
			</div>
		{/if}
	</div>
{/if}

<!-- secondary / other timezones -->
{#if secondaryDisplay === 'rows'}
	{#each $settings.worldclock.timezones as timezone, idx}
		<div class="relative group">
			<div
				class="grid grid-cols-2 gap-4 lg:gap-8 border-0 {hasBorder
					? 'border-t-2'
					: 'my-4 sm:my-8'} p-4 surface">
				<div class="text-left break-words">
					<p>{getTimezone(timezone)}</p>
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
			<WorldclockDropdown {idx} classes="absolute top-2 right-2" />
		</div>
	{/each}
{:else}
	<div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8 mt-8">
		{#each $settings.worldclock.timezones as timezone, idx}
			<div
				class="relative group {secondaryDisplay === 'analog_grid'
					? 'text-center'
					: 'text-left'} break-words {!hasBorder && 'border-0'} rounded surface p-4">
				<p>{getTimezone(timezone)}</p>
				<p class="font-bold text-3xl">{$getTime(timezone.zone)}</p>
				{#if secondaryDisplay === 'analog_grid'}
					<div class="w-24 h-24 sm:w-32 sm:h-32 relative mx-auto">
						<AnalogClock
							theme={$settings.worldclock.theme}
							mode="worldclock"
							timezone={timezone.zone} />
					</div>
				{/if}
				<p>{$getDate(timezone.zone)}</p>
				<hr class="w-36 {secondaryDisplay === 'analog_grid' ? 'mx-auto' : ''}" />
				<p>
					UTC {$getUtcOffset(timezone.zone)}
					(<span class="font-bold">{$getHourDiff(timezone.zone)}</span>)
				</p>
				<WorldclockDropdown {idx} classes="absolute top-2 right-2" />
			</div>
		{/each}
	</div>
{/if}

{#if $settings.worldclock.timezones.length === 0}
	<NoTimezones />
{/if}
