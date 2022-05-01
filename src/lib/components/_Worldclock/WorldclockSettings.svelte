<script>
	import { session } from '$app/stores';

	/// UTILS ///
	import { settings, defaultSettings } from '$lib/stores/settings.js';

	/// COMPONENTS ///
	import { Icon } from '$lib/components/icons';
	import { Accordion, AccordionPanel } from '$lib/components/base/Accordion';
	import AnalogClockSettings from '$lib/components/_Clock/AnalogClockSettings.svelte';
	import DatetimeSettings from '$lib/components/_Clock/DatetimeSettings.svelte';
	import SettingSelect from '$lib/components/SettingSelect.svelte';

	/// STATE ///
	$: dictionary = $session.languageDictionary;
</script>

<!-- key="0" to default to all accordions closed -->
<Accordion key="0">
	<AccordionPanel accordionTitle={dictionary.clockSettings['Displays']} key="1">
		<!-- @see displayOptions in util/toggleDisplay -->
		<div>
			<SettingSelect
				id="primary-display-select"
				selectLabel={dictionary.clockSettings['Primary display:']}
				bind:value={$settings.worldclock.displays.primary}
				values={['analog_digital', 'digital', 'none']}
				labels={dictionary.clockSettings.clockFormats} />
		</div>

		<div>
			<SettingSelect
				id="secondary-display-select"
				selectLabel={dictionary.clockSettings['Secondary display:']}
				bind:value={$settings.worldclock.displays.secondary}
				values={['rows', 'analog_grid', 'digital_grid']}
				labels={dictionary.clockSettings.clockFormats} />
		</div>
	</AccordionPanel>

	{#if $settings.worldclock.displays.primary === 'analog_digital' || $settings.worldclock.displays.secondary !== 'digital_grid'}
		<AccordionPanel accordionTitle={dictionary.clockSettings['Analog']} key="2">
			<AnalogClockSettings page="worldclock" />
		</AccordionPanel>
	{/if}

	<AccordionPanel accordionTitle={dictionary.clockSettings['Digital Datetime']} key="3">
		<DatetimeSettings page="worldclock" />
	</AccordionPanel>
</Accordion>

<button
	class="btn undo-btn mt-4"
	on:click={() => {
		$settings.worldclock.timezones = JSON.parse(
			JSON.stringify(defaultSettings.worldclock.timezones)
		);
	}}>
	<Icon name="undo" class="inline w-6 h-6" />
	{dictionary.worldclockSettings['Reset worldclocks']}
</button>

<button
	class="btn trash-btn mt-4"
	on:click={() => {
		$settings.worldclock.timezones = [];
	}}>
	<Icon name="trash" class="inline w-6 h-6" />
	{dictionary.worldclockSettings['Delete worldclocks']}
</button>

<button
	class="btn undo-btn mt-4"
	on:click={() => {
		$settings.worldclock = JSON.parse(JSON.stringify(defaultSettings.worldclock));

		// TODO: move into centralized location
		// copied from `_layout.svlete` and `DatetimeSettings.svelte`
		if ($settings.worldclock.timeFormat === null) {
			const AMPM =
				Intl.DateTimeFormat(navigator.language, { hour: 'numeric' }).resolvedOptions().hourCycle ===
				'h12';
			$settings.worldclock.timeFormat = AMPM ? 'h:mm A' : 'H:mm';
			$settings.worldclock.timeFormatCustom = AMPM ? 'h:mm A' : 'H:mm';
		}
	}}>
	<Icon name="undo" class="inline w-6 h-6" />
	{dictionary.worldclockSettings['Reset worldclock settings']}
</button>
