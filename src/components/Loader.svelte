<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let loading = true;

	onMount(() => {
		setTimeout(() => (loading = false), 500);
	});
</script>

{#if loading}
	<div transition:fade={{ duration: 500 }} id="loader" class="z-40 bg-base-900 w-full h-full fixed">
		<div
			class="absolute inset-1/2 w-16 h-16 rounded-full animate-spin border-8 border-white border-t-transparent" />
	</div>
{/if}
