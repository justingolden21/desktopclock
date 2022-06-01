<script>
	import { session } from '$app/stores';

	/// UTILS ///
	import clickOutside from '$lib/util/clickOutside';

	/// COMPONENTS ///
	import { Icon } from '$lib/components/Icon';

	/// STATE ///
	export let idx = -1;
	export let classes;
	// list of objects containing dropdown options: text, icon, func
	export let options;

	let dropdownOpen = false;

	/// EVENT HANDLERS ///
	function onWindowKeyDown(e) {
		if (e.key == 'Escape') {
			dropdownOpen = false;
		}
	}
</script>

<svelte:window on:keydown={onWindowKeyDown} />

<div class="{classes} z-10 hidden group-hover:block">
	<button
		id="dropdown-btn-${idx}"
		class="icon-btn ml-auto block"
		on:click={() => (dropdownOpen = !dropdownOpen)}
		use:clickOutside
		on:click_outside={() => (dropdownOpen = false)}
		aria-label={$session.languageDictionary.labels['Menu']}>
		<Icon name="dots_vertical" class="w-6 h-6" />
	</button>

	<ul
		class="w-max rounded surface mt-2 {!dropdownOpen && 'hidden'}"
		aria-labelledby="dropdown-btn-${idx}">
		{#each options as option}
			<!-- don't show up if first item or down if last item -->
			{#if !option.hidden}
				<!-- {#if !((option.text === 'Up' && idx === 0) || (option.text === 'Down' && idx === $settings.worldclock.timezones.length - 1))} -->
				<li>
					<button
						on:click={() => {
							dropdownOpen = false;
							option.func();
						}}
						class="w-full py-2 px-4 text-sm font-bold text-left hover:bg-base-300 hover:bg-opacity-75 dark:hover:bg-base-600 dark:hover:bg-opacity-75">
						<Icon name={option.icon} class="inline-block w-6 h-6 mr-2" />
						{$session.languageDictionary.labels[option.text]}
					</button>
				</li>
			{/if}
		{/each}
	</ul>
</div>
