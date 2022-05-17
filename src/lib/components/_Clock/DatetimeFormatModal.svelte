<script>
	import { session } from '$app/stores';

	import { settings } from '$lib/stores/settings';
</script>

<table>
	<thead>
		<tr>
			{#each $session.languageDictionary.clockSettings.datetimeFormatTableHeadings as item}
				<th>{item}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each $session.languageDictionary.clockSettings.datetimeFormatTable as row}
			<tr>
				{#each row as item}
					<td>{item}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
