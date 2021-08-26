<script>
	import Icon from '../components/Icon.svelte';

	import { onMount } from 'svelte';
	import { init } from '../js/scripts';

	onMount(() => {
		init();
	});

	let navOpen = false;
</script>

<svelte:head>
	<title>Desktop Clock</title>
</svelte:head>

<div class="flex-1 relative">
	<header>
		<button
			id="menu-btn"
			class="icon-btn float-left md:hidden"
			on:click={() => (navOpen = !navOpen)}
		>
			{#if navOpen}
				<Icon name="close" class="w-6 h-6 md:w-8 md:h-8" />
			{:else}
				<Icon name="menu" class="w-6 h-6 md:w-8 md:h-8" />
			{/if}
			<!-- <Icon name={navOpen ? 'close' : 'menu'} class="w-6 h-6 md:w-8 md:h-8" /> -->
			<!-- <Icon name="menu" name:close={navOpen} name:menu={!navOpen} class="w-6 h-6 md:w-8 md:h-8" /> -->
		</button>

		<button id="main-dark-btn" class="dark-btn icon-btn float-left">
			<Icon name="moon" class="w-6 h-6 md:w-8 md:h-8" />
		</button>

		<h1 id="title-text">Desktop Clock</h1>

		<button id="main-fullscreen-btn" class="fullscreen-btn icon-btn float-right">
			<Icon name="fullscreen" class="w-6 h-6 md:w-8 md:h-8" />
		</button>
	</header>
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
</div>
