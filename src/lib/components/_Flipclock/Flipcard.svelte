<script>
	export let flip, num;

	$: displayNext = (num !== 0 ? num - 1 : 59).toString().padStart(2, '0');
	$: displayNum = num.toString().padStart(2, '0');
</script>

<!-- https://codepen.io/shshaw/pen/vKzoLL -->

<span class="card {flip ? 'flip' : ''}">
	<span class="card__top">{displayNext}</span>
	<span class="card__bottom" data-value={displayNum} />
	<span class="card__back" data-value={displayNum}>
		<span class="card__bottom" data-value={displayNext} />
	</span>
</span>

<style lang="postcss">
	:root {
		/* magic numbers, don't know why they work */
		--flipclock-height: 0.72em;
		--flipclock-height-negative: -0.72em;
		--flipclock-height-negative-times-four: -2.88em;
	}

	/* Card */

	.card {
		@apply inline-block relative leading-none;
		padding-bottom: var(--flipclock-height);
		font-size: 9vw;
	}
	.card * {
		@apply font-bold select-none;
	}

	/* Card Parts */

	.card__top,
	.card__bottom,
	.card__back::before,
	.card__back::after {
		@apply text-base-100 bg-base-800 rounded-t-lg block;
		height: var(--flipclock-height);
		padding: 0.25em 0.25em;
		transform: translateZ(0);
	}

	.card__bottom {
		@apply text-base-50 bg-base-700 border-t-base-900 border-t rounded-t-none rounded-b-lg overflow-hidden;
	}

	.card__bottom::after {
		display: block;
		margin-top: var(--flipclock-height-negative);
	}

	.card__back::before,
	.card__bottom::after {
		content: attr(data-value);
	}

	.card__back {
		@apply absolute top-0 h-full left-0;
	}

	.card__back::before {
		@apply relative overflow-hidden;
		z-index: -1;
	}

	/* Animation */

	.flip .card__back::before {
		animation: flipTop 1s ease-in-out infinite;
		animation-fill-mode: both;
		transform-origin: center bottom;
	}

	.flip .card__back .card__bottom {
		transform-origin: center top;
		animation-fill-mode: both;
		animation: flipBottom 1s ease-in-out infinite;
	}

	@keyframes flipTop {
		0% {
			transform: rotateX(0deg);
			z-index: 2;
		}
		99% {
			opacity: 1;
		}
		100% {
			transform: rotateX(-90deg);
			opacity: 0;
		}
	}

	@keyframes flipBottom {
		0%,
		50% {
			z-index: -1;
			transform: rotateX(90deg);
			opacity: 0;
		}
		51% {
			opacity: 1;
		}
		100% {
			transform: rotateX(0deg);
			z-index: 5;
		}
	}
</style>
