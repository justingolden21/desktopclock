<script context="module">
	import { session } from '$app/stores';
	import { settings } from '$lib/stores/settings';

	export const load = ({ error, status }) => ({
		props: {
			error,
			status
		}
	});
</script>

<script>
	export let error, status;

	$: if (typeof gtag !== 'undefined') {
		gtag('event', 'error-page', {
			error_message: error.message,
			status
		});
	}

	$: dictionary = $session.languageDictionary;
</script>

<svelte:head>
	<title>{dictionary.error['Error'] + (status === 404 ? ' 404' : '')}</title>
</svelte:head>

<div class="m-16 text-center">
	{#if status === 404}
		<img src="img/404_undraw.svg" alt="" class="w-96 mx-auto my-8" />
		<h2>{dictionary.error['The resource could not be found']}</h2>
	{/if}
	<h2 class="my-4">{error.name} {status}</h2>

	<!-- show error message (which is English) only if language is English -->
	{#if $settings?.locale?.language?.substring(0, 2) == 'en'}
		<p>{error.message}</p>
	{:else}
		<p>{dictionary.error['Error']}</p>
	{/if}

	<a href="/" class="btn block mt-8 hover:no-underline">
		{dictionary.error['Go back to the homepage']}
	</a>
</div>
