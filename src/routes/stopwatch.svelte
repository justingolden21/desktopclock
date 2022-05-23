<script>
	import SEO from '$lib/components/SEO.svelte';
	import Stopwatch from '$lib/components/_Stopwatch/Stopwatch.svelte';
</script>

<SEO />

<div class="p-4 pt-16 sm:p-16 min-h-full">
	{#each Array(8) as _, i}
		<Stopwatch />
	{/each}
</div>
