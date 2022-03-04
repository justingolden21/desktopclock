<script>
	import { session } from '$app/stores';
	import { keyboardShortcutsList } from './KeyboardShortcuts.svelte';
</script>

<table>
	<thead>
		<!-- TODO: translate -->
		<tr><th>Key</th><th>Action</th></tr>
	</thead>
	<tbody>
		{#each Object.keys(keyboardShortcutsList) as shortcut}
			{#if shortcut != 'B' || (navigator && navigator.getBattery)}
				<tr>
					<td>{shortcut}</td>
					<td>{$session.languageDictionary.labels[keyboardShortcutsList[shortcut]]}</td>
				</tr>
			{/if}
		{/each}
	</tbody>
</table>
