<script>
	import { onMount } from 'svelte';

	onMount(() => {
		document.querySelector('#loading-div').style.visibility = 'visible';
		setTimeout(() => (document.querySelector('#loading-div').style.visibility = 'hidden'), 1000);
	});
</script>

<div id="loading-div">
	<div class="loader" />
</div>

<style lang="postcss">
	.loader {
		@apply absolute inset-1/2 w-16 h-16 rounded-full animate-spin;
		@apply border-8 border-white border-t-transparent;
	}

	#loading-div {
		@apply z-40 bg-gray-900 w-full h-full fixed top-0 left-0 block;
	}
</style>
