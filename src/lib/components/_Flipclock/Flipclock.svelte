<script>
	import Flipcard from './Flipcard.svelte';

	let num = 59;
	let flip = true;

	setInterval(() => {
		if (num === 1) num = 59;
		else num--;
		flip = true;
		setTimeout(() => {
			flip = false;
		}, 750);
	}, 1000);
</script>

<!-- https://codepen.io/shshaw/pen/vKzoLL -->
{#each [...Array(3).keys()] as i}
	<Flipcard {flip} {num} />
	{#if i !== 2}
		<span class="colon">:</span>
	{/if}
{/each}

<style lang="postcss">
	.colon {
		@apply text-6xl font-bold mx-2 inline-block h-full align-middle;
		margin-top: var(--flipclock-height-negative-times-four);
	}
</style>
