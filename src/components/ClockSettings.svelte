<script>
	import { session } from '$app/stores';
	import { onMount } from 'svelte';

	import TailwindColors from 'tailwindcss/colors.js';
	import dayjs from 'dayjs';

	import { now } from './now.js';
	import { settings, defaultSettings } from './settings.js';
	import Accordion from './Accordion.svelte';
	import AccordionPanel from './AccordionPanel.svelte';

	import Icon from './Icon.svelte';
	import Toggle from './Toggle.svelte';
	import Modal from './Modal.svelte';
	import { fontFamilies } from './consts.js';

	import defaultTheme from '../themes/default';
	import defaultNightTheme from '../themes/defaultNight';
	import classicTheme from '../themes/classic';
	import classicNightTheme from '../themes/classicNight';

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
		<div class="block mb-2">
			<label for="primary-display-select">{dictionary.clockSettings['Primary display:']}</label>
			<select id="primary-display-select" bind:value={$settings.clock.displays.primary}>
				<option value="analog">{dictionary.clockSettings['Analog clock']}</option>
				<option value="time">{dictionary.clockSettings['Digital time']}</option>
				<option value="date">{dictionary.clockSettings['Date']}</option>
				<option value="datetime">{dictionary.clockSettings['Date + digital time']}</option>
			</select>
		</div>

		<div class="block mb-2">
			<label for="secondary-display-select">{dictionary.clockSettings['Secondary display:']}</label>
			<select id="secondary-display-select" bind:value={$settings.clock.displays.secondary}>
				<option value="time">{dictionary.clockSettings['Digital time']}</option>
				<option value="date">{dictionary.clockSettings['Date']}</option>
				<option value="datetime">{dictionary.clockSettings['Date + digital time']}</option>
				<option value="none">{dictionary.clockSettings['None']}</option>
			</select>
		</div>

		<div class="block mb-2" class:hidden={!batterySupported}>
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
				class="btn theme-btn block"
				on:click={() => ($settings.clock.theme = JSON.parse(JSON.stringify(defaultTheme)))}
			>
				<Icon name="theme" class="inline w-6 h-6" />
				{dictionary.clockSettings['Default Theme']}
			</button>
			<button
				class="btn theme-btn block"
				on:click={() => ($settings.clock.theme = JSON.parse(JSON.stringify(defaultNightTheme)))}
			>
				<Icon name="theme" class="inline w-6 h-6" />
				{dictionary.clockSettings['Default Night Theme']}
			</button>
			<button
				class="btn theme-btn block"
				on:click={() => ($settings.clock.theme = JSON.parse(JSON.stringify(classicTheme)))}
			>
				<Icon name="theme" class="inline w-6 h-6" />
				{dictionary.clockSettings['Classic Theme']}
			</button>
			<button
				class="btn theme-btn block"
				on:click={() => ($settings.clock.theme = JSON.parse(JSON.stringify(classicNightTheme)))}
			>
				<Icon name="theme" class="inline w-6 h-6" />
				{dictionary.clockSettings['Classic Night Theme']}
			</button>
			<button
				class="btn theme-btn block"
				on:click={() => {
					for (const size of 'sm md lg'.split(' ')) $settings.clock.theme.ticks[size].stroke = '-1';
				}}
			>
				<Icon name="settings" class="inline w-6 h-6" />
				{dictionary.clockSettings['Simple Mode']}
			</button>

			<h3>Face</h3>

			<div class="block mb-2">
				<label for="face-fill-select">Face Fill Color:</label>
				<select id="face-fill-select" bind:value={$settings.clock.theme.face.fill}>
					{#each Object.keys(colorPalette) as lightness}
						<option value={lightness}>{lightness}</option>
					{/each}
					<option value="-1">Transparent</option>
				</select>
			</div>
			<div class="block mb-2">
				<label for="face-stroke-select">Face Stroke Color:</label>
				<select id="face-stroke-select" bind:value={$settings.clock.theme.face.stroke}>
					{#each Object.keys(colorPalette) as lightness}
						<option value={lightness}>{lightness}</option>
					{/each}
					<option value="-1">Transparent</option>
				</select>
			</div>
			<div class="block mb-2">
				<label for="face-stroke-width-select">Face Stroke Width:</label>
				<select id="face-stroke-width-select" bind:value={$settings.clock.theme.face.strokeWidth}>
					{#each Array(6) as _, i}
						<option value={i}>{i}</option>
					{/each}
				</select>
			</div>
			<div class="block mb-2">
				<label for="face-shape-select">Face Shape:</label>
				<select id="face-shape-select" bind:value={$settings.clock.theme.face.shape}>
					<option value="circle">Circle</option>
					<option value="rounded">Rounded Square</option>
					<option value="square">Square</option>
				</select>
			</div>

			<h3>Shadow</h3>

			<div class="block mb-2">
				<label for="shadow-fill-select">Shadow Color:</label>
				<select
					id="shadow-fill-select"
					bind:value={$settings.clock.theme.shadow.fill}
					disabled={$settings.clock.theme.face.fill == -1}
				>
					{#each Object.keys(colorPalette) as lightness}
						<option value={lightness}>{lightness}</option>
					{/each}
					<option value="-1">Transparent</option>
				</select>
			</div>

			<h3>Pin</h3>

			<div class="block mb-2">
				<label for="pin-fill-select">Pin Fill Color:</label>
				<select id="pin-fill-select" bind:value={$settings.clock.theme.pin.fill}>
					{#each Object.keys(colorPalette) as lightness}
						<option value={lightness}>{lightness}</option>
					{/each}
					<option value="-1">Transparent</option>
				</select>
			</div>
			<div class="block mb-2">
				<label for="pin-stroke-select">Pin Stroke Color:</label>
				<select id="pin-stroke-select" bind:value={$settings.clock.theme.pin.stroke.lightness}>
					{#each Object.keys(colorPalette) as lightness}
						<option value={lightness}>{lightness}</option>
					{/each}
					<option value="-1">Transparent</option>
				</select>
			</div>
			<div class="block mb-2">
				<label for="pin-stroke-width-select">Pin Stroke Width:</label>
				<select id="pin-stroke-width-select" bind:value={$settings.clock.theme.pin.strokeWidth}>
					{#each Array(7) as _, i}
						<option value={i / 2}>{i / 2}</option>
					{/each}
				</select>
			</div>
			<div class="block mb-2">
				<label for="pin-size-select">Pin Size:</label>
				<select id="pin-size-select" bind:value={$settings.clock.theme.pin.size}>
					{#each Array(6) as _, i}
						<option value={i / 2}>{i / 2}</option>
					{/each}
				</select>
			</div>

			<h3>Ticks</h3>

			{#each ['sm', 'md', 'lg'] as size, i}
				<h5>
					<b>{dictionary[{ sm: 'Small', md: 'Medium', lg: 'Large' }[size]]}</b>
				</h5>
				<div class="block mb-2">
					<label for="{size}-tick-stroke-select">
						{dictionary[{ sm: 'Small', md: 'Medium', lg: 'Large' }[size]]}
						{dictionary['tick stroke color:']}
					</label>
					<select
						id="{size}-tick-stroke-select"
						bind:value={$settings.clock.theme.ticks[size].stroke}
					>
						{#each Object.keys(colorPalette) as lightness}
							<option value={lightness}>{lightness}</option>
						{/each}
						<option value="-1">Transparent</option>
					</select>
				</div>
				<div class="block mb-2">
					<label for="{size}-tick-width-select"
						>{dictionary[{ sm: 'Small', md: 'Medium', lg: 'Large' }[size]]}
						{dictionary['tick width:']}</label
					>
					<select
						id="{size}-tick-width-select"
						bind:value={$settings.clock.theme.ticks[size].width}
					>
						{#each Array(6) as _, i}
							<option value={i}>{i}</option>
						{/each}
					</select>
				</div>
				<div class="block mb-2">
					<label for="{size}-tick-height-select"
						>{dictionary[{ sm: 'Small', md: 'Medium', lg: 'Large' }[size]]}
						{dictionary['tick height:']}</label
					>
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

			<h3>Hands</h3>

			{#each ['hour', 'minute', 'second'] as hand, i}
				<h5>
					<b>{dictionary[{ hour: 'Hour', minute: 'Minute', second: 'Second' }[hand]]}</b>
				</h5>
				<div class="block mb-2">
					<label for="{hand}-hand-stroke-select">
						{dictionary[{ hour: 'Hour', minute: 'Minute', second: 'Second' }[hand]]}
						{dictionary['hand stroke color:']}
					</label>
					<select
						id="{hand}-hand-stroke-select"
						bind:value={$settings.clock.theme.hands[hand].stroke.lightness}
					>
						{#each Object.keys(colorPalette) as lightness}
							<option value={lightness}>{lightness}</option>
						{/each}
						<option value="-1">Transparent</option>
					</select>
				</div>
				<div class="block mb-2">
					<label for="{hand}-hand-stroke-width-select"
						>{dictionary[{ hour: 'Hour', minute: 'Minute', second: 'Second' }[hand]]}
						{dictionary['hand stroke width:']}</label
					>
					<select
						id="{hand}-hand-stroke-width-select"
						bind:value={$settings.clock.theme.hands[hand].strokeWidth}
					>
						{#each Array(6) as _, i}
							<option value={(i + 1) / 2}>{(i + 1) / 2}</option>
						{/each}
					</select>
				</div>
				<div class="block mb-2">
					<label for="{hand}-hand-length-select"
						>{dictionary[{ hour: 'Hour', minute: 'Minute', second: 'Second' }[hand]]}
						{dictionary['hand length:']}</label
					>
					<select
						id="{hand}-hand-length-select"
						bind:value={$settings.clock.theme.hands[hand].length}
					>
						{#each Array(6) as _, i}
							<option value={i * 3 + 12}>{i * 3 + 12}</option>
						{/each}
					</select>
				</div>
				<div class="block mb-2">
					<label for="{hand}-hand-back-select"
						>{dictionary[{ hour: 'Hour', minute: 'Minute', second: 'Second' }[hand]]}
						{dictionary['hand back:']}</label
					>
					<select id="{hand}-hand-back-select" bind:value={$settings.clock.theme.hands[hand].back}>
						{#each Array(9) as _, i}
							<option value={i}>{i}</option>
						{/each}
					</select>
				</div>
				<div class="block mb-2">
					<label for="{hand}-hand-linecap-select"
						>{dictionary[{ hour: 'Hour', minute: 'Minute', second: 'Second' }[hand]]}
						{dictionary['hand linecap:']}</label
					>
					<select
						id="{hand}-hand-linecap-select"
						bind:value={$settings.clock.theme.hands[hand].linecap}
					>
						<option value="butt">Butt</option>
						<option value="round">Round</option>
						<option value="square">Square</option>
					</select>
				</div>
			{/each}
		</AccordionPanel>
	{/if}
	{#if $settings.clock.displays.primary != 'analog' || $settings.clock.displays.secondary != 'none'}
		<AccordionPanel accordionTitle={dictionary.clockSettings['Digital Datetime']} key="3">
			<div class="block mb-2">
				<div class="block mb-2">
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

				<div class="block mb-2">
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
					<label for="datetime-font-weight-select">Datetime Font Weight:</label>
					<select id="datetime-font-weight-select" bind:value={$settings.clock.datetimeFontWeight}>
						{#each fontFamilies[$settings.fontFamily] as weight}
							<option value={weight.toString()}
								>{dictionary.labels['Font Weights'][weight / 100]}</option
							>
						{/each}
					</select>
				{/if}

				<Modal bind:this={datetimeFormatModal} title="Datetime Formatting" icon="table">
					<!-- https://day.js.org/docs/en/display/format -->
					<table>
						<thead>
							<tr><th>Format</th><th>Output</th><th>Description</th></tr>
						</thead>
						<tbody>
							<tr><td>YY</td><td>18</td><td>Two-digit year</td></tr>
							<tr><td>YYYY</td><td>2018</td><td>Four-digit year</td></tr>
							<tr><td>M</td><td>1-12</td><td>The month, beginning at 1</td></tr>
							<tr><td>MM</td><td>01-12</td><td>The month, 2-digits</td></tr>
							<tr><td>MMM</td><td>Jan-Dec</td><td>The abbreviated month name</td></tr>
							<tr><td>MMMM</td><td>January-December</td><td>The full month name</td></tr>
							<tr><td>D</td><td>1-31</td><td>The day of the month</td></tr>
							<tr><td>DD</td><td>01-31</td><td>The day of the month, 2-digits</td></tr>
							<tr><td>d</td><td>0-6</td><td>The day of the week, with Sunday as 0</td></tr>
							<tr><td>dd</td><td>Su-Sa</td><td>The min name of the day of the week</td></tr>
							<tr><td>ddd</td><td>Sun-Sat</td><td>The short name of the day of the week</td></tr>
							<tr><td>dddd</td><td>Sunday-Saturday</td><td>The name of the day of the week</td></tr>
							<tr><td>H</td><td>0-23</td><td>The hour</td></tr>
							<tr><td>HH</td><td>00-23</td><td>The hour, 2-digits</td></tr>
							<tr><td>h</td><td>1-12</td><td>The hour, 12-hour clock</td></tr>
							<tr><td>hh</td><td>01-12</td><td>The hour, 12-hour clock, 2-digits</td></tr>
							<tr><td>m</td><td>0-59</td><td>The minute</td></tr>
							<tr><td>mm</td><td>00-59</td><td>The minute, 2-digits</td></tr>
							<tr><td>s</td><td>0-59</td><td>The second</td></tr>
							<tr><td>ss</td><td>00-59</td><td>The second, 2-digits</td></tr>
							<tr><td>SSS</td><td>000-999</td><td>The millisecond, 3-digits</td></tr>
							<tr><td>Z</td><td>+05:00</td><td>The offset from UTC, ±HH:mm</td></tr>
							<tr><td>ZZ</td><td>+0500</td><td>The offset from UTC, ±HHmm</td></tr>
							<tr><td>A</td><td>AM PM</td><td /></tr>
							<tr><td>a</td><td>am pm</td><td /></tr>
							<tr><td>[text]</td><td>text</td><td>Custom text</td></tr>
						</tbody>
					</table>
					<p>
						Made with <a
							rel="noopener"
							href="https://day.js.org/docs/en/display/format"
							target="_blank">Day JS</a
						>
					</p>
				</Modal>
			</div>
		</AccordionPanel>
	{/if}
</Accordion>
