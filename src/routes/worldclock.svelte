<script>
	import SEO from '$lib/components/SEO.svelte';
	import Worldclocks from '$lib/components/_Worldclock/Worldclocks.svelte';
	import WorldclockTray from '$lib/components/_Worldclock/WorldclockTray.svelte';
</script>

<SEO />

<!-- 4rem is size of worldclock tray, keeps it stuck to bottom -->
<div class="p-16 min-h-[calc(100%-4rem)]">
	<Worldclocks />
</div>
<WorldclockTray />
