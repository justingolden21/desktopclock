<script>
	import { session } from '$app/stores';

	import dayjs from 'dayjs';

	import { now } from '$lib/util/now.js';
	import { open } from '$lib/util/modal.js';
	import { settings, defaultSettings } from '$lib/stores/settings.js';

	import Icon from '$lib/components/Icon.svelte';
	import SettingSelect from '$lib/components/SettingSelect.svelte';
	import { defaultTimeFormats, defaultDateFormats } from '$lib/data/consts.js';

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
			bind:value={$settings[page].timeFormat}
			values={defaultTimeFormats}
			labelMapper={(timeFormat) =>
				timeFormat === 'custom'
					? dictionary.clockSettings['Custom']
					: new dayjs($now)
							.tz($settings.locale.timezone || 'Etc/GMT')
							.locale($settings.locale.datetime)
							.format?.(timeFormat)} />

		{#if $settings[page].timeFormat === 'custom'}
			<div class="my-2 ml-8">
				<input
					type="text"
					spellcheck="false"
					class="block my-2"
					bind:value={$settings[page].timeFormatCustom} />
				<p>
					<b>{dictionary.clockSettings['Preview:']}</b>
					{new dayjs($now)
						.tz($settings.locale.timezone || 'Etc/GMT')
						.locale($settings.locale.datetime)
						.format?.($settings[page].timeFormatCustom)}
				</p>
			</div>
		{/if}
	</div>

	<div>
		<SettingSelect
			id="date-format-select"
			selectLabel={dictionary.clockSettings['Date format:']}
			bind:value={$settings[page].dateFormat}
			values={defaultDateFormats}
			labelMapper={(dateFormat) =>
				dateFormat === 'custom'
					? dictionary.clockSettings['Custom']
					: new dayjs($now)
							.tz($settings.locale.timezone || 'Etc/GMT')
							.locale($settings.locale.datetime)
							.format?.(dateFormat)} />

		{#if $settings[page].dateFormat === 'custom'}
			<div class="my-2 ml-8">
				<input
					type="text"
					spellcheck="false"
					class="block my-2"
					bind:value={$settings[page].dateFormatCustom} />
				<p>
					<b>{dictionary.clockSettings['Preview:']}</b>
					{new dayjs($now)
						.tz($settings.locale.timezone || 'Etc/GMT')
						.locale($settings.locale.datetime)
						.format?.($settings[page].dateFormatCustom)}
				</p>
			</div>
		{/if}
	</div>

	{#if $settings[page].dateFormat === 'custom' || $settings[page].timeFormat === 'custom'}
		<button class="btn block my-2" on:click={() => open('datetime-format')}
			>{dictionary.clockSettings['Custom formatting reference']}</button>
	{/if}

	<button
		class="btn undo-btn block"
		on:click={() => {
			for (const format of 'timeFormat timeFormatCustom dateFormat dateFormatCustom'.split(' '))
				$settings[page][format] = defaultSettings[page][format];

			// copied from `_layout.svelte` since `timeFormat` will be null
			// because it's null in `defaultSettings` because it's overriden in `_layout.svelte` like so:
			if ($settings[page].timeFormat === null) {
				// https://stackoverflow.com/q/27647918/4907950
				const AMPM =
					Intl.DateTimeFormat(navigator.language, { hour: 'numeric' }).resolvedOptions()
						.hourCycle === 'h12';
				$settings[page].timeFormat = AMPM ? 'h:mm A' : 'H:mm';
				$settings[page].timeFormatCustom = AMPM ? 'h:mm A' : 'H:mm';
			}
		}}>
		<Icon name="undo" class="inline w-6 h-6" />
		{dictionary.clockSettings['Reset datetime formats']}
	</button>
</div>
