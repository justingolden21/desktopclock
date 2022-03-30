<script>
	import { fade } from 'svelte/transition';

	export let loading = true;
</script>

{#if loading}
	<div
		transition:fade={{ duration: 500 }}
		id="loader"
		class="z-40 bg-base-100 dark:bg-base-900 w-full h-full fixed">
		<div
			class="absolute inset-1/2 w-16 h-16 -ml-8 rounded-full animate-spin border-8 border-base-900 border-t-transparent dark:border-base-100 dark:border-t-transparent" />
	</div>
{/if}
