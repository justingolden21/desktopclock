<script>
	import { session } from '$app/stores';
	import { onMount } from 'svelte';

	import TailwindColors from 'tailwindcss/colors.js';
	import dayjs from 'dayjs';

	import { now } from '../../util/now.js';
	import { settings, defaultSettings } from '../settings.js';

	import { Accordion, AccordionPanel } from '../Accordion/_accordion.js';
	import Icon from '../Icon.svelte';
	import Toggle from '../Toggle.svelte';
	import Modal from '../Modal.svelte';
	import { fontFamilies } from '../../data/consts.js';

	import defaultTheme from '../../themes/default';
	import defaultNightTheme from '../../themes/defaultNight';
	import classicTheme from '../../themes/classic';
	import classicNightTheme from '../../themes/classicNight';

	$: colorPalette = TailwindColors[$settings.colorPalette];
	$: dictionary = $session.languageDictionary;

	let datetimeFormatModal;

	let batterySupported = false;
	onMount(() => {
		batterySupported = navigator && navigator.getBattery;
	});
</script>

<Accordion key="1">
	<AccordionPanel accordionTitle={dictionary.clockSettings['Displays']} key="1">
		<div class="block xl:inline">
			<label for="primary-display-select">{dictionary.clockSettings['Primary display:']}</label>
			<select id="primary-display-select" bind:value={$settings.clock.displays.primary}>
				<option value="analog">{dictionary.clockSettings['Analog clock']}</option>
				<option value="time">{dictionary.clockSettings['Digital time']}</option>
				<option value="date">{dictionary.clockSettings['Date']}</option>
				<option value="datetime">{dictionary.clockSettings['Date + digital time']}</option>
			</select>
		</div>

		<div class="block xl:inline">
			<label for="secondary-display-select">{dictionary.clockSettings['Secondary display:']}</label>
			<select id="secondary-display-select" bind:value={$settings.clock.displays.secondary}>
				<option value="time">{dictionary.clockSettings['Digital time']}</option>
				<option value="date">{dictionary.clockSettings['Date']}</option>
				<option value="datetime">{dictionary.clockSettings['Date + digital time']}</option>
				<option value="none">{dictionary.clockSettings['None']}</option>
			</select>
		</div>

		<!-- hide unless battery is supported and screen is large enough to show battery -->
		<div class="hidden mb-2 {batterySupported ? 'sm:block' : ''}">
			<Toggle
				id="show-battery-toggle"
				bind:checked={$settings.clock.displays.battery}
				labelText={dictionary.clockSettings['Show battery']}
			/>
		</div>
	</AccordionPanel>
	{#if $settings.clock.displays.primary == 'analog'}
		<AccordionPanel accordionTitle={dictionary.clockSettings['Analog']} key="2">
			<!-- note: using json for efficient deep clone so original theme object is not mutated -->
			<button
				class="btn theme-btn"
				on:click={() => ($settings.clock.theme = JSON.parse(JSON.stringify(defaultTheme)))}
			>
				<Icon name="theme" class="inline w-6 h-6" />
				{dictionary.clockSettings['Default Theme']}
			</button>
			<button
				class="btn theme-btn"
				on:click={() => ($settings.clock.theme = JSON.parse(JSON.stringify(defaultNightTheme)))}
			>
				<Icon name="theme" class="inline w-6 h-6" />
				{dictionary.clockSettings['Default Night Theme']}
			</button>
			<button
				class="btn theme-btn"
				on:click={() => ($settings.clock.theme = JSON.parse(JSON.stringify(classicTheme)))}
			>
				<Icon name="theme" class="inline w-6 h-6" />
				{dictionary.clockSettings['Classic Theme']}
			</button>
			<button
				class="btn theme-btn"
				on:click={() => ($settings.clock.theme = JSON.parse(JSON.stringify(classicNightTheme)))}
			>
				<Icon name="theme" class="inline w-6 h-6" />
				{dictionary.clockSettings['Classic Night Theme']}
			</button>
			<button
				class="btn theme-btn"
				on:click={() => {
					for (const size of 'sm md lg'.split(' '))
						$settings.clock.theme.ticks[size].stroke.lightness = '-1';
				}}
			>
				<Icon name="settings" class="inline w-6 h-6" />
				{dictionary.clockSettings['Simple Mode']}
			</button>

			<h3>{dictionary.clockSettings['Face']}</h3>

			<div class="block xl:inline">
				<label for="face-fill-select">{dictionary.display['Fill color:']}</label>
				<select id="face-fill-select" bind:value={$settings.clock.theme.face.fill.lightness}>
					{#each Object.keys(colorPalette) as lightness}
						<option value={lightness}>{lightness}</option>
					{/each}
					<option value="-1">{dictionary.display['Transparent']}</option>
				</select>
			</div>
			<div class="block xl:inline">
				<label for="face-stroke-select">{dictionary.display['Stroke color:']}</label>
				<select id="face-stroke-select" bind:value={$settings.clock.theme.face.stroke.lightness}>
					{#each Object.keys(colorPalette) as lightness}
						<option value={lightness}>{lightness}</option>
					{/each}
					<option value="-1">{dictionary.display['Transparent']}</option>
				</select>
			</div>
			<div class="block xl:inline">
				<label for="face-stroke-width-select">{dictionary.display['Stroke width:']}</label>
				<select id="face-stroke-width-select" bind:value={$settings.clock.theme.face.strokeWidth}>
					{#each Array(6) as _, i}
						<option value={i}>{i}</option>
					{/each}
				</select>
			</div>
			<div class="block xl:inline">
				<label for="face-shape-select">{dictionary.display['Shape:']}</label>
				<select id="face-shape-select" bind:value={$settings.clock.theme.face.shape}>
					<option value="circle">{dictionary.display.shapes['Circle']}</option>
					<option value="rounded">{dictionary.display.shapes['Rounded Square']}</option>
					<option value="square">{dictionary.display.shapes['Square']}</option>
				</select>
			</div>

			<h3>{dictionary.clockSettings['Shadow']}</h3>

			<div class="block xl:inline">
				<label for="shadow-fill-select">{dictionary.display['Color:']}</label>
				<select
					id="shadow-fill-select"
					bind:value={$settings.clock.theme.shadow.fill.lightness}
					disabled={$settings.clock.theme.face.fill.lightness == '-1'}
				>
					{#each Object.keys(colorPalette) as lightness}
						<option value={lightness}>{lightness}</option>
					{/each}
					<option value="-1">{dictionary.display['Transparent']}</option>
				</select>
			</div>

			<h3>{dictionary.clockSettings['Pin']}</h3>

			<div class="block xl:inline">
				<label for="pin-fill-select">{dictionary.display['Fill color:']}</label>
				<select id="pin-fill-select" bind:value={$settings.clock.theme.pin.fill.lightness}>
					{#each Object.keys(colorPalette) as lightness}
						<option value={lightness}>{lightness}</option>
					{/each}
					<option value="-1">{dictionary.display['Transparent']}</option>
				</select>
			</div>
			<div class="block xl:inline">
				<label for="pin-stroke-select">{dictionary.display['Stroke color:']}</label>
				<select id="pin-stroke-select" bind:value={$settings.clock.theme.pin.stroke.lightness}>
					{#each Object.keys(colorPalette) as lightness}
						<option value={lightness}>{lightness}</option>
					{/each}
					<option value="-1">{dictionary.display['Transparent']}</option>
				</select>
			</div>
			<div class="block xl:inline">
				<label for="pin-stroke-width-select">{dictionary.display['Stroke width:']}</label>
				<select id="pin-stroke-width-select" bind:value={$settings.clock.theme.pin.strokeWidth}>
					{#each Array(7) as _, i}
						<option value={i / 2}>{i / 2}</option>
					{/each}
				</select>
			</div>
			<div class="block xl:inline">
				<label for="pin-size-select">{dictionary.display['Size:']}</label>
				<select id="pin-size-select" bind:value={$settings.clock.theme.pin.size}>
					{#each Array(6) as _, i}
						<option value={i / 2}>{i / 2}</option>
					{/each}
				</select>
			</div>

			<h3>{dictionary.clockSettings['Ticks']}</h3>

			{#each ['sm', 'md', 'lg'] as size, i}
				<h4>
					{dictionary.clockSettings[{ sm: 'Small', md: 'Medium', lg: 'Large' }[size]]}
				</h4>
				<div class="block xl:inline">
					<label for="{size}-tick-stroke-select">
						{dictionary.display['Stroke color:']}
					</label>
					<select
						id="{size}-tick-stroke-select"
						bind:value={$settings.clock.theme.ticks[size].stroke.lightness}
					>
						{#each Object.keys(colorPalette) as lightness}
							<option value={lightness}>{lightness}</option>
						{/each}
						<option value="-1">{dictionary.display['Transparent']}</option>
					</select>
				</div>
				<div class="block xl:inline">
					<label for="{size}-tick-width-select">{dictionary.display['Width:']}</label>
					<select
						id="{size}-tick-width-select"
						bind:value={$settings.clock.theme.ticks[size].width}
					>
						{#each Array(6) as _, i}
							<option value={i}>{i}</option>
						{/each}
					</select>
				</div>
				<div class="block xl:inline">
					<label for="{size}-tick-height-select">{dictionary.display['Height:']}</label>
					<select
						id="{size}-tick-height-select"
						bind:value={$settings.clock.theme.ticks[size].height}
					>
						{#each Array(6) as _, i}
							<option value={i / 2}>{i / 2}</option>
						{/each}
					</select>
				</div>
			{/each}

			<h3>{dictionary.clockSettings['Hands']}</h3>

			{#each ['hour', 'minute', 'second'] as hand, i}
				<h4>
					{dictionary.clockSettings[{ hour: 'Hour', minute: 'Minute', second: 'Second' }[hand]]}
				</h4>
				<div class="block xl:inline">
					<label for="{hand}-hand-stroke-select">
						{dictionary.display['Stroke color:']}
					</label>
					<select
						id="{hand}-hand-stroke-select"
						bind:value={$settings.clock.theme.hands[hand].stroke.lightness}
					>
						{#each Object.keys(colorPalette) as lightness}
							<option value={lightness}>{lightness}</option>
						{/each}
						<option value="-1">{dictionary.display['Transparent']}</option>
					</select>
				</div>
				<div class="block xl:inline">
					<label for="{hand}-hand-stroke-width-select">{dictionary.display['Stroke width:']}</label>
					<select
						id="{hand}-hand-stroke-width-select"
						bind:value={$settings.clock.theme.hands[hand].strokeWidth}
					>
						{#each Array(6) as _, i}
							<option value={(i + 1) / 2}>{(i + 1) / 2}</option>
						{/each}
					</select>
				</div>
				<div class="block xl:inline">
					<label for="{hand}-hand-length-select">{dictionary.display['Length:']}</label>
					<select
						id="{hand}-hand-length-select"
						bind:value={$settings.clock.theme.hands[hand].length}
					>
						{#each Array(6) as _, i}
							<option value={i * 3 + 12}>{i * 3 + 12}</option>
						{/each}
					</select>
				</div>
				<div class="block xl:inline">
					<label for="{hand}-hand-back-select">{dictionary.display['Back:']}</label>
					<select id="{hand}-hand-back-select" bind:value={$settings.clock.theme.hands[hand].back}>
						{#each Array(10) as _, i}
							<option value={i}>{i}</option>
						{/each}
					</select>
				</div>
				<div class="block xl:inline">
					<label for="{hand}-hand-linecap-select">{dictionary.display['Linecap:']}</label>
					<select
						id="{hand}-hand-linecap-select"
						bind:value={$settings.clock.theme.hands[hand].linecap}
					>
						<option value="butt">{dictionary.display.linecaps['Butt']}</option>
						<option value="round">{dictionary.display.linecaps['Round']}</option>
						<option value="square">{dictionary.display.linecaps['Square']}</option>
					</select>
				</div>
			{/each}
		</AccordionPanel>
	{/if}
	{#if $settings.clock.displays.primary != 'analog' || $settings.clock.displays.secondary != 'none'}
		<AccordionPanel accordionTitle={dictionary.clockSettings['Digital Datetime']} key="3">
			<div class="block xl:inline">
				<div class="block xl:inline">
					<label for="time-format-select">{dictionary.clockSettings['Time format:']}</label>
					<select id="time-format-select" bind:value={$settings.clock.timeFormat}>
						{#each ['H:mm', 'H:mm:ss', 'h:mm A', 'h:mm:ss A', 'H:mm Z', 'H:mm:ss Z', 'h:mm A Z', 'h:mm:ss A Z', 'mm:ss'] as timeFormat}
							<option value={timeFormat}
								>{new dayjs($now)
									.tz($settings.locale.timezone || 'Etc/GMT')
									.locale($settings.locale.datetime)
									.format?.(timeFormat)}</option
							>
						{/each}
						<option value="custom">{dictionary.clockSettings['Custom']}</option>
					</select>
					{#if $settings.clock.timeFormat === 'custom'}
						<div class="my-2 ml-8">
							<input
								type="text"
								spellcheck="false"
								class="block my-2"
								bind:value={$settings.clock.timeFormatCustom}
							/>
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

				<div class="block xl:inline">
					<label for="date-format-select">{dictionary.clockSettings['Date format:']}</label>
					<select id="date-format-select" bind:value={$settings.clock.dateFormat}>
						{#each ['MMM D', 'MMM D YYYY', 'ddd, MMMM D', 'ddd, MMMM D YYYY', 'D MMM', 'D MMM YYYY', 'ddd, D MMM', 'ddd, D MMM YYYY'] as dateFormat}
							<option value={dateFormat}
								>{new dayjs($now)
									.tz($settings.locale.timezone || 'Etc/GMT')
									.locale($settings.locale.datetime)
									.format?.(dateFormat)}</option
							>
						{/each}
						<option value="custom">{dictionary.clockSettings['Custom']}</option>
					</select>
					{#if $settings.clock.dateFormat === 'custom'}
						<div class="my-2 ml-8">
							<input
								type="text"
								spellcheck="false"
								class="block my-2"
								bind:value={$settings.clock.dateFormatCustom}
							/>
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
					<button class="btn block my-2" on:click={datetimeFormatModal.show()}
						>{dictionary.clockSettings['Custom formatting reference']}</button
					>
				{/if}

				<button
					class="btn undo-btn block"
					on:click={() => {
						for (const format of 'timeFormat timeFormatCustom dateFormat dateFormatCustom'.split(
							' '
						))
							$settings.clock[format] = defaultSettings.clock[format];
					}}
				>
					<Icon name="undo" class="inline w-6 h-6" />
					{dictionary.clockSettings['Reset datetime formats']}
				</button>

				{#if $settings.clock.displays.primary != 'analog' && fontFamilies[$settings.fontFamily].length > 1}
					<label for="datetime-font-weight-select"
						>{dictionary.clockSettings['Datetime font weight:']}</label
					>
					<select id="datetime-font-weight-select" bind:value={$settings.clock.datetimeFontWeight}>
						{#each fontFamilies[$settings.fontFamily] as weight}
							<option value={weight.toString()}
								>{dictionary.labels['Font Weights'][weight / 100]} ({weight / 100})</option
							>
						{/each}
					</select>
				{/if}

				<Modal
					bind:this={datetimeFormatModal}
					title={dictionary.clockSettings['Datetime Formatting']}
					icon="table"
				>
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
