<script>
	import { onMount } from 'svelte';

	onMount(() => {
		const loader = document.querySelector('#loader');
		loader.style.visibility = 'visible';
		setTimeout(() => (loader.style.visibility = 'hidden'), 1000);
	});
</script>

<div id="loader" class="z-40 bg-gray-900 w-full h-full fixed">
	<div
		class="absolute inset-1/2 w-16 h-16 rounded-full animate-spin border-8 border-white border-t-transparent" />
</div>
