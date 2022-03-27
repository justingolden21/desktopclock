<script>
	import { session } from '$app/stores';

	import dayjs from 'dayjs';

	import { now } from '../../util/now.js';
	import { open } from '../../util/modal.js';
	import { settings, defaultSettings } from '../settings.js';

	import Icon from '../Icon.svelte';
	import SettingSelect from '../SettingSelect.svelte';
	import { fontFamilies, defaultTimeFormats, defaultDateFormats } from '../../data/consts.js';

	// settings to apply changes to
	// 'clock' or 'worldclock'
	export let page;

	$: dictionary = $session.languageDictionary;
</script>

<div>
	<div>
		<SettingSelect
			id="time-format-select"
			selectLabel={dictionary.clockSettings['Time format:']}
			bind:value={$settings.clock.timeFormat}
			values={defaultTimeFormats}
			labelMapper={(timeFormat) =>
				timeFormat === 'custom'
					? dictionary.clockSettings['Custom']
					: new dayjs($now)
							.tz($settings.locale.timezone || 'Etc/GMT')
							.locale($settings.locale.datetime)
							.format?.(timeFormat)} />

		{#if $settings.clock.timeFormat === 'custom'}
			<div class="my-2 ml-8">
				<input
					type="text"
					spellcheck="false"
					class="block my-2"
					bind:value={$settings.clock.timeFormatCustom} />
				<p>
					<b>{dictionary.clockSettings['Preview:']}</b>
					{new dayjs($now)
						.tz($settings.locale.timezone || 'Etc/GMT')
						.locale($settings.locale.datetime)
						.format?.($settings.clock.timeFormatCustom)}
				</p>
			</div>
		{/if}
	</div>

	<div>
		<SettingSelect
			id="date-format-select"
			selectLabel={dictionary.clockSettings['Date format:']}
			bind:value={$settings.clock.dateFormat}
			values={defaultDateFormats}
			labelMapper={(dateFormat) =>
				dateFormat === 'custom'
					? dictionary.clockSettings['Custom']
					: new dayjs($now)
							.tz($settings.locale.timezone || 'Etc/GMT')
							.locale($settings.locale.datetime)
							.format?.(dateFormat)} />

		{#if $settings.clock.dateFormat === 'custom'}
			<div class="my-2 ml-8">
				<input
					type="text"
					spellcheck="false"
					class="block my-2"
					bind:value={$settings.clock.dateFormatCustom} />
				<p>
					<b>{dictionary.clockSettings['Preview:']}</b>
					{new dayjs($now)
						.tz($settings.locale.timezone || 'Etc/GMT')
						.locale($settings.locale.datetime)
						.format?.($settings.clock.dateFormatCustom)}
				</p>
			</div>
		{/if}
	</div>

	{#if $settings.clock.dateFormat === 'custom' || $settings.clock.timeFormat === 'custom'}
		<button class="btn block my-2" on:click={() => open('datetime-format')}
			>{dictionary.clockSettings['Custom formatting reference']}</button>
	{/if}

	<button
		class="btn undo-btn block"
		on:click={() => {
			for (const format of 'timeFormat timeFormatCustom dateFormat dateFormatCustom'.split(' '))
				$settings.clock[format] = defaultSettings.clock[format];

			// copied from `_layout.svelte` since `timeFormat` will be null
			// because it's null in `defaultSettings` because it's overriden in `_layout.svelte` like so:
			if ($settings.clock.timeFormat === null) {
				// https://stackoverflow.com/q/27647918/4907950
				const AMPM =
					Intl.DateTimeFormat(navigator.language, { hour: 'numeric' }).resolvedOptions()
						.hourCycle === 'h12';
				$settings.clock.timeFormat = AMPM ? 'h:mm A' : 'H:mm';
				$settings.clock.timeFormatCustom = AMPM ? 'h:mm A' : 'H:mm';
			}
		}}>
		<Icon name="undo" class="inline w-6 h-6" />
		{dictionary.clockSettings['Reset datetime formats']}
	</button>

	{#if $settings.clock.displays.primary != 'analog' && fontFamilies[$settings.fontFamily].length > 1}
		<SettingSelect
			id="datetime-font-weight-select"
			selectLabel={dictionary.clockSettings['Primary display font weight:']}
			bind:value={$settings.clock.datetimeFontWeight}
			values={fontFamilies[$settings.fontFamily].map((s) => s.toString())}
			labelMapper={(weight) =>
				`${dictionary.labels['Font Weights'][weight / 100]} (${weight / 100})`} />
	{/if}
</div>
