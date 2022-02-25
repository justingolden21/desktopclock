<script>
	import { session } from '$app/stores';
	import { onMount } from 'svelte';

	import dayjs from 'dayjs';

	import { now } from '../../util/now.js';
	import { settings, defaultSettings } from '../settings.js';

	import { Accordion, AccordionPanel } from '../Accordion/_accordion.js';
	import Icon from '../Icon.svelte';
	import Toggle from '../Toggle.svelte';
	import Modal from '../Modal.svelte';
	import AnalogClockSettings from './AnalogClockSettings.svelte';
	import SettingSelect from '../SettingSelect.svelte';
	import { fontFamilies, defaultTimeFormats, defaultDateFormats } from '../../data/consts.js';

	$: dictionary = $session.languageDictionary;

	let datetimeFormatModal;

	let batterySupported = false;
	onMount(() => {
		batterySupported = navigator && navigator.getBattery;
	});
</script>

<!-- key="0" to default to all accordions closed -->
<Accordion key="0">
	<AccordionPanel accordionTitle={dictionary.clockSettings['Displays']} key="1">
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
			<AnalogClockSettings />
		</AccordionPanel>
	{/if}
	{#if $settings.clock.displays.primary != 'analog' || $settings.clock.displays.secondary != 'none'}
		<AccordionPanel accordionTitle={dictionary.clockSettings['Digital Datetime']} key="3">
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
					<button class="btn block my-2" on:click={datetimeFormatModal.show}
						>{dictionary.clockSettings['Custom formatting reference']}</button>
				{/if}

				<button
					class="btn undo-btn block"
					on:click={() => {
						for (const format of 'timeFormat timeFormatCustom dateFormat dateFormatCustom'.split(
							' '
						))
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

				<Modal
					bind:this={datetimeFormatModal}
					title={dictionary.clockSettings['Datetime Formatting']}
					icon="table">
					<table>
						<thead>
							<tr>
								{#each dictionary.clockSettings.datetimeFormatTableHeadings as item}
									<th>{item}</th>
								{/each}
							</tr>
						</thead>
						<tbody>
							{#each dictionary.clockSettings.datetimeFormatTable as row}
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
							{@html dictionary.about['madeWithText'].replace(
								'{{Day JS}}',
								'<a rel="noopener" href="https://day.js.org/docs/en/display/format" target="_blank">Day JS</a>'
							)}
						</p>
					{/if}
				</Modal>
			</div>
		</AccordionPanel>
	{/if}
</Accordion>
