<script>
	import { session } from '$app/stores';

	$: dictionary = $session.languageDictionary;
</script>

<!-- Copied from NoTimezones.svelte -->
<img src="img/time_management_undraw.svg" alt="" class="w-72 mx-auto mt-4" />
<p class="my-4">
	{dictionary.stopwatchSettings["You don't have any stopwatches. Try adding a new one."]}
</p>
