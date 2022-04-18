<script>
	import { session } from '$app/stores';
	import { settings } from '$lib/stores/settings.js';
	import TailwindColors from 'tailwindcss/colors.js';
	import { lightnesses } from '$lib/data/consts.js';

	/// COMPONENTS ///
	import { Icon } from '$lib/components/icons';

	/// STATE ///
	export let colorObj;
	export let label;

	$: dictionary = $session.languageDictionary;

	$: isOpen = false;

	const getColor = (o) => TailwindColors[$settings[o.palette + 'ColorPalette']][o.lightness];
</script>

<button class="btn inline-flex" on:click={() => (isOpen = !isOpen)}>
	{#if colorObj.lightness === '-1'}
		<Icon name="eye_off" class="inline w-6 h-6 mr-2" />
	{:else}
		<span
			style:background-color={getColor(colorObj)}
			class="w-6 h-6 mr-2 rounded inline border-2 border-base-300" />
	{/if}
	<span>{dictionary.display[label]}</span>
</button>
{#if isOpen}
	<div>
		{#each ['base', 'accent'] as palette}
			{#each lightnesses as lightness}
				<button
					style:background-color={getColor({ palette: palette, lightness: lightness })}
					class="w-6 h-6 mr-2 inline border-2 border-base-300 {colorObj.lightness === lightness &&
					colorObj.palette === palette
						? 'rounded'
						: 'rounded-full'}"
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
