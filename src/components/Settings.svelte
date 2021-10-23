<script context="module">
	import Screenfull from 'screenfull';

	export function toggleFullscreen() {
		if (Screenfull.isEnabled) {
			Screenfull.toggle();
		}
	}

	export function shareApp() {
		// TODO translate, test on more platforms, store URL in global variable somewhere, in case it changes
		if (navigator.share) {
			navigator
				.share({
					title: 'Desktop Clock',
					text: 'Desktop Clock is a simple, resizable and customizable clock for any device.',
					url: 'https://desktopclock.netlify.app/'
				})
				.then(() => console.log('Successful share'))
				.catch((err) => console.log('Error sharing', err));
		}
	}

	export function copyURL() {
		copyText(window.location.href).then((success) => {
			const message = success ? 'Copied successfully' : 'Failed to copy';
			const type = success ? 'success' : 'error';
			const dismissible = true;
			const timeout = 2000;
			addToast({ message, type, dismissible, timeout });
		});
	}

	// Copies a string to clipboard
	// Uses navigator API if available, else uses execCommand (deprecated)
	// Returns a boolean if copy was successful
	// See: https://stackoverflow.com/q/400212/4907950
	async function copyText(str) {
		console.log('Copying', str);
		if (!navigator.clipboard) {
			// fallback
			let input = document.createElement('textarea');
			input.innerHTML = str;
			document.body.appendChild(input);
			input.focus();
			input.select();
			let result;

			try {
				result = document.execCommand('copy');
				console.log(
					'Fallback: Copying text command was ' + (result ? 'successful' : 'unsuccessful')
				);
			} catch (err) {
				console.error('Fallback: Could not copy text: ', err);
			}
			document.body.removeChild(input);
			return result;
		}
		const result = navigator.clipboard.writeText(str).then(
			function () {
				console.log('Async: Copying to clipboard was successful');
				return true;
			},
			function (err) {
				console.error('Async: Could not copy text: ', err);
				return false;
			}
		);
		return result;
	}

	export function openWindow(url, width = 400, height = 400, left = 20, top = 20) {
		// https://www.w3schools.com/jsref/met_win_open.asp
		let win = window.open(
			url,
			'_blank',
			`width=${width},height=${height},left=${left},top=${top},titlebar=no,toolbar=no,location=no,status=no`,
			false
		);
		win.focus();
	}

	export function validate(input) {
		const min = input.min;
		const max = input.max;
		const val = input.value;

		if (!val.length || isNaN(val) || val == null) return min;
		return Math.max(Math.min(parseInt(val), max), min);
	}
</script>

