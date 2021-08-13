<script context="module">
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

<div class="m-16 text-center text-gray-900">
	<h2><b>{error.name} {status}</b></h2>
	<p>{error.message}</p>
	<a href="/">Go back to the homepage</a>
</div>
