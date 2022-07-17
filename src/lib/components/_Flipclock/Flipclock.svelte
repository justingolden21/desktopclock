<script>
	import { onMount } from 'svelte';

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

	onMount(() => {
		const secIntvl = setInterval(() => updateCard(cards.sec), 1000);
		const minIntvl = setInterval(() => updateCard(cards.min), 1000 * 60);
		const hrIntvl = setInterval(() => updateCard(cards.hour), 1000 * 60 * 60);

		return () => {
			clearInterval(secIntvl);
			clearInterval(minIntvl);
			clearInterval(hrIntvl);
		};
	});

	const cards = {
		hour: { num: 33, flip: true },
		min: { num: 22, flip: true },
		sec: { num: 11, flip: true }
	};
</script>

<Flipcard bind:num={cards.hour.num} bind:flip={cards.hour.flip} />
<span class="colon">:</span>
<Flipcard bind:num={cards.min.num} bind:flip={cards.min.flip} />
<span class="colon">:</span>
<Flipcard bind:num={cards.sec.num} bind:flip={cards.sec.flip} />

{cards.sec.num}

<style lang="postcss">
	.colon {
		@apply text-6xl font-bold mx-2 inline-block h-full align-middle;
		margin-top: var(--flipclock-height-negative-times-four);
	}
</style>
