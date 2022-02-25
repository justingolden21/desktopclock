<script>
	import { session } from '$app/stores';

	import { settings, defaultSettings } from '../settings.js';
	import Icon from '../Icon.svelte';

	$: dictionary = $session.languageDictionary;
</script>

<p>{dictionary.messages['Coming soon']}</p>

<button
	class="btn undo-btn block mt-4"
	on:click={() => {
		$settings.worldclock.timezones = defaultSettings.worldclock.timezones;
	}}>
	<Icon name="undo" class="inline w-6 h-6" />
	{dictionary.worldclockSettings['Reset timezones']}
</button>

<button
	class="btn trash-btn block mt-4"
	on:click={() => {
		$settings.worldclock.timezones = [];
	}}>
	<Icon name="trash" class="inline w-6 h-6" />
	{dictionary.worldclockSettings['Delete timezones']}
</button>

<button
	class="btn undo-btn block mt-4"
	on:click={() => {
		$settings.worldclock = defaultSettings.worldclock;
	}}>
	<Icon name="undo" class="inline w-6 h-6" />
	{dictionary.worldclockSettings['Reset worldclock settings']}
</button>

<!-- 
primary display
secondary display

worldclock date format
worldclock time format (default seconds)
worldclock analog theme (default simpler, maybe numerals, higher contrast, maybe just default theme with 12 numerals)
 -->
