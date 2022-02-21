<script>
	import { session } from '$app/stores';

	$: dictionary = $session.languageDictionary;
</script>

<p>{dictionary.messages['Coming soon']}</p>
