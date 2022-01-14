<script>
	import { settings } from './settings.js';

	import TailwindColors from 'tailwindcss/colors.js';

	export let colors;
	export let theme;
</script>

<div class="relative">
	{#each colors as color}
		<button
			class="rounded-full w-6 h-6 m-1 border-2"
			style="background-color: {TailwindColors[color][300]};
            border-color: {$settings[theme] == color ? 'white' : TailwindColors[color][300]}"
			on:click={() => ($settings[theme] = color)} />
	{/each}
</div>
