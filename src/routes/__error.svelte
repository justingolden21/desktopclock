<script context="module">
	import { session } from '$app/stores';

	// import '../app.postcss';
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
</script>

<!-- todo: translate 404 message and go home link -->

<svelte:head>
	<title>{$session.languageDictionary.error['Error']}</title>
</svelte:head>

<div class="m-16 text-center">
	{#if status === 404}
		<img src="img/404_undraw.svg" alt="" class="w-96 mx-auto my-8" />
		<h2>{$session.languageDictionary.error['The resource could not be found']}</h2>
	{/if}
	<h2 class="font-bold my-4">{error.name} {status}</h2>
	<p>{error.message}</p>
	<a href="/" class="btn block mt-8 hover:no-underline"
		>{$session.languageDictionary.error['Go back to the homepage']}</a
	>
</div>
