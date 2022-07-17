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
		let secIntvl, minIntvl, hrIntvl;

		secIntvl = setInterval(() => updateCard('sec'), 1000);

		// update mins every 60s starting in current seconds left
		setTimeout(() => {
			updateCard('min');
			minIntvl = setInterval(() => updateCard('min'), 1000 * 60);
		}, cards.sec.num * 1000);

		// update hours every 60mins starting in current minutes and seconds left
		setTimeout(() => {
			updateCard('hour');
			minIntvl = setInterval(() => updateCard('hour'), 1000 * 60 * 60);
		}, cards.sec.num * 1000 + cards.min.num * 1000 * 60);

		return () => {
			clearInterval(secIntvl);
			clearInterval(minIntvl);
			clearInterval(hrIntvl);
		};
	});

	const cards = {
		hour: { num: 3, flip: false },
		min: { num: 2, flip: false },
		sec: { num: 4, flip: false }
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
