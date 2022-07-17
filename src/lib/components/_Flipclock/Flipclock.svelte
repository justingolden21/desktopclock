<script>
	import { onMount } from 'svelte';

	import Flipcard from './Flipcard.svelte';


	const updateCard = (name) => {
		if (cards[name].num === 0) cards[name].num = 59;
		else cards[name].num--;
		cards[name].flip = true;
		setTimeout(() => {
			cards[name].flip = false;
		}, 750);
	};

	onMount(() => {
		const secIntvl = setInterval(() => updateCard('sec'), 1000);
		const minIntvl = setInterval(() => updateCard('min'), 1000 * 60);
		const hrIntvl = setInterval(() => updateCard('hour'), 1000 * 60 * 60);

		return () => {
			clearInterval(secIntvl);
			clearInterval(minIntvl);
			clearInterval(hrIntvl);
		};
	});

	const cards = {
		hour: { num: 33, flip: false },
		min: { num: 22, flip: false },
		sec: { num: 11, flip: false }
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
