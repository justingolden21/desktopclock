<script>
	import { session } from '$app/stores';
	import { keyboardShortcutsList } from './KeyboardShortcuts.svelte';
</script>

<table>
	<thead>
		<tr>
			<th>{$session.languageDictionary.keyboardShortcuts['Key']}</th>
			<th>{$session.languageDictionary.keyboardShortcuts['Action']}</th>
		</tr>
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
