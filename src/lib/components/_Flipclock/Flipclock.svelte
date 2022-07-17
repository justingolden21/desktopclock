<script>
	import Flipcard from './Flipcard.svelte';


	const updateCard = (card) => {
		console.log(card);
		if (card.num === 0) card.num = 59;
		else card.num--;
		card.flip = true;
		setTimeout(() => {
			card.flip = false;
		}, 750);
	};

	setInterval(() => updateCard(cards.sec), 1000);
	setInterval(() => updateCard(cards.min), 1000 * 60);
	setInterval(() => updateCard(cards.hour), 1000 * 60 * 60);

	const cards = {
		hour: { num: 33, flip: true },
		min: { num: 22, flip: true },
		sec: { num: 11, flip: true }
	};
</script>

<!-- https://codepen.io/shshaw/pen/vKzoLL -->
{#each [cards.hour, cards.min, cards.sec] as { num, flip }, idx}
	<Flipcard {flip} {num} />
	{#if idx !== 2}
		<span class="colon">:</span>
	{/if}
{/each}

<style lang="postcss">
	.colon {
		@apply text-6xl font-bold mx-2 inline-block h-full align-middle;
		margin-top: var(--flipclock-height-negative-times-four);
	}
</style>
