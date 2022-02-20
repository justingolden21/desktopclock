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
	import AnalogClock from './AnalogClock.svelte';
	import ColorSelector from '../ColorSelector.svelte';
	import SettingSelect from '../SettingSelect.svelte';
	import {
		fontFamilies,
		movements,
		numeralStyles,
		defaultTimeFormats,
		defaultDateFormats
	} from '../../data/consts.js';

	import defaultTheme from '../../themes/default';
	import defaultNightTheme from '../../themes/defaultNight';
	import classicTheme from '../../themes/classic';
	import classicNightTheme from '../../themes/classicNight';

	$: dictionary = $session.languageDictionary;

	let datetimeFormatModal;

	let batterySupported = false;
	onMount(() => {
		batterySupported = navigator && navigator.getBattery;
	});

	// check and hide ticks behind numerals
	function numeralsChange(evt) {
		const hideTicks = (size) => {
			// if face is transparent, don't bother
			if ($settings.clock.theme.face.fill.lightness === '-1') return;

			// set the ticks to be same color as face
			// (if we just make it width 0 or lightness -1, the smaller ticks show through)
			$settings.clock.theme.ticks[size].stroke.lightness =
				$settings.clock.theme.face.fill.lightness;
			$settings.clock.theme.ticks[size].stroke.palette = $settings.clock.theme.face.fill.palette;

			// prevent other ticks from showing through
			$settings.clock.theme.ticks[size].width =
				Math.max($settings.clock.theme.ticks['md'].width, $settings.clock.theme.ticks['sm'].width) +
				0.5;
			$settings.clock.theme.ticks[size].height =
				Math.max(
					$settings.clock.theme.ticks['md'].height,
					$settings.clock.theme.ticks['sm'].height
				) + 1;
		};
		const style = evt.target.value;
		const lgStyles = ['numerals', 'fourNumerals', 'numbers', 'fourNumbers'];
		const mdStyles = ['numerals', 'numbers'];
		if (mdStyles.includes(style)) hideTicks('md');
		if (lgStyles.includes(style)) hideTicks('lg');
	}
</script>

