<script>
	import { onMount } from 'svelte';
	import { init } from '../js/scripts';

	onMount(init);
</script>

<svelte:head>
	<title>Desktop Clock</title>
</svelte:head>

<section>
	<div id="primary-display">
		<h1 />
	</div>
	<div id="secondary-display">
		<h2 />
	</div>

	<svg id="clock" viewBox="0 0 64 64">
		<g transform="translate(32,32)">
			<circle id="shadow" cx="2" r="30" />
			<circle id="face" cx="0" r="30" />

			<circle id="sm-ticks" fill="none" />
			<circle id="md-ticks" fill="none" />
			<circle id="lg-ticks" fill="none" />

			<!--Hands-->
			<g transform="rotate(180)">
				<line id="hour-hand" />
				<line id="minute-hand" />
				<line id="second-hand" />
			</g>
			<circle id="pin" />
		</g>
	</svg>
</section>
