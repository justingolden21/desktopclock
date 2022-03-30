<script>
	import SimpleTimePicker from '../SimpleTimePicker.svelte';
	import Toggle from '../Toggle.svelte';
	import WorldclockDropdown from './WorldclockDropdown.svelte';
	import { settings } from '../settings.js';
	import { getTime, getHourDiff } from '../../util/timeText';

	let AMPM, times;

	function resetTimetableSettings() {
		AMPM =
			Intl.DateTimeFormat(navigator.language, { hour: 'numeric' }).resolvedOptions().hourCycle ===
			'h12';
		times = ['9:00', '12:00', '15:00', '18:00'];
	}

	resetTimetableSettings();

	// in mins
	function getDiff(time1, time2) {
		if (typeof time1 === 'string') time1 = timeStrToObj(time1);
		if (typeof time2 === 'string') time2 = timeStrToObj(time2);

		const mins1 = objToMins(time1);
		const mins2 = objToMins(time2);

		let minsDiff = mins1 - mins2;

		const minsPerDay = 60 * 24;
		if (minsDiff < 0) minsDiff += minsPerDay;
		if (minsDiff > minsPerDay) minsDiff -= minsPerDay;

		return minsDiff;
	}

	function getSum(time, mins) {
		if (typeof time === 'string') time = timeStrToObj(time);

		const timeMins = objToMins(time);

		let minsSum = timeMins + mins;
		// if (minsSum < 0) minsSum += 60 * 24;
		// if (minsSum > 60 * 24) minsSum -= 60 * 24;

		return minsToTimeStr(minsSum, AMPM);
	}

	// time variable conversion

	function timeStrToObj(timeStr) {
		const pm = timeStr.toUpperCase().includes('PM');
		const hours = parseInt(timeStr.split(':')[0]) + (pm ? 12 : 0);
		const mins = parseInt(timeStr.split(':')[1]);
		return { hours, mins };
	}

	function timeStrToMins(timeStr) {
		return objToMins(timeStrToObj(timeStr));
	}

	function minsToObj(n) {
		const h = n / 60;
		const hours = Math.floor(h);
		const m = (h - hours) * 60;
		const mins = Math.round(m);
		return {
			hours,
			mins
		};
	}

	function objToTimeStr(obj, ampm = false) {
		let h = obj.hours % (ampm ? 12 : 24);
		if (ampm && h === 0) h = 12;
		const m = obj.mins.toString().padStart(2, '0');
		return `${h}:${m}${ampm ? (obj.hours >= 12 ? ' PM' : ' AM') : ''}`;
	}

	function minsToTimeStr(n, ampm = false) {
		return objToTimeStr(minsToObj(n), ampm);
	}

	function objToMins(obj) {
		return obj.hours * 60 + obj.mins;
	}
</script>

<!-- TODO: translate diff, name, now, home, reset -->
<!-- TODO: store timetable times in localstorage under worldclock > timetable > times -->
<!-- TODO: note that this doesn't account for daylight savings changes -->
<table>
	<thead>
		<tr>
			<th />
			<th>Difference</th>
			<th>Name</th>
			<th>Now</th>
			{#each times as time}
				<th><SimpleTimePicker ampm={AMPM} bind:value={time} classes={'mx-0 my-4'} /></th>
			{/each}
		</tr>
	</thead>
	<tbody class="group">
		{#each [{ name: 'Home', zone: $settings.locale.timezone }].concat($settings.worldclock.timezones) as timezone, idx}
			<tr>
				<td>
					{#if idx !== 0}
						<div class="w-12 h-12">
							<WorldclockDropdown idx={idx - 1} classes="z-10" />
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
				{#each times as time}
					<!-- timetext
					get diff between time selector and current time
				then add diff to timezone time -->
					<td
						>{getSum(
							time,
							getDiff($getTime(timezone.zone), $getTime($settings.locale.timezone))
						)}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<button class="btn" on:click={resetTimetableSettings}>Reset</button>

<!-- TODO: translate label text -->
<Toggle id="timetable-ampm-toggle" bind:checked={AMPM} labelText={'Use AM / PM'} />

<style lang="postcss">
	tr {
		@apply border-b-2 border-base-200 dark:border-base-800;
	}
</style>
