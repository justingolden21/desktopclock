<script context="module">
	import { session } from '$app/stores';
	import { settings } from '../components/settings.js';

	export const load = ({ error, status }) => {
		return {
			props: {
				error,
				status
			}
		};
	};
</script>

<script>
	export let error;
	export let status;

	$: {
		if (typeof gtag !== 'undefined') {
			gtag('event', 'error-page', {
				error_message: error.message,
				status
			});
		}
	}
</script>

<svelte:head>
	<title>{$session.languageDictionary.error['Error']}</title>
</svelte:head>

<div class="m-16 text-center">
	{#if status === 404}
		<img src="img/404_undraw.svg" alt="" class="w-96 mx-auto my-8" />
		<h2>{$session.languageDictionary.error['The resource could not be found']}</h2>
	{/if}
	<h2 class="my-4">{error.name} {status}</h2>

	<!-- show error message only if lang is english (error message is in english) -->
	{#if $settings?.locale?.language?.substring(0, 2) == 'en'}
		<p>{error.message}</p>
	{:else}
		<p>{$session.languageDictionary.error['Error']}</p>
	{/if}

	<a href="/" class="btn block mt-8 hover:no-underline"
		>{$session.languageDictionary.error['Go back to the homepage']}</a>
</div>
