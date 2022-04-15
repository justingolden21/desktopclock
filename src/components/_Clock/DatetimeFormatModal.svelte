<script>
	import { session } from '$app/stores';

	import { settings } from '../settings.js';
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
<!-- Note: only exists in en and few other langs -->
{#if $settings?.locale?.language?.substring(0, 2) == 'en'}
	<p>
		{@html $session.languageDictionary.about['madeWithText'].replace(
			'{{Day JS}}',
			'<a rel="noopener" href="https://day.js.org/docs/en/display/format" target="_blank">Day JS</a>'
		)}
	</p>
{/if}
