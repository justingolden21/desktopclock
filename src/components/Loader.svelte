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
		@apply absolute inset-1/2 w-16 h-16 rounded-full;

		/* @apply border-white border-t-8; */

		border: 8px solid #fff;
		border-top: 8px solid transparent;

		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	#loading-div {
		/* bg-opacity-75 */
		@apply z-40 bg-gray-900 w-full h-full fixed top-0 left-0 block;
	}
</style>
