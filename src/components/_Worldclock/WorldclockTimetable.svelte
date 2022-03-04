<script>
	import { session } from '$app/stores';

	import TimezoneSelect from '../TimezoneSelect.svelte';
	import TimePicker from '../TimePicker.svelte';
	import WorldclockDropdown from './WorldclockDropdown.svelte';
	import { settings } from '../settings.js';

	import {
		time,
		date,
		timezone,
		utcOffset,
		getTime,
		getDate,
		getUtcOffset,
		getHourDiff
	} from '../../util/timeText';
</script>

<!-- TODO: translate diff, name, now, home -->
<table>
	<thead>
		<tr>
			<th>Difference</th>
			<th>Name</th>
			<th>Now</th>
			<th><TimePicker /></th>
			<th><TimePicker /></th>
			<th><TimePicker /></th>
			<th><TimePicker /></th>
		</tr>
	</thead>
	<tbody>
		{#each [{ name: 'Home', zone: $settings.locale.timezone }].concat($settings.worldclock.timezones) as timezone, idx}
			<tr>
				<td>
					{#if idx !== 0}
						{$getHourDiff(timezone.zone)}
					{/if}
				</td>
				<td>
					{#if timezone.name !== ''}
						<p>{timezone.name}</p>
					{:else}
						<p>{timezone.zone.split('_').join(' ')}</p>
					{/if}
					<!-- <TimezoneSelect /> -->
				</td>
				<td class:font-bold={idx === 0}>{$getTime(timezone.zone)}</td>
				<td>1:00</td>
				<td>2:00</td>
				<td>3:00</td>
				<td>4:00</td>
			</tr>

			<WorldclockDropdown {idx} />
		{/each}
	</tbody>
</table>

<style lang="postcss">
	tr {
		@apply border-b-2 border-base-200 dark:border-base-800;
	}
</style>
