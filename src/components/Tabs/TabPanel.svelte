<script>
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';

	import { TABS } from './Tabs.svelte';

	const panel = {};
	const { registerPanel, selectedPanel } = getContext(TABS);

	registerPanel(panel);
</script>

{#if $selectedPanel === panel}
	<!-- consider transition in:slide -->
	<div in:fade>
		<slot />
	</div>
{/if}
