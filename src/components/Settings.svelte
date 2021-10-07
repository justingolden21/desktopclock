<script context="module">
	import Screenfull from 'screenfull';

	export function toggleFullscreen() {
		if (Screenfull.isEnabled) {
			Screenfull.toggle();
		}
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
</script>

<script>
	import { session } from '$app/stores';
	import { onMount, onDestroy } from 'svelte';

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

	$: colorPalette = TailwindColors[$session.settings.colorPalette];

	const fontFamilies = [
		'Aldrich',
		'Arsenal',
		'Bai Jamjuree',
		'Bitter',
		'Josefin Sans',
		'Julius Sans One',
		'Jura',
		'K2D',
		'KoHo',
		'Libre Baskerville',
		'Limelight',
		'Major Mono Display',
		'Montserrat Alternates',
		'Orbitron',
		'Yatra One'
	].sort();

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

	let currentDetail = 0;

	// --------

	let dateInterval;
	let now = new Date();

	onMount(() => {
		dateInterval = setInterval(() => {
			now = new Date();
		}, 1000);
	});
	onDestroy(() => clearInterval(dateInterval));

	// --------

	let datetimeFormatModal;
</script>

<!-- TODO settings modal content synced with settings
TODO communicate with display component to update display reactively -->

<Tabs>
	<TabList>
		<Tab>General</Tab>
		<Tab>Application</Tab>
		<Tab>Clock</Tab>
		<Tab>Help</Tab>
	</TabList>

	<!-- General -->
	<TabPanel>
		<Accordion>
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
					<Icon name="external-link" class="inline w-6 h-6 md:w-8 md:h-8" />
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

			<label for="font-family-select">Font Family:</label>
			<select id="font-family-select" bind:value={$session.settings.fontFamily}>
				{#each fontFamilies as fontFamily}
					<option value={fontFamily} style="font-family:{fontFamily}">{fontFamily}</option>
				{/each}
			</select>
		</Accordion>
		<div class="details">
			<p
				class="summary"
				on:click={() => {
					if (currentDetail == 1) currentDetail = -1;
					else currentDetail = 1;
				}}
			>
				Shortcuts
			</p>
			<div class="details-content" class:open={currentDetail === 1}>
				<div class="block mb-2">
					<Toggle
						id="dbl-click-fullscreen-toggle"
						labelText={$session.languageDictionary['Doubleclick Fullscreen']}
						bind:checked={$session.settings.doubleclickFullscreen}
					/>
				</div>
				<div class="block mb-2">
					<Toggle id="keyboard-shortcuts-toggle" checked={true} labelText="Keyboard Shortcuts" />
				</div>
				<button class="btn">View Keyboard Shortcuts</button>
				<button class="btn">Reset Keyboard Shortcuts</button>
			</div>
		</div>
	</TabPanel>

	<!-- Application -->
	<TabPanel>
		<h3>Locale</h3>
		<div class="block mb-2">
			<label for="language-select">Language:</label>
			<select id="language-select">
				<option value="en-us">English, US</option>
				<option value="en-gb">English, GB</option>
				<option value="es-mx">Spanish, MX</option>
				<option value="es-sp">Spanish, SP</option>
			</select>
		</div>
		<div class="block mb-2">
			<label for="datetime-locale-select">Datetime Locale:</label>
			<select id="datetime-locale-select">
				<option>en</option>
				<option>es</option>
				<option>de-DE</option>
				<option>ar-EG</option>
			</select>
		</div>
		<!-- todo: autocomplete type timezones -->
		<div class="block mb-2">
			<label for="timezone-select">Timezone:</label>
			<select id="timezone-select">
				<option> Pacific Daylight Time (GMT-7) Los Angeles, CA </option>
			</select>
		</div>

		<h3>Settings</h3>
		<button class="btn">Reset Settings</button>
		<button class="btn">Download Settings</button>
		<button class="btn">Upload Settings</button>

		<h3>App</h3>
		<button class="btn" on:click={() => openWindow(window.location.href)}>Open Another Clock</button
		>
		<button class="btn">Share</button>
		<button class="btn">Send Feedback</button>
		<button class="btn">Pop Out</button>
		<button class="btn">Install</button>

		<h3>Advanced</h3>
		<button class="btn">Multiple Clock Settings</button>
		<button class="btn">Quick Resize Settings</button>

		<p>V. 0.0.0</p>
	</TabPanel>

	<!-- Clock -->
	<TabPanel>
		<div class="details">
			<p
				class="summary"
				on:click={() => {
					if (currentDetail == 2) currentDetail = -1;
					else currentDetail = 2;
				}}
			>
				Displays
			</p>
			<div class="details-content" class:open={currentDetail === 2}>
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
			</div>
		</div>
		{#if $session.settings.clock.displays.primary == 'analog'}
			<div class="details">
				<p
					class="summary"
					on:click={() => {
						if (currentDetail == 3) currentDetail = -1;
						else currentDetail = 3;
					}}
				>
					Analog
				</p>
				<div class="details-content" class:open={currentDetail === 3}>
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
						<select id="pin-stroke-select" bind:value={$session.settings.clock.theme.pin.stroke}>
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
								<option value={i}>{i}</option>
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
								{#each Array(6) as _, i}
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
				</div>
			</div>
		{/if}
		{#if $session.settings.clock.displays.primary != 'analog' || $session.settings.clock.displays.secondary != 'none'}
			<div class="details">
				<p
					class="summary"
					on:click={() => {
						if (currentDetail == 4) currentDetail = -1;
						else currentDetail = 4;
					}}
				>
					Digital Datetime
				</p>
				<div class="details-content" class:open={currentDetail === 4}>
					<div class="block mb-2">
						<div class="block mb-2">
							<label for="time-format-select">Time Format:</label>
							<select id="time-format-select" bind:value={$session.settings.clock.timeFormat}>
								{#each ['HH:mm', 'HH:mm:ss', 'hh:mm', 'hh:mm:ss', 'hh:mm A', 'hh:mm:ss A', 'mm:ss'] as timeFormat}
									<option value={timeFormat}>{new dayjs(now).format(timeFormat)}</option>
								{/each}
								<option value="custom">Custom</option>
							</select>
							{#if $session.settings.clock.timeFormat === 'custom'}
								<input
									type="text"
									spellcheck="false"
									bind:value={$session.settings.clock.timeFormatCustom}
								/>
								<p>
									<b>Preview:</b>
									{new dayjs(now).format($session.settings.clock.timeFormatCustom)}
								</p>
							{/if}
						</div>

						<div class="block mb-2">
							<label for="date-format-select">Date Format:</label>
							<select id="date-format-select" bind:value={$session.settings.clock.dateFormat}>
								{#each ['MMM D', 'MMM D YYYY', 'ddd, MMMM D', 'ddd, MMMM D YYYY', 'D MMM', 'D MMM YYYY', 'ddd, D MMM', 'ddd, D MMM YYYY'] as dateFormat}
									<option value={dateFormat}
										>{new dayjs(now)
											.locale($session.settings.clock.datetimeLocale)
											.format(dateFormat)}</option
									>
								{/each}
								<option value="custom">Custom</option>
							</select>
							{#if $session.settings.clock.dateFormat === 'custom'}
								<input
									type="text"
									spellcheck="false"
									bind:value={$session.settings.clock.dateFormatCustom}
								/>
								<p>
									<b>Preview:</b>
									{new dayjs(now)
										.locale($session.settings.clock.datetimeLocale)
										.format($session.settings.clock.dateFormatCustom)}
								</p>
							{/if}
						</div>

						<label for="datetime-locale-select">Datetime Locale:</label>
						<select id="datetime-locale-select" bind:value={$session.settings.clock.datetimeLocale}>
							{#each locales as locale}
								<option value={locale}>{locale}</option>
							{/each}
						</select>

						<button class="btn" on:click={datetimeFormatModal.show()}
							>Custom Formatting Reference</button
						>
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
								</tbody>
							</table>
							<p>
								Made with <a href="https://day.js.org/docs/en/display/format" target="_blank"
									>Day JS</a
								>
							</p>
						</Modal>

						<!-- TODO -->
						<!-- <div class="block mb-2">
							<label for="locale-select">Locale:</label>
							<select disabled id="locale-select">
								<option> EN-US Los Angeles, CA, USA </option>
							</select>
						</div>
						<Toggle
							id="auto-locale-toggle"
							checked={true}
							labelText="Automatically Detect Locale"
						/> -->
					</div>
				</div>
			</div>
		{/if}
	</TabPanel>

	<!-- Help -->
	<TabPanel>
		<p>Coming soon. . .</p>
	</TabPanel>
</Tabs>

<style>
</style>
