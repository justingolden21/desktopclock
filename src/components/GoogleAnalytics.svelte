<script>
	// https://tute.io/google-analytics-svelte-sapper
	import { page } from '$app/stores';

	$: {
		if (typeof gtag !== 'undefined') {
			gtag('config', 'G-CM722NVXJ9', {
				page_path: $page.path
			});
		}
		if (typeof ga !== 'undefined') {
			const displayMode = window.matchMedia('(display-mode: standalone)').matches
				? 'standalone'
				: 'browser';
			// ga('set', 'dimension1', displayMode);
			gtag('event', 'pwa-install', { dimension1: displayMode });
			// ga('send', 'pageview');
		}
	}
</script>
