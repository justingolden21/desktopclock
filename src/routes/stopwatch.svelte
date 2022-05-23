<script>
	import { session } from '$app/stores';

	import SEO from '$lib/components/SEO.svelte';
	import Stopwatch from '$lib/components/_Stopwatch/Stopwatch.svelte';
	import { settings } from '$lib/stores/settings';
	import { Icon } from '$lib/components/Icon';

	$: dictionary = $session.languageDictionary;

	const makeNewStopwatch = () => {
		$settings.stopwatch.stopwatches = [
			...$settings.stopwatch.stopwatches,
			{
				times: [],
				laps: []
			}
		];
	};
</script>

<SEO />

<div class="p-4 pt-16 sm:p-16 ">
	{#each $settings.stopwatch.stopwatches as _, idx}
		<Stopwatch {idx} />
	{/each}

	<button
		class="icon-btn rounded-none bg-transparent mx-auto"
		on:click={makeNewStopwatch}
		aria-label={dictionary.labels['New stopwatch']}
		title={dictionary.labels['New stopwatch']}>
		<Icon name="plus" class="inline-block w-8 h-8" />
		<span>{dictionary.labels['New']}</span>
	</button>
</div>