<script>
	import { session } from '$app/stores';
	import { onMount, onDestroy } from 'svelte';
	import { now } from './now.js';

	onMount(setupCasting);

	import TailwindColors from 'tailwindcss/colors.js';
	import dayjs from 'dayjs';

	import { setupCasting, castClock } from './cast.js';

	import Icon from './Icon.svelte';
	import Toggle from './Toggle.svelte';
	import { Tabs, TabList, TabPanel, Tab } from './tabs.js';
	import ThemeButtons from './ThemeButtons.svelte';
	import Modal from './Modal.svelte';
	import Accordion from './Accordion.svelte';
	import AccordionPanel from './AccordionPanel.svelte';
	import defaultTheme from '../themes/default';
	import defaultNightTheme from '../themes/defaultNight';
	import classicTheme from '../themes/classic';
	import classicNightTheme from '../themes/classicNight';
	import InstallButton from './InstallButton.svelte';
	import Toasts from './Toasts.svelte';
	import { addToast } from './toastStore';
	import timezones from './timezones';

	$: colorPalette = TailwindColors[$session.settings.colorPalette];

	const fontFamilies = {
		Aldrich: [400],
		Arsenal: [400, 700],
		'Bai Jamjuree': [300, 500, 700],
		Bitter: [300, 500, 700],
		Comfortaa: [300, 400, 500, 600, 700],
		'Josefin Sans': [300, 500, 700],
		'Julius Sans One': [400],
		Jura: [300, 500, 700],
		K2D: [300, 500, 700],
		KoHo: [300, 500, 700],
		'Libre Baskerville': [400, 700],
		Limelight: [400],
		'Major Mono Display': [400],
		'Montserrat Alternates': [300, 600, 900],
		Orbitron: [400, 600, 800],
		'Yatra One': [300, 500, 700]
	};

	const locales = [
		'af',
		'am',
		'ar',
		'az',
		'be',
		'bg',
		'bi',
		'bm',
		'bn',
		'bo',
		'br',
		'bs',
		'ca',
		'cs',
		'cv',
		'cy',
		'da',
		'de',
		'dv',
		'el',
		'en',
		'eo',
		'es',
		'eu',
		'fa',
		'fi',
		'fo',
		'fr',
		'fy',
		'ga',
		'gd',
		'gl',
		'gu',
		'he',
		'hi',
		'hr',
		'ht',
		'hu',
		'id',
		'is',
		'it',
		'ja',
		'jv',
		'ka',
		'kk',
		'km',
		'kn',
		'ko',
		'ku',
		'ky',
		'lb',
		'lo',
		'lt',
		'lv',
		'me',
		'mi',
		'mk',
		'ml',
		'mn',
		'mr',
		'ms',
		'mt',
		'my',
		'nb',
		'ne',
		'nl',
		'nn',
		'pl',
		'pt',
		'ro',
		'ru',
		'rw',
		'sd',
		'se',
		'si',
		'sk',
		'sl',
		'sq',
		'sr',
		'ss',
		'sv',
		'sw',
		'ta',
		'te',
		'tet',
		'tg',
		'th',
		'tk',
		'tlh',
		'tr',
		'tzl',
		'tzm',
		'uk',
		'ur',
		'uz',
		'vi',
		'yo',
		'zh',
		'et'
	];

	let datetimeFormatModal;
</script>

