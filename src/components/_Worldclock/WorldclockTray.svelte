<script>
	import Icon from '../Icon.svelte';
</script>

<!-- Similar classes to nav in nav.svelte -->
<nav
	class="
    w-full
    p-2
    fixed
    bottom-0
    z-20
    surface-thin
    border-0
    border-t-2
    dark:bg-base-800
    dark:bg-opacity-75
    h-16">
	<button class="icon-btn px-24" on:click={() => 0} aria-label={''} title={''}>
		<Icon name="plus" class="w-8 h-8" />
	</button>
	<button class="icon-btn px-24" on:click={() => 0} aria-label={''} title={''}>
		<Icon name="plus" class="w-8 h-8" />
	</button>
	<button class="icon-btn px-24" on:click={() => 0} aria-label={''} title={''}>
		<Icon name="plus" class="w-8 h-8" />
	</button>
</nav>
