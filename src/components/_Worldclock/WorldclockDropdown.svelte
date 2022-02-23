<script>
	import { session } from '$app/stores';

	import Icon from '../Icon.svelte';

	let dropdownOpen = false;
</script>

<div class="absolute top-2 right-2 z-10">
	<button
		id="dropdown-btn"
		class="icon-btn ml-auto block"
		on:click={() => (dropdownOpen = !dropdownOpen)}
		aria-label={$session.languageDictionary.labels['Menu']}>
		<Icon name="dots_vertical" class="w-6 h-6" />
	</button>

	<ul
		class="{dropdownOpen ? '' : 'hidden'} w-40 rounded surface mt-2"
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
