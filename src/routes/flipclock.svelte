<script>
	import Flipclock from '$lib/components/_Flipclock/Flipclock.svelte';
	import SEO from '$lib/components/SEO.svelte';
</script>

<SEO />

<section>
	<br />
	<Flipclock countdown={{ hour: 0, min: 1, sec: 3 }} />
</section>
