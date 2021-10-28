<script>
	import { page, session } from '$app/stores';
	import Icon from './Icon.svelte';
	import InstallButton from './InstallButton.svelte';
	import { shareApp } from './Settings.svelte';

	export let navOpen;
	export let settingsModal = null;
</script>

<nav
	class="
        min-h-screen
		bg-gray-100 bg-opacity-40
        p-8
        pt-20
        text-left
        absolute
        left-0
        transition-all
        duration-200
        ease-in-out
        {$session.settings.alwaysCollapseMenu ? '' : 'md:relative md:translate-x-0'}
        {$session.settings.smallerMenu ? 'w-32' : 'w-64'}"
	class:-translate-x-full={!navOpen}
>
	<a
		class:active={$page.path === '/'}
		href="/"
		class="inline-flex {$session.settings.smallerMenu ? '' : 'w-full'}"
	>
		<Icon name="clock" class="w-6 h-6 inline {$session.settings.smallerMenu ? '' : 'mr-2'}" />
		{#if !$session.settings.smallerMenu}
			{$session.languageDictionary.pageNames['clock']}
		{/if}
	</a>
	<a
		class:active={$page.path === '/worldclock'}
		href="/worldclock"
		class="inline-flex {$session.settings.smallerMenu ? '' : 'w-full'}"
	>
		<Icon name="worldclock" class="w-6 h-6 inline {$session.settings.smallerMenu ? '' : 'mr-2'}" />
		{#if !$session.settings.smallerMenu}
			{$session.languageDictionary.pageNames['worldclock']}
		{/if}
	</a>
	<a
		class:active={$page.path === '/stopwatch'}
		href="/stopwatch"
		class="inline-flex {$session.settings.smallerMenu ? '' : 'w-full'}"
	>
		<Icon name="stopwatch" class="w-6 h-6 inline {$session.settings.smallerMenu ? '' : 'mr-2'}" />
		{#if !$session.settings.smallerMenu}
			{$session.languageDictionary.pageNames['stopwatch']}
		{/if}
	</a>
	<a
		class:active={$page.path === '/timers'}
		href="/timers"
		class="inline-flex {$session.settings.smallerMenu ? '' : 'w-full'}"
	>
		<Icon name="timer" class="w-6 h-6 inline {$session.settings.smallerMenu ? '' : 'mr-2'}" />
		{#if !$session.settings.smallerMenu}
			{$session.languageDictionary.pageNames['timers']}
		{/if}
	</a>
	<button
		class="inline-flex {$session.settings.smallerMenu ? '' : 'w-full'}"
		on:click={() => {
			navOpen = false;
			settingsModal.show();
		}}
	>
		<Icon name="settings" class="w-6 h-6 inline {$session.settings.smallerMenu ? '' : 'mr-2'}" />
		{#if !$session.settings.smallerMenu}
			{$session.languageDictionary.labels['Settings']}
		{/if}
	</button>
	<div class="absolute bottom-0 mb-8">
		<InstallButton
			smallButton={$session.settings.smallerMenu}
			class="inline-flex {$session.settings.smallerMenu ? '' : 'w-full'}"
		/>
		<button
			class="share-btn inline-flex {$session.settings.smallerMenu ? '' : 'w-full'}"
			on:click={() => shareApp($session.languageDictionary)}
		>
			<Icon name="share" class="w-6 h-6 inline {$session.settings.smallerMenu ? '' : 'mr-2'}" />
			{#if !$session.settings.smallerMenu}
				{$session.languageDictionary.labels['Share']}
			{/if}
		</button>
	</div>
</nav>
