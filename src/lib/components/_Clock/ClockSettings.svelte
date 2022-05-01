<script>
	import { session } from '$app/stores';
	import { onMount } from 'svelte';

	import { settings } from '$lib/stores/settings.js';
	import { fontFamilies } from '$lib/data/consts.js';

	/// COMPONENTS ///
	import AnalogClockSettings from './AnalogClockSettings.svelte';
	import DatetimeSettings from './DatetimeSettings.svelte';
	import { Accordion, AccordionPanel } from '$lib/components/base/Accordion';
	import Toggle from '$lib/components/base/Toggle.svelte';
	import SettingSelect from '$lib/components/SettingSelect.svelte';

	/// STATE ///
	$: dictionary = $session.languageDictionary;
	let batterySupported = false;

	/// LIFECYCLE HOOKS ///
	onMount(() => {
		batterySupported = navigator && navigator.getBattery;
	});
</script>

<!-- key="0" to default to all accordions closed -->
<Accordion key="0">
	<AccordionPanel accordionTitle={dictionary.clockSettings['Displays']} key="1">
		<!-- @see displayOptions in util/toggleDisplay -->
		<div>
			<SettingSelect
				id="primary-display-select"
				selectLabel={dictionary.clockSettings['Primary display:']}
				bind:value={$settings.clock.displays.primary}
				values={['analog', 'time', 'date', 'datetime']}
				labels={dictionary.clockSettings.clockFormats} />

			{#if $settings.clock.displays.primary !== 'analog'}
				<SettingSelect
					bind:value={$settings.clock.displays.primaryPalette}
					values={['base', 'accent']}
					labels={dictionary.labels.palettes} />

				<SettingSelect
					bind:value={$settings.clock.displays.primaryFontSize}
					values={['small', 'medium', 'large']}
					labels={dictionary.clockSettings.sizes} />
			{/if}
		</div>

		<div>
			<SettingSelect
				id="secondary-display-select"
				selectLabel={dictionary.clockSettings['Secondary display:']}
				bind:value={$settings.clock.displays.secondary}
				values={['time', 'date', 'datetime', 'none']}
				labels={dictionary.clockSettings.clockFormats} />

			{#if $settings.clock.displays.secondary !== 'none'}
				<SettingSelect
					bind:value={$settings.clock.displays.secondaryPalette}
					values={['base', 'accent']}
					labels={dictionary.labels.palettes} />

				<SettingSelect
					bind:value={$settings.clock.displays.secondaryFontSize}
					values={['small', 'medium', 'large']}
					labels={dictionary.clockSettings.sizes} />
			{/if}
		</div>

		<!-- hide unless battery is supported and screen is large enough to show battery -->
		<div class="hidden mb-2 {batterySupported ? 'sm:block' : ''}">
			<Toggle
				id="show-battery-toggle"
				bind:checked={$settings.clock.displays.battery}
				labelText={dictionary.clockSettings['Show battery']} />
		</div>
	</AccordionPanel>
	{#if $settings.clock.displays.primary == 'analog'}
		<AccordionPanel accordionTitle={dictionary.clockSettings['Analog']} key="2">
			<AnalogClockSettings page="clock" />
		</AccordionPanel>
	{/if}
	{#if $settings.clock.displays.primary != 'analog' || $settings.clock.displays.secondary != 'none'}
		<AccordionPanel accordionTitle={dictionary.clockSettings['Digital Datetime']} key="3">
			<DatetimeSettings page="clock" />

			{#if $settings.clock.displays.primary != 'analog' && fontFamilies[$settings.fontFamily].length > 1}
				<SettingSelect
					id="datetime-font-weight-select"
					selectLabel={dictionary.clockSettings['Primary display font weight:']}
					bind:value={$settings.clock.datetimeFontWeight}
					values={fontFamilies[$settings.fontFamily].map((s) => s.toString())}
					labelMapper={(weight) =>
						`${dictionary.labels['Font Weights'][weight / 100]} (${weight / 100})`} />
			{/if}
		</AccordionPanel>
	{/if}
</Accordion>
