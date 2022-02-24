<script>
	import { session } from '$app/stores';

	import { settings } from '../settings.js';

	import Icon from '../Icon.svelte';

	export let idx = -1;

	let dropdownOpen = false;

	const options = [
		{
			text: 'Edit',
			icon: 'pencil'
		},
		{
			text: 'Up',
			icon: 'chevron_up'
		},
		{
			text: 'Down',
			icon: 'chevron_down'
		},
		{
			text: 'Delete',
			icon: 'trash',
			func: () => {
				console.log(idx);
				console.log($settings.worldclock.timezones);
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
			<li>
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a
					href=""
					on:click={() => {
						dropdownOpen = false;
						option.func();
					}}
					class="block cursor-pointer hover:no-underline py-2 px-4 text-sm font-bold text-left hover:bg-base-300 hover:bg-opacity-75 dark:hover:bg-base-600 dark:hover:bg-opacity-75">
					<Icon name={option.icon} class="inline-block w-6 h-6 mr-2" />
					{$session.languageDictionary.labels[option.text]}
				</a>
			</li>
		{/each}
	</ul>
</div>
