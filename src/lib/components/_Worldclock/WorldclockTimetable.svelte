<script>
	// Data used: $settings.worldclock.timetable.ampm and $settings.worldclock.timetable.times

	import { session } from '$app/stores';

	import { settings } from '$lib/stores/settings.js';
	import { getTime, getHourDiff } from '$lib/util/timeText';

	/// COMPONENTS ///
	import SimpleTimePicker from '$lib/components/SimpleTimePicker.svelte';
	import Toggle from '$lib/components/base/Toggle.svelte';
	import Icon from '$lib/icons/Icon.svelte';
	import WorldclockDropdown from '$lib/components/_Worldclock/WorldclockDropdown.svelte';
	import { getDiff, getSum } from '$lib/util/min';

	/// STATE ///
	$: dictionary = $session.languageDictionary;

	/// METHODS ///
	function resetTimetableSettings() {
		$settings.worldclock.timetable.times = ['9:00', '12:00', '15:00', '18:00'];
		$settings.worldclock.timetable.ampm =
			Intl.DateTimeFormat(navigator.language, { hour: 'numeric' }).resolvedOptions().hourCycle ===
			'h12';
	}
</script>

<!-- TODO: note that this doesn't account for daylight savings changes -->
<!-- TODO: z index of bottommost dropdown is under toggle. for now using <br> lol -->
<table>
	<thead>
		<tr>
			<th />
			<th>{dictionary.labels['Difference']}</th>
			<th>{dictionary.labels['Name']}</th>
			<th>{dictionary.labels['Now']}</th>
			{#each $settings.worldclock.timetable.times as time}
				<th>
					<SimpleTimePicker
						ampm={$settings.worldclock.timetable.ampm}
						bind:value={time}
						classes={'mx-0 my-4'} />
				</th>
			{/each}
		</tr>
	</thead>
	<tbody class="group">
		{#each [{ name: dictionary.labels['Home'], zone: $settings.locale.timezone }].concat($settings.worldclock.timezones) as timezone, idx}
			<tr>
				<td>
					{#if idx !== 0}
						<div class="w-12 h-12">
							<WorldclockDropdown idx={idx - 1} />
						</div>
					{/if}
				</td>
				<td>
					{#if idx !== 0}
						{$getHourDiff(timezone.zone)}
					{/if}
				</td>
				<td>
					<p>{timezone.name || timezone.zone.split('_').join(' ')}</p>
				</td>
				<td class:font-bold={idx === 0}>{$getTime(timezone.zone)}</td>
				{#each $settings.worldclock.timetable.times as time}
					<!-- timetext
					get diff between time selector and current time
					then add diff to timezone time -->
					<td>
						{getSum(time, getDiff($getTime(timezone.zone), $getTime($settings.locale.timezone)))}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<br />
<br />
<button class="btn undo-btn" on:click={resetTimetableSettings}>
	<Icon name="undo" class="inline w-6 h-6" />
	{dictionary.labels['Reset']}
</button>
<Toggle
	id="timetable-ampm-toggle"
	bind:checked={$settings.worldclock.timetable.ampm}
	labelText={dictionary.labels['Use AM / PM']} />

<style lang="postcss">
	tr {
		@apply border-b-2 border-base-200 dark:border-base-800;
	}
</style>
