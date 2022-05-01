<script>
	import { session } from '$app/stores';
	import { open } from '$lib/util/modal.js';

	/// COMPONENTS ///
	import { Icon } from '$lib/components/Icon';

	/// STATE ///
	$: dictionary = $session.languageDictionary;
</script>

<!-- Similar classes to nav in nav.svelte -->
<nav
	class="
    sticky
    bottom-0
    transition-all
    duration-200
    ease-in-out
    z-10
    surface-thin
    border-0
    border-t-2
    border-base-200
    dark:bg-base-800
    dark:bg-opacity-75
    h-16
    p-2
    grid
    grid-cols-3
    w-full">
	<button
		class="icon-btn rounded-none bg-transparent mx-auto"
		on:click={() => open('worldclock-timetable')}
		aria-label={dictionary.worldclockSettings['Timetable view']}
		title={dictionary.worldclockSettings['Timetable view']}>
		<Icon name="table" class="inline-block w-8 h-8" />
		<span class="hidden lg:inline">{dictionary.worldclockSettings['Timetable']}</span>
	</button>
	<button
		class="icon-btn rounded-none bg-transparent mx-auto"
		on:click={() => open('convert-timezones')}
		aria-label={dictionary.worldclockSettings['Convert timezones']}
		title={dictionary.worldclockSettings['Convert timezones']}>
		<Icon name="switch_horizontal" class="inline-block w-8 h-8" />
		<span class="hidden lg:inline">{dictionary.worldclockSettings['Convert']}</span>
	</button>
	<button
		class="icon-btn rounded-none bg-transparent mx-auto"
		on:click={() => open('new-worldclock')}
		aria-label={dictionary.worldclockSettings['New timezone']}
		title={dictionary.worldclockSettings['New timezone']}>
		<Icon name="plus" class="inline-block w-8 h-8" />
		<span class="hidden lg:inline">{dictionary.labels['New']}</span>
	</button>
</nav>
