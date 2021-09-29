<script>
	import { session } from '$app/stores';

	import TailwindColors from 'tailwindcss/colors.js';
</script>

<!-- Remove first 2 items from array (black and white). They do not have themes. -->
<div>
	{#each Object.keys(TailwindColors).slice(2) as color, colorIndex}
		<button
			class="theme-btn"
			style="background-color: {TailwindColors[color][300]}"
			on:click={() => ($session.settings.colorPalette = color)}
		/>
	{/each}
</div>
