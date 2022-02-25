<script>
	import { session } from '$app/stores';

	import { settings } from '../settings.js';

	import Icon from '../Icon.svelte';

	export let idx = -1;

	let dropdownOpen = false;

	// https://stackoverflow.com/a/46351038/4907950
	function moveItem(data, from, to) {
		// remove `from` item and insert into position to
		data.splice(to, 0, data.splice(from, 1)[0]);
	}

	const options = [
		{
			text: 'Edit',
			icon: 'pencil'
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
</script>

<div class="absolute top-2 right-2 z-10">
	<button
		id="dropdown-btn"
		class="icon-btn ml-auto block"
		on:click={() => (dropdownOpen = !dropdownOpen)}
		aria-label={$session.languageDictionary.labels['Menu']}>
		<Icon name="dots_vertical" class="w-6 h-6" />
	</button>
	<ul class="{dropdownOpen ? '' : 'hidden'} rounded surface mt-2" aria-labelledby="dropdown-btn">
		{#each options as option}
			<!-- don't show up if first or down if last -->
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
