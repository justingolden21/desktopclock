<script>
	import { session } from '$app/stores';

	$: dictionary = $session.languageDictionary;
</script>

<p>{dictionary.messages['Coming soon']}</p>

<!-- 
primary display
secondary display

worldclock date format
worldclock time format (default seconds)
worldclock analog theme (default simpler, maybe numerals, higher contrast, maybe just default theme with 12 numerals)
 -->
