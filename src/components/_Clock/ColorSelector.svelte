<script>
	import { session } from '$app/stores';
	import { settings } from '../settings.js';
	import Icon from '../Icon.svelte';
	import TailwindColors from 'tailwindcss/colors.js';
	import { lightnesses } from '../../data/consts.js';

	export let colorObj;
	export let label;

	$: dictionary = $session.languageDictionary;

	$: isOpen = false;

	const getColor = (o) =>
		o.lightness === '-1'
			? 'transparent'
			: TailwindColors[$settings[o.palette + 'ColorPalette']][o.lightness];
</script>

<button class="btn inline-flex" on:click={() => (isOpen = !isOpen)}>
	<span
		style="background-color: {getColor(colorObj)}"
		class="w-6 h-6 mr-2 rounded inline border-2 border-base-300" />
	<span>{dictionary.display[label]}</span>
</button>
{#if isOpen}
	<div>
		{#each ['base', 'accent'] as palette}
			{#each lightnesses as lightness}
				<button
					style="background-color: {getColor({ palette: palette, lightness: lightness })}"
					class="w-6 h-6 mr-2 inline border-2 border-base-300 {colorObj.lightness === lightness &&
					colorObj.palette === palette
						? 'rounded-full'
						: 'rounded'}"
					on:click={() => {
						colorObj.lightness = lightness;
						colorObj.palette = palette;
					}} />
			{/each}
			<br />
		{/each}
		<button
			class="icon-btn"
			on:click={() => (colorObj.lightness = '-1')}
			title={dictionary.display['Transparent']}>
			<Icon name="eye_off" class="inline w-6 h-6" />
		</button>
	</div>
{/if}
