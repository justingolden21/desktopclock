<script>
	import { session } from '$app/stores';

	import TailwindColors from 'tailwindcss/colors.js';
</script>

<!-- Remove first 2 items from array (black and white). They do not have themes. -->
<div>
	{#each Object.keys(TailwindColors).slice(2) as color, colorIndex}
		<button
			class="theme-btn {$session.settings.colorPalette == color ? 'active' : ''}"
			style="background-color: {TailwindColors[color][300]}"
			on:click={() => ($session.settings.colorPalette = color)}
		/>
	{/each}
</div>

<style>
	/* purgecss start ignore */
	.theme-btn {
		@apply icon-btn w-6 h-6 m-1;
	}
	.theme-btn.active {
		box-shadow: 4px 0px 0px #64748b; /* gray-500 */
	}
	/* purgecss end ignore */
</style>
