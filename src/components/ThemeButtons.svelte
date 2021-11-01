<script>
	import { settings } from './localStore.js';

	import TailwindColors from 'tailwindcss/colors.js';
</script>

<!-- Remove first 2 items from array (black and white). They do not have themes. -->
<div>
	{#each Object.keys(TailwindColors).slice(2) as color, idx}
		<button
			class="theme-btn {$settings.colorPalette == color ? 'active' : ''}"
			style="background-color: {TailwindColors[color][300]}"
			on:click={() => ($settings.colorPalette = color)}
		/>
	{/each}
</div>

<style lang="postcss">
	.theme-btn {
		@apply p-2 rounded-full hover:bg-gray-700 hover:text-white w-6 h-6 m-1; /* fix since it cannot find 'icon-btn' class in prod */
		/* @apply icon-btn w-6 h-6 m-1; */
	}
	.theme-btn.active {
		box-shadow: 4px 0px 0px #64748b; /* gray-500 */
	}
</style>
