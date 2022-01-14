<script>
	import { settings } from './settings.js';

	import TailwindColors from 'tailwindcss/colors.js';

	export let colors;
	export let theme;
</script>

<div class="relative">
	{#each colors as color}
		<button
			class="theme-btn"
			style="background-color: {TailwindColors[color][300]};
            border-color: {$settings[theme] == color ? 'white' : TailwindColors[color][300]}"
			on:click={() => ($settings[theme] = color)} />
	{/each}
</div>

<style lang="postcss">
	.theme-btn {
		@apply p-2 rounded-full hover:bg-gray-700 hover:text-white w-6 h-6 m-1 border-2; /* fix since it cannot find 'icon-btn' class in prod */
		/* @apply icon-btn w-6 h-6 m-1; */
	}
</style>
