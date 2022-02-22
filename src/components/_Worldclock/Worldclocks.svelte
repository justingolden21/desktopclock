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
			'America/Los_Angeles',
			'America/New_York',
			'Europe/London',
			'Asia/Colombo',
			'Asia/Tokyo'
		],
		style: 'rows'
	};

	let dropdownOpen = true;
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

<!-- Other clocks -->

{#each worldclocks.timezones as timezone}
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
		<div class="absolute top-2 right-2 z-10">
			<button
				id="dropdown-btn"
				class="icon-btn"
				on:click={() => (dropdownOpen = !dropdownOpen)}
				aria-label={$session.languageDictionary.labels['Menu']}>
				<Icon name="dots_vertical" class="w-6 h-6" />
			</button>
			<!-- dropdown menu -->
			<ul
				class="{dropdownOpen ? '' : 'hidden'} w-40 rounded shadow surface mt-2"
				aria-labelledby="dropdown-btn">
				<!-- TODO translate -->
				{#each 'Edit Up Down Delete'.split(' ') as txt}
					<li>
						<!-- svelte-ignore a11y-invalid-attribute -->
						<a
							href=""
							on:click={() => (dropdownOpen = false)}
							class="block cursor-pointer py-2 px-4 text-sm font-bold text-left hover:bg-base-300 hover:bg-opacity-75 dark:hover:bg-base-600 dark:hover:bg-opacity-75">
							<Icon name="close" class="inline-block w-6 h-6" />
							{txt}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
{/each}

<!-- grid clocks -->
<div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8 mt-8">
	{#each worldclocks.timezones as timezone}
		<div class="text-left border-2 surface p-4 rounded">
			<p>{timezone.split('_').join(' ')}</p>
			<p class="font-bold text-3xl">{$getTime(timezone)}</p>
			<p>{$getDate(timezone)}</p>
			<hr class="w-36" />
			<p>
				UTC {$getUtcOffset(timezone)}
				(<span class="font-bold">{$getHourDiff(timezone)}</span>)
			</p>
			<button
				class="icon-btn absolute top-2 right-2"
				aria-label={$session.languageDictionary.labels['Menu']}>
				<Icon name="dots_vertical" class="w-6 h-6" />
			</button>
		</div>
	{/each}

	{#each worldclocks.timezones as timezone}
		<div class="text-center border-2 surface p-4 rounded">
			<p>{timezone.split('_').join(' ')}</p>
			<p class="font-bold text-3xl">{$getTime(timezone)}</p>
			<div class="w-24 h-24 sm:w-32 sm:h-32 relative mx-auto">
				<AnalogClock mode="worldclock" {timezone} />
			</div>
			<p>{$getDate(timezone)}</p>
			<hr class="w-36" />
			<p>
				UTC {$getUtcOffset(timezone)}
				(<span class="font-bold">{$getHourDiff(timezone)}</span>)
			</p>
			<button
				class="icon-btn absolute top-2 right-2"
				aria-label={$session.languageDictionary.labels['Menu']}>
				<Icon name="dots_vertical" class="w-6 h-6" />
			</button>
		</div>
	{/each}
</div>

<!-- TODO translate and move to settings -->
<a class="block mt-4" href="https://en.wikipedia.org/wiki/Lists_of_time_zones" target="_blank"
	>Timezones on Wikipedia</a>
