<script>
	import { session } from '$app/stores';

	/// UTILS ///
	import { clickOutside } from '$lib/util/clickOutside.js';
	import { open } from '$lib/util/modal.js';
	import { settings } from '$lib/stores/settings.js';

	/// COMPONENTS ///
	import { Icon } from '$lib/components/Icon';

	/// STATE ///
	export let idx = -1;
	export let classes;
	let dropdownOpen = false;

	const options = [
		{
			text: 'Edit',
			icon: 'pencil',
			func: () => open('edit-worldclock', { editIndex: idx })
		},
		{
			text: 'Up',
			icon: 'chevron_up',
			func: () => {
				moveItem($settings.worldclock.timezones, idx, idx - 1);
			}
		},
		{
			text: 'Down',
			icon: 'chevron_down',
			func: () => {
				moveItem($settings.worldclock.timezones, idx, idx + 1);
			}
		},
		{
			text: 'Delete',
			icon: 'trash',
			func: () => {
				$settings.worldclock.timezones = $settings.worldclock.timezones.filter((_, i) => i !== idx);
			}
		}
	];

	/// METHODS ///
	// https://stackoverflow.com/a/46351038/4907950
	function moveItem(data, from, to) {
		// remove `from` item and insert into position to
		data.splice(to, 0, data.splice(from, 1)[0]);
	}

	/// EVENT HANDLERS ///
	function onWindowKeyDown(e) {
		if (e.key == 'Escape') {
			dropdownOpen = false;
		}
	}

	function toggleMenu() {
		dropdownOpen = !dropdownOpen;
	}
</script>

<svelte:window on:keydown={onWindowKeyDown} />

<div class="{classes} z-10 hidden group-hover:block">
	<button
		id="dropdown-btn"
		class="icon-btn ml-auto block"
		on:click={toggleMenu}
		use:clickOutside
		on:click_outside={() => (dropdownOpen = false)}
		aria-label={$session.languageDictionary.labels['Menu']}>
		<Icon name="dots_vertical" class="w-6 h-6" />
	</button>

	<ul class="w-max rounded surface mt-2 {!dropdownOpen && 'hidden'}" aria-labelledby="dropdown-btn">
		{#each options as option}
			<!-- don't show up if first item or down if last item -->
			{#if !((option.text === 'Up' && idx === 0) || (option.text === 'Down' && idx === $settings.worldclock.timezones.length - 1))}
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