<Accordion key="1">
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
			<div
				class="float-right fixed right-16 top-72 w-32 h-32 p-1 rounded-full bg-opacity-75 bg-base-300 dark:bg-base-500 hidden md:block">
				<AnalogClock mode="static" time={{ h: 10, m: 9, s: 0 }} />
			</div>
			<!-- using stringify for efficient deep clone so original theme object is not mutated -->
			{#each [defaultTheme, defaultNightTheme, classicTheme, classicNightTheme] as clockTheme}
				<button
					class="btn theme-btn"
					on:click={() => ($settings.clock.theme = JSON.parse(JSON.stringify(clockTheme)))}>
					<Icon name="theme" class="inline w-6 h-6" />
					{dictionary.clockSettings[clockTheme.name]}
				</button>
			{/each}
			<button
				class="btn theme-btn"
				on:click={() => {
					for (const size of 'sm md lg'.split(' '))
						$settings.clock.theme.ticks[size].stroke.lightness = '-1';
				}}>
				<Icon name="settings" class="inline w-6 h-6" />
				{dictionary.clockSettings['Simple Mode']}
			</button>

			<br />

			<SettingSelect
				id="second-hand-movement-select"
				selectLabel={dictionary.clockSettings['Second hand movement:']}
				bind:value={$settings.clock.secondHandMovement}
				values={movements}
				labels={dictionary.labels['Movements']} />

			<div class="grid lg:grid-cols-2 xl:grid-cols-3">
				<div>
					<h3>{dictionary.clockSettings['Face']}</h3>
					<div>
						<ColorSelector bind:colorObj={$settings.clock.theme.face.fill} label="Fill color" />
					</div>
					<div>
						<SettingSelect
							id="face-stroke-width-select"
							selectLabel={dictionary.display['Stroke width:']}
							bind:value={$settings.clock.theme.face.strokeWidth}
							values={[...Array(6).keys()]} />
					</div>
					{#if $settings.clock.theme.face.strokeWidth !== 0}
						<div>
							<ColorSelector
								bind:colorObj={$settings.clock.theme.face.stroke}
								label="Stroke color" />
						</div>
					{/if}
					<div>
						<SettingSelect
							id="face-shape-select"
							selectLabel={dictionary.display['Shape:']}
							bind:value={$settings.clock.theme.face.shape}
							values={['circle', 'rounded', 'square']}
							labels={dictionary.display.shapes} />
					</div>
				</div>
				<div>
					<h3>{dictionary.clockSettings['Shadow']}</h3>
					<div>
						<ColorSelector bind:colorObj={$settings.clock.theme.shadow.fill} label="Fill color" />
					</div>
				</div>
				<div>
					<h3>{dictionary.clockSettings['Pin']}</h3>
					<div>
						<SettingSelect
							id="pin-size-select"
							selectLabel={dictionary.display['Size:']}
							bind:value={$settings.clock.theme.pin.size}
							values={[...Array(6).keys()].map((x) => x / 2)} />
					</div>
					{#if $settings.clock.theme.pin.size !== 0}
						<div>
							<ColorSelector bind:colorObj={$settings.clock.theme.pin.fill} label="Fill color" />
						</div>
						<div>
							<SettingSelect
								id="pin-stroke-width-select"
								selectLabel={dictionary.display['Stroke width:']}
								bind:value={$settings.clock.theme.pin.strokeWidth}
								values={[...Array(7).keys()].map((x) => x / 2)} />
						</div>
						{#if $settings.clock.theme.pin.strokeWidth !== 0}
							<div>
								<ColorSelector
									bind:colorObj={$settings.clock.theme.pin.stroke}
									label="Stroke color" />
							</div>
						{/if}
					{/if}
				</div>
				<div>
					<h3>{dictionary.clockSettings['Numerals']}</h3>
					<div>
						<SettingSelect
							id="numerals-select"
							selectLabel={dictionary.clockSettings['Numeral Style:']}
							bind:value={$settings.clock.theme.numerals.style}
							onchange={numeralsChange}
							values={Object.keys(numeralStyles)}
							labels={dictionary.labels['Numeral Styles']} />
					</div>
					{#if $settings.clock.theme.numerals.style !== 'none'}
						<div>
							<ColorSelector
								bind:colorObj={$settings.clock.theme.numerals.fill}
								label="Fill color" />
						</div>

						<SettingSelect
							id="numerals-font-family-select"
							selectLabel={dictionary.labels['Font family:']}
							bind:value={$settings.clock.theme.numerals.fontFamily}
							onchange={numeralsChange}
							values={Object.keys(fontFamilies).filter((x) => x !== '')}
							dynamicFont={true} />
					{/if}
				</div>
			</div>

			<h3>{dictionary.clockSettings['Ticks']}</h3>

			<div class="grid lg:grid-cols-2 xl:grid-cols-3">
				{#each ['sm', 'md', 'lg'] as size}
					<div>
						<h4>
							{dictionary.clockSettings.sizes[{ sm: 'small', md: 'medium', lg: 'large' }[size]]}
						</h4>
						<div>
							<ColorSelector
								bind:colorObj={$settings.clock.theme.ticks[size].stroke}
								label="Stroke color" />
						</div>
						{#if $settings.clock.theme.ticks[size].stroke.lightness !== '-1'}
							<div>
								<SettingSelect
									id="{size}-tick-width-select"
									selectLabel={dictionary.display['Width:']}
									bind:value={$settings.clock.theme.ticks[size].width}
									values={[...Array(6).keys()]} />
							</div>
							<div>
								<SettingSelect
									id="{size}-tick-height-select"
									selectLabel={dictionary.display['Height:']}
									bind:value={$settings.clock.theme.ticks[size].height}
									values={[...Array(6).keys()].map((x) => x / 2)} />
							</div>
						{/if}
					</div>
				{/each}
			</div>

			<h3>{dictionary.clockSettings['Hands']}</h3>

			<div class="grid lg:grid-cols-2 xl:grid-cols-3">
				{#each ['hour', 'minute', 'second'] as hand}
					<div>
						<h4>
							{dictionary.clockSettings[{ hour: 'Hour', minute: 'Minute', second: 'Second' }[hand]]}
						</h4>
						<div>
							<ColorSelector
								bind:colorObj={$settings.clock.theme.hands[hand].stroke}
								label="Stroke color" />
						</div>
						{#if $settings.clock.theme.hands[hand].stroke.lightness !== '-1'}
							<div>
								<SettingSelect
									id="{hand}-hand-stroke-width-select"
									selectLabel={dictionary.display['Stroke width:']}
									bind:value={$settings.clock.theme.hands[hand].strokeWidth}
									values={[...Array(6).keys()].map((x) => (x + 1) / 2)} />
							</div>
							<div>
								<SettingSelect
									id="{hand}-hand-length-select"
									selectLabel={dictionary.display['Length:']}
									bind:value={$settings.clock.theme.hands[hand].length}
									values={[...Array(6).keys()].map((x) => x * 3 + 12)} />
							</div>
							<div>
								<SettingSelect
									id="{hand}-hand-back-select"
									selectLabel={dictionary.display['Back:']}
									bind:value={$settings.clock.theme.hands[hand].back}
									values={[...Array(10).keys()]} />
							</div>
							<div>
								<SettingSelect
									id="{hand}-hand-linecap-select"
									selectLabel={dictionary.display['Linecap:']}
									bind:value={$settings.clock.theme.hands[hand].linecap}
									values={['round', 'square']}
									labels={dictionary.display.linecaps} />
							</div>
						{/if}
					</div>
				{/each}
			</div>
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
