<script>
	import { onMount } from 'svelte';

	onMount(() => {
		document.querySelector('#loading-div').style.visibility = 'visible';
		setTimeout(() => (document.querySelector('#loading-div').style.visibility = 'hidden'), 1000);
	});
</script>

<div id="loading-div" class="z-40 bg-gray-900 w-full h-full fixed">
	<div
		class="absolute inset-1/2 w-16 h-16 rounded-full animate-spin border-8 border-white border-t-transparent" />
</div>
