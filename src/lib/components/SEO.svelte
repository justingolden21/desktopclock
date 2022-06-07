<script>
	import { page, session } from '$app/stores';

	import { appURL } from '$lib/data/consts';

	$: dictionary = $session.languageDictionary;
	const pageNameMapper = {
		'/': 'clock',
		'/worldclock': 'worldclock',
		'/stopwatch': 'stopwatch',
		'/timers': 'timers',
		'/flipclock': 'flipclock'
	};
	const pageName = pageNameMapper[$page.url.pathname];
	$: seo = dictionary.seo[pageName];
</script>

<!-- custom SEO based off of pathname -->
<svelte:head>
	<title>{seo.name}</title>

	<meta name="title" content={seo.name} />
	<meta name="description" content={seo.description} />
	<meta name="keywords" content={seo.keywords} />
	<meta name="robots" content="index" />
	<meta name="googlebot" content="index" />

	<meta property="og:image:height" content="720" />
	<meta property="og:image:width" content="720" />
	<meta property="og:description" content={seo.description} />
	<meta property="og:title" content={seo.name} />
	<meta property="og:url" content={appURL + $page.url.pathname} />
	<meta property="og:image" content={appURL + '/img/' + seo.screenshot} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={seo.name} />

	<meta name="twitter:title" content={seo.name} />
	<meta name="twitter:description" content={seo.description} />
	<meta name="twitter:image" content={appURL + '/img/' + seo.screenshot} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={appURL + $page.url.pathname} />

	<link rel="canonical" href={appURL + $page.url.pathname} />
</svelte:head>
