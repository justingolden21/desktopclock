<svelte:head>
    <title>Desktop Clock</title>
</svelte:head>

	
	<div class="flex-1 relative">
		<header>
			<button id="menu-btn" class="icon-btn float-left md:hidden">
				<svg
					class="w-6 h-6 md:w-8 md:h-8"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="square"
						stroke-linejoin="square"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
			</button>

			<button id="main-dark-btn" class="dark-btn icon-btn float-left">
				<svg
					class="w-6 h-6 md:w-8 md:h-8"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="square"
						stroke-linejoin="square"
						stroke-width="2"
						d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
					/>
				</svg>
			</button>

			<h1 id="title-text">Desktop Clock</h1>

			<button id="main-fullscreen-btn" class="fullscreen-btn icon-btn float-right">
				<svg
					class="w-6 h-6 md:w-8 md:h-8"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="square"
						stroke-linejoin="square"
						stroke-width="2"
						d="m4 8v-4m0 0h4m-4 0m16 4v-4m0 0h-4m4 0m-16 12v4m0 0h4m-4 0m16 0m0 0v-4m0 4h-4"
					/>
				</svg>
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

<script>
import { onMount } from 'svelte';
import {init} from "../js/scripts";

onMount(() => {
    init();
});
</script>