<Tabs>
	<TabList>
		<Tab>
			<Icon name="clock" class="inline w-6 h-6 mr-1 md:w-0 md:h-0 lg:w-6 lg:h-6" />
			Clock
		</Tab>
		<Tab>
			<Icon name="eye" class="inline w-6 h-6 mr-1 md:w-0 md:h-0 lg:w-6 lg:h-6" />
			Appearance
		</Tab>
		<Tab>
			<Icon name="application" class="inline w-6 h-6 mr-1 md:w-0 md:h-0 lg:w-6 lg:h-6" />
			General
		</Tab>
		<Tab>
			<Icon name="info" class="inline w-6 h-6 mr-1 md:w-0 md:h-0 lg:w-6 lg:h-6" />
			About
		</Tab>
	</TabList>

	<!-- Clock -->
	<TabPanel>
		<Accordion key="3">
			<AccordionPanel accordionTitle="Displays" key="3">
				<div class="block mb-2">
					<label for="primary-display-select">Primary Display:</label>
					<select id="primary-display-select" bind:value={$session.settings.clock.displays.primary}>
						<option value="analog">Analog Clock</option>
						<option value="time">Digital Time</option>
						<option value="date">Date</option>
						<option value="datetime">Date + Digital Time</option>
					</select>
				</div>

				<div class="block mb-2">
					<label for="secondary-display-select">Secondary Display:</label>
					<select
						id="secondary-display-select"
						bind:value={$session.settings.clock.displays.secondary}
					>
						<option value="time">Digital Time</option>
						<option value="date">Date</option>
						<option value="datetime">Date + Digital Time</option>
						<option value="none">None</option>
					</select>
				</div>

				<div class="block mb-2">
					<Toggle
						id="show-battery-toggle"
						bind:checked={$session.settings.clock.displays.battery}
						labelText="Show battery"
					/>
				</div>
			</AccordionPanel>
			{#if $session.settings.clock.displays.primary == 'analog'}
				<AccordionPanel accordionTitle="Analog" key="4">
					<!-- note: using json for efficient deep clone so original theme object is not mutated -->
					<button
						class="btn theme-btn block"
						on:click={() =>
							($session.settings.clock.theme = JSON.parse(JSON.stringify(defaultTheme)))}
					>
						<Icon name="theme" class="inline w-6 h-6" />
						Default Theme
					</button>
					<button
						class="btn theme-btn block"
						on:click={() =>
							($session.settings.clock.theme = JSON.parse(JSON.stringify(defaultNightTheme)))}
					>
						<Icon name="theme" class="inline w-6 h-6" />
						Default Night Theme
					</button>
					<button
						class="btn theme-btn block"
						on:click={() =>
							($session.settings.clock.theme = JSON.parse(JSON.stringify(classicTheme)))}
					>
						<Icon name="theme" class="inline w-6 h-6" />
						Classic Theme
					</button>
					<button
						class="btn theme-btn block"
						on:click={() =>
							($session.settings.clock.theme = JSON.parse(JSON.stringify(classicNightTheme)))}
					>
						<Icon name="theme" class="inline w-6 h-6" />
						Classic Night Theme
					</button>
					<button
						class="btn theme-btn block"
						on:click={() => {
							for (const size of 'sm md lg'.split(' '))
								$session.settings.clock.theme.ticks[size].stroke = '-1';
						}}
					>
						<Icon name="settings" class="inline w-6 h-6" />
						Simple Mode
					</button>

					<h3>Face</h3>

					<div class="block mb-2">
						<label for="face-fill-select">Face Fill Color:</label>
						<select id="face-fill-select" bind:value={$session.settings.clock.theme.face.fill}>
							{#each Object.keys(colorPalette) as lightness}
								<option value={lightness}>{lightness}</option>
							{/each}
							<option value="-1">Transparent</option>
						</select>
					</div>
					<div class="block mb-2">
						<label for="face-stroke-select">Face Stroke Color:</label>
						<select id="face-stroke-select" bind:value={$session.settings.clock.theme.face.stroke}>
							{#each Object.keys(colorPalette) as lightness}
								<option value={lightness}>{lightness}</option>
							{/each}
							<option value="-1">Transparent</option>
						</select>
					</div>
					<div class="block mb-2">
						<label for="face-stroke-width-select">Face Stroke Width:</label>
						<select
							id="face-stroke-width-select"
							bind:value={$session.settings.clock.theme.face.strokeWidth}
						>
							{#each Array(6) as _, i}
								<option value={i}>{i}</option>
							{/each}
						</select>
					</div>
					<div class="block mb-2">
						<label for="face-shape-select">Face Shape:</label>
						<select id="face-shape-select" bind:value={$session.settings.clock.theme.face.shape}>
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
							bind:value={$session.settings.clock.theme.shadow.fill}
							disabled={$session.settings.clock.theme.face.fill == -1}
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
						<select id="pin-fill-select" bind:value={$session.settings.clock.theme.pin.fill}>
							{#each Object.keys(colorPalette) as lightness}
								<option value={lightness}>{lightness}</option>
							{/each}
							<option value="-1">Transparent</option>
						</select>
					</div>
					<div class="block mb-2">
						<label for="pin-stroke-select">Pin Stroke Color:</label>
						<select
							id="pin-stroke-select"
							bind:value={$session.settings.clock.theme.pin.stroke.lightness}
						>
							{#each Object.keys(colorPalette) as lightness}
								<option value={lightness}>{lightness}</option>
							{/each}
							<option value="-1">Transparent</option>
						</select>
					</div>
					<div class="block mb-2">
						<label for="pin-stroke-width-select">Pin Stroke Width:</label>
						<select
							id="pin-stroke-width-select"
							bind:value={$session.settings.clock.theme.pin.strokeWidth}
						>
							{#each Array(7) as _, i}
								<option value={i / 2}>{i / 2}</option>
							{/each}
						</select>
					</div>
					<div class="block mb-2">
						<label for="pin-size-select">Pin Size:</label>
						<select id="pin-size-select" bind:value={$session.settings.clock.theme.pin.size}>
							{#each Array(6) as _, i}
								<option value={i / 2}>{i / 2}</option>
							{/each}
						</select>
					</div>

					<h3>Ticks</h3>

					{#each ['sm', 'md', 'lg'] as size, i}
						<h5>
							<b>{$session.languageDictionary[{ sm: 'Small', md: 'Medium', lg: 'Large' }[size]]}</b>
						</h5>
						<div class="block mb-2">
							<label for="{size}-tick-stroke-select">
								{$session.languageDictionary[{ sm: 'Small', md: 'Medium', lg: 'Large' }[size]]}
								{$session.languageDictionary['Tick Stroke Color:']}
							</label>
							<select
								id="{size}-tick-stroke-select"
								bind:value={$session.settings.clock.theme.ticks[size].stroke}
							>
								{#each Object.keys(colorPalette) as lightness}
									<option value={lightness}>{lightness}</option>
								{/each}
								<option value="-1">Transparent</option>
							</select>
						</div>
						<div class="block mb-2">
							<label for="{size}-tick-width-select"
								>{$session.languageDictionary[{ sm: 'Small', md: 'Medium', lg: 'Large' }[size]]}
								{$session.languageDictionary['Tick Width:']}</label
							>
							<select
								id="{size}-tick-width-select"
								bind:value={$session.settings.clock.theme.ticks[size].width}
							>
								{#each Array(6) as _, i}
									<option value={i}>{i}</option>
								{/each}
							</select>
						</div>
						<div class="block mb-2">
							<label for="{size}-tick-height-select"
								>{$session.languageDictionary[{ sm: 'Small', md: 'Medium', lg: 'Large' }[size]]}
								{$session.languageDictionary['Tick Height:']}</label
							>
							<select
								id="{size}-tick-height-select"
								bind:value={$session.settings.clock.theme.ticks[size].height}
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
							<b
								>{$session.languageDictionary[
									{ hour: 'Hour', minute: 'Minute', second: 'Second' }[hand]
								]}</b
							>
						</h5>
						<div class="block mb-2">
							<label for="{hand}-hand-stroke-select">
								{$session.languageDictionary[
									{ hour: 'Hour', minute: 'Minute', second: 'Second' }[hand]
								]}
								{$session.languageDictionary['Hand Stroke Color:']}
							</label>
							<select
								id="{hand}-hand-stroke-select"
								bind:value={$session.settings.clock.theme.hands[hand].stroke.lightness}
							>
								{#each Object.keys(colorPalette) as lightness}
									<option value={lightness}>{lightness}</option>
								{/each}
								<option value="-1">Transparent</option>
							</select>
						</div>
						<div class="block mb-2">
							<label for="{hand}-hand-stroke-width-select"
								>{$session.languageDictionary[
									{ hour: 'Hour', minute: 'Minute', second: 'Second' }[hand]
								]}
								{$session.languageDictionary['Hand Stroke Width:']}</label
							>
							<select
								id="{hand}-hand-stroke-width-select"
								bind:value={$session.settings.clock.theme.hands[hand].strokeWidth}
							>
								{#each Array(6) as _, i}
									<option value={(i + 1) / 2}>{(i + 1) / 2}</option>
								{/each}
							</select>
						</div>
						<div class="block mb-2">
							<label for="{hand}-hand-length-select"
								>{$session.languageDictionary[
									{ hour: 'Hour', minute: 'Minute', second: 'Second' }[hand]
								]}
								{$session.languageDictionary['Hand Length:']}</label
							>
							<select
								id="{hand}-hand-length-select"
								bind:value={$session.settings.clock.theme.hands[hand].length}
							>
								{#each Array(6) as _, i}
									<option value={i * 3 + 12}>{i * 3 + 12}</option>
								{/each}
							</select>
						</div>
						<div class="block mb-2">
							<label for="{hand}-hand-back-select"
								>{$session.languageDictionary[
									{ hour: 'Hour', minute: 'Minute', second: 'Second' }[hand]
								]}
								{$session.languageDictionary['Hand Back:']}</label
							>
							<select
								id="{hand}-hand-back-select"
								bind:value={$session.settings.clock.theme.hands[hand].back}
							>
								{#each Array(9) as _, i}
									<option value={i}>{i}</option>
								{/each}
							</select>
						</div>
						<div class="block mb-2">
							<label for="{hand}-hand-linecap-select"
								>{$session.languageDictionary[
									{ hour: 'Hour', minute: 'Minute', second: 'Second' }[hand]
								]}
								{$session.languageDictionary['Hand Linecap:']}</label
							>
							<select
								id="{hand}-hand-linecap-select"
								bind:value={$session.settings.clock.theme.hands[hand].linecap}
							>
								<option value="butt">Butt</option>
								<option value="round">Round</option>
								<option value="square">Square</option>
							</select>
						</div>
					{/each}
				</AccordionPanel>
			{/if}
			{#if $session.settings.clock.displays.primary != 'analog' || $session.settings.clock.displays.secondary != 'none'}
				<AccordionPanel accordionTitle="Digital Datetime" key="5">
					<div class="block mb-2">
						<div class="block mb-2">
							<label for="time-format-select">Time Format:</label>
							<select id="time-format-select" bind:value={$session.settings.clock.timeFormat}>
								{#each ['H:mm', 'H:mm:ss', 'h:mm A', 'h:mm:ss A', 'H:mm Z', 'H:mm:ss Z', 'h:mm A Z', 'h:mm:ss A Z', 'mm:ss'] as timeFormat}
									<option value={timeFormat}
										>{new dayjs($now)
											.tz($session.settings.locale.timezone)
											.locale($session.settings.locale.datetime)
											.format(timeFormat)}</option
									>
								{/each}
								<option value="custom">Custom</option>
							</select>
							{#if $session.settings.clock.timeFormat === 'custom'}
								<div class="my-2 ml-8">
									<input
										type="text"
										spellcheck="false"
										class="block my-2"
										bind:value={$session.settings.clock.timeFormatCustom}
									/>
									<p>
										<b>Preview:</b>
										{new dayjs($now)
											.tz($session.settings.locale.timezone)
											.locale($session.settings.locale.datetime)
											.format($session.settings.clock.timeFormatCustom)}
									</p>
								</div>
							{/if}
						</div>

						<div class="block mb-2">
							<label for="date-format-select">Date Format:</label>
							<select id="date-format-select" bind:value={$session.settings.clock.dateFormat}>
								{#each ['MMM D', 'MMM D YYYY', 'ddd, MMMM D', 'ddd, MMMM D YYYY', 'D MMM', 'D MMM YYYY', 'ddd, D MMM', 'ddd, D MMM YYYY'] as dateFormat}
									<option value={dateFormat}
										>{new dayjs($now)
											.tz($session.settings.locale.timezone)
											.locale($session.settings.locale.datetime)
											.format(dateFormat)}</option
									>
								{/each}
								<option value="custom">Custom</option>
							</select>
							{#if $session.settings.clock.dateFormat === 'custom'}
								<div class="my-2 ml-8">
									<input
										type="text"
										spellcheck="false"
										class="block my-2"
										bind:value={$session.settings.clock.dateFormatCustom}
									/>
									<p>
										<b>Preview:</b>
										{new dayjs($now)
											.tz($session.settings.locale.timezone)
											.locale($session.settings.locale.datetime)
											.format($session.settings.clock.dateFormatCustom)}
									</p>
								</div>
							{/if}
						</div>

						{#if $session.settings.clock.dateFormat === 'custom' || $session.settings.clock.timeFormat === 'custom'}
							<button class="btn block my-2" on:click={datetimeFormatModal.show()}
								>Custom Formatting Reference</button
							>
						{/if}

						<button
							class="btn undo-btn block"
							on:click={() => {
								for (const format of 'timeFormat timeFormatCustom dateFormat dateFormatCustom'.split(
									' '
								))
									$session.settings.clock[format] = $session.defaultSettings.clock[format];
							}}
						>
							<Icon name="undo" class="inline w-6 h-6" />
							Reset Digital Datetime Formats
						</button>

						{#if $session.settings.clock.displays.primary != 'analog' && fontFamilies[$session.settings.fontFamily].length > 1}
							<label for="datetime-font-weight-select">Datetime Font Weight:</label>
							<select
								id="datetime-font-weight-select"
								bind:value={$session.settings.clock.datetimeFontWeight}
							>
								{#each fontFamilies[$session.settings.fontFamily] as weight}
									<option value={weight.toString()}>{weight.toString()}</option>
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
									<tr><td>ddd</td><td>Sun-Sat</td><td>The short name of the day of the week</td></tr
									>
									<tr
										><td>dddd</td><td>Sunday-Saturday</td><td>The name of the day of the week</td
										></tr
									>
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
								Made with <a href="https://day.js.org/docs/en/display/format" target="_blank"
									>Day JS</a
								>
							</p>
						</Modal>
					</div>
				</AccordionPanel>
			{/if}
		</Accordion>
	</TabPanel>

	<!-- Appearance -->
	<TabPanel>
		<!-- should theme, dark, cast, fullscreen btns be in general? -->
		<div class="mb-2">
			<ThemeButtons />
		</div>
		<div class="block mb-2">
			<button
				class="dark-btn btn"
				on:click={() => ($session.settings.darkMode = !$session.settings.darkMode)}
			>
				<Icon name="moon" class="inline w-6 h-6 md:w-8 md:h-8" />
				Dark
			</button>

			<button class="cast-btn btn" on:click={castClock}>
				<Icon name="cast" class="inline w-6 h-6 md:w-8 md:h-8" />
				Cast
			</button>

			<button class="fullscreen-btn btn" on:click={toggleFullscreen}>
				<Icon name="fullscreen" class="inline w-6 h-6 md:w-8 md:h-8" />
				Fullscreen
			</button>
		</div>

		<Toggle
			id="show-dark-btn-toggle"
			bind:checked={$session.settings.showDarkButton}
			labelText="Show dark button"
		/>

		<br />

		<Toggle
			id="show-cast-btn-toggle"
			bind:checked={$session.settings.showCastButton}
			labelText="Show cast button"
		/>

		<br />

		<Toggle
			id="show-fullscreen-btn-toggle"
			bind:checked={$session.settings.showFullscreenButton}
			labelText="Show fullscreen button"
		/>

		<br />

		<Toggle
			id="show-theme-btn-toggle"
			bind:checked={$session.settings.showThemeButtons}
			labelText="Show theme buttons"
		/>

		<br />

		<Toggle
			id="smaller-menu-toggle"
			bind:checked={$session.settings.smallerMenu}
			labelText="Smaller menu"
		/>

		<br />

		<!-- TODO: only display option if on larger screens -->
		<Toggle
			id="always-collapse-menu-toggle"
			bind:checked={$session.settings.alwaysCollapseMenu}
			labelText="Always collapse menu"
		/>

		<br />

		<Toggle
			id="hide-titlebar-when-idle-toggle"
			bind:checked={$session.settings.hideTitlebarWhenIdle}
			labelText="Hide title bar when idle"
		/>

		{#if $session.settings.hideTitlebarWhenIdle}
			<div class="my-2 ml-8">
				<label for="seconds-until-idle-input">Seconds until idle:</label>
				<input
					id="seconds-until-idle-input"
					on:input|preventDefault={(event) => {
						const value = validate(event.target);
						$session.settings.secondsUntilIdle = value;
						event.target.value = value;
					}}
					value={$session.settings.secondsUntilIdle}
					type="number"
					min="1"
					max="1000"
					required
				/>
			</div>
		{/if}

		<br />
		<label for="font-family-select">Font Family:</label>
		<select
			id="font-family-select"
			bind:value={$session.settings.fontFamily}
			on:change={(e) => {
				const family = e.target.value;
				const weight = $session.settings.clock.datetimeFontWeight;
				// if selected font does not have selected weight
				if (fontFamilies[family].indexOf(weight) == -1) {
					// default to first listed weight
					$session.settings.clock.datetimeFontWeight = fontFamilies[family][0].toString();
				}
			}}
		>
			{#each Object.keys(fontFamilies) as fontFamily}
				<option value={fontFamily} style="font-family:{fontFamily}">{fontFamily}</option>
			{/each}
		</select>
		<button
			class="btn undo-btn block"
			on:click={() => {
				for (const option of 'colorPalette darkMode showDarkButton showCastButton showFullscreenButton showThemeButtons smallerMenu alwaysCollapseMenu hideTitlebarWhenIdle secondsUntilIdle fontFamily'.split(
					' '
				))
					$session.settings[option] = $session.defaultSettings[option];

				// auto detect user device preferences (same code as in layout)
				$session.settings.darkMode = !!window.matchMedia('(prefers-color-scheme: dark)').matches;
			}}
		>
			<Icon name="undo" class="inline w-6 h-6" />
			Reset Appearance Settings
		</button>
	</TabPanel>

	<!-- General -->
	<TabPanel>
		<Accordion key="1">
			<AccordionPanel accordionTitle="Application" key="1">
				<!-- <button class="btn">Download Settings</button> -->
				<!-- <button class="btn">Upload Settings</button> -->

				<button class="btn share-btn" on:click={shareApp}>
					<Icon name="share" class="inline w-6 h-6" />
					Share
				</button>
				<button class="btn link-btn" on:click={copyURL}>
					<Icon name="link" class="inline w-6 h-6" />
					Copy Website Link
				</button>

				<br />

				<InstallButton class="btn" />
				<button class="btn external-link-btn" on:click={() => openWindow(window.location.href)}>
					<Icon name="external-link" class="inline w-6 h-6" />
					Open Another Clock
				</button>
				<button
					class="btn"
					on:click={() =>
						window.open('mailto:contact@justingolden.me?subject=Desktop+Clock+Feedback')}
				>
					<Icon name="envelope" class="inline w-6 h-6" />
					Send Feedback
				</button>

				<br />

				<button
					class="btn undo-btn"
					on:click={() => {
						$session.settings = JSON.parse(JSON.stringify($session.defaultSettings));

						// auto detect user device preferences (same code as in layout)
						$session.settings.darkMode = !!window.matchMedia('(prefers-color-scheme: dark)')
							.matches;
						$session.settings.locale.language = Intl.DateTimeFormat().resolvedOptions().locale;
						$session.settings.locale.datetime = Intl.DateTimeFormat()
							.resolvedOptions()
							.locale.substring(0, 2);
						$session.settings.locale.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
					}}
				>
					<Icon name="undo" class="inline w-6 h-6" />
					Reset All Settings
				</button>

				<!-- <h3>Advanced</h3>
        		<button class="btn">Multiple Clock Settings</button>
		        <button class="btn">Quick Resize Settings</button> -->
			</AccordionPanel>
			<AccordionPanel accordionTitle="Shortcuts" key="2">
				<div class="block mb-2">
					<Toggle
						id="dbl-click-fullscreen-toggle"
						labelText={$session.languageDictionary['Doubleclick Fullscreen']}
						bind:checked={$session.settings.doubleclickFullscreen}
					/>
				</div>
				<div class="block mb-2">
					<Toggle
						id="keyboard-shortcuts-toggle"
						labelText="Keyboard Shortcuts"
						bind:checked={$session.settings.keyboardShortcuts}
					/>
				</div>
				<button class="btn">
					<Icon name="table" class="inline w-6 h-6" />
					View Keyboard Shortcuts
				</button>
				<!-- <button class="btn undo-btn block">
					<Icon name="undo" class="inline w-6 h-6" />
					Reset Keyboard Shortcuts
				</button> -->
			</AccordionPanel>
			<AccordionPanel accordionTitle="Locale" key="3">
				<div class="block mb-2">
					<label for="language-select">Language:</label>
					<select
						id="language-select"
						disabled={$session.settings.locale.automaticLanguage}
						bind:value={$session.settings.locale.language}
					>
						<option value="en-US">English, US</option>
						<option value="en-GB">English, GB</option>
						<option value="es-MX">Spanish, MX</option>
						<option value="es-SP">Spanish, SP</option>
					</select>
					<br class="block lg:hidden" />
					<Toggle
						id="auto-detect-language-toggle"
						labelText="Automatically Detect Language"
						bind:checked={$session.settings.locale.automaticLanguage}
						on:change={(e) => {
							if (e.target.checked) {
								// same code as layout, reset to user device default
								$session.settings.locale.language = Intl.DateTimeFormat().resolvedOptions().locale;
							}
						}}
					/>
				</div>
				<div class="block mb-2">
					<label for="datetime-locale-select">Datetime Locale:</label>
					<select
						id="datetime-locale-select"
						disabled={$session.settings.locale.automaticDatetime}
						bind:value={$session.settings.locale.datetime}
					>
						{#each locales as locale}
							<option value={locale}>{locale}</option>
						{/each}
					</select>
					<br class="block lg:hidden" />
					<Toggle
						id="auto-detect-datetime-locale-toggle"
						labelText="Automatically Detect Datetime Locale"
						bind:checked={$session.settings.locale.automaticDatetime}
						on:change={(e) => {
							if (e.target.checked) {
								// same code as layout, reset to user device default
								$session.settings.locale.datetime = Intl.DateTimeFormat()
									.resolvedOptions()
									.locale.substring(0, 2);
							}
						}}
					/>
				</div>
				<!-- todo: display gmt offset to the side -->
				<!-- todo: search input that finds results containing that string in below select -->
				<!-- options should look something like "Pacific Daylight Time (GMT-7) Los Angeles, CA" -->
				<div class="block mb-2">
					<label for="timezone-select">Timezone:</label>
					<select
						id="timezone-select"
						disabled={$session.settings.locale.automaticTimezone}
						bind:value={$session.settings.locale.timezone}
					>
						{#each Object.keys(timezones) as zone}
							<optgroup label={zone}>
								{#each timezones[zone] as tz}
									<option value={zone + '/' + tz}>{(zone + '/' + tz).split('_').join(' ')}</option>
								{/each}
							</optgroup>
						{/each}
					</select>
					<br class="block lg:hidden" />
					<Toggle
						id="auto-detect-timezone-toggle"
						labelText="Automatically Detect Timezone"
						bind:checked={$session.settings.locale.automaticTimezone}
						on:change={(e) => {
							if (e.target.checked) {
								// same code as layout, reset to user device default
								$session.settings.locale.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
							}
						}}
					/>
					<!-- TODO: btn to reset all locale settings, onclick toggles all auto to on which resets others -->
				</div>
			</AccordionPanel>
		</Accordion>
	</TabPanel>

	<!-- About -->
	<TabPanel>
		<h3>About</h3>
		<p>
			Desktop Clock is a simple, resizable and customizable clock for any device. Features include
			customizable analog and digital displays, night mode, and more. Desktop Clock is designed to
			scale perfectly to any screen size and ratio, with no distortion or pixelation. Use Desktop
			Clock as a clock on your TV, a night clock, or even project the time for exams. Use the timers
			for anything from chess to cooking! Customize the time, date and more to your liking!
		</p>
		<p>
			If you like this app, consider <button class="font-bold hover:underline" on:click={shareApp}
				>sharing</button
			> it
		</p>
		<p class="mt-2">Version 0.0.0</p>

		<h3>Help</h3>
		<p>Coming Soon...</p>

		<h3>Contact</h3>
		<p>
			Made by
			<a href="https://justingolden.me" target="_blank">Justin Golden</a>. Feel free to contact me
			with any feedback, questions, or requests at
			<a href="mailto:contact@justingolden.me?subject=Desktop+Clock" target="_blank"
				>contact@justingolden.me</a
			>.
		</p>
	</TabPanel>
</Tabs>

<Toasts />
