<script>
	import { page } from '$app/stores';
	import Icon from './Icon.svelte';
	import InstallButton from './InstallButton.svelte';

	export let navOpen;
	export let settingsModal = null;
	export let aboutModal = null;
</script>

<nav
	class="
        min-h-screen
        bg-gray-50 bg-opacity-75
        w-64
        p-8
        pt-20
        text-left
        absolute
        left-0
        transform
        transition-all
        duration-200
        ease-in-out
        md:relative md:translate-x-0"
	class:-translate-x-full={!navOpen}
>
	<a class:active={$page.path === '/'} href="/">
		<Icon name="clock" class="w-6 h-6 inline mr-2" />
		Clock
	</a>
	<a class:active={$page.path === '/worldclock'} href="/worldclock">
		<Icon name="worldclock" class="w-6 h-6 inline mr-2" />
		Worldclock
	</a>
	<a href="/">
		<Icon name="stopwatch" class="w-6 h-6 inline mr-2" />
		Stopwatch
	</a>
	<a href="/">
		<Icon name="timer" class="w-6 h-6 inline mr-2" />
		Timers
	</a>
	<span
		tabindex="0"
		on:click={() => {
			navOpen = false;
			settingsModal.show();
		}}
	>
		<Icon name="settings" class="w-6 h-6 inline mr-2" />
		Settings
	</span>
	<span
		tabindex="0"
		on:click={() => {
			navOpen = false;
			aboutModal.show();
		}}
	>
		<Icon name="info" class="w-6 h-6 inline mr-2" />
		About
	</span>
	<div class="absolute bottom-0 mb-8">
		<InstallButton />
	</div>
</nav>
