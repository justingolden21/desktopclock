<script context="module">
	import Screenfull from 'screenfull';

	export function toggleFullscreen() {
		if (Screenfull.isEnabled) {
			Screenfull.toggle();
		}
	}
</script>

<script>
	import { session } from '$app/stores';

	import TailwindColors from 'tailwindcss/colors';

	import Icon from './Icon.svelte';
	import Toggle from './Toggle.svelte';
	import { Tabs, TabList, TabPanel, Tab } from './tabs.js';

	$: colorPalette = TailwindColors[$session.settings.colorPalette];

	let currentDetail = 0;
</script>

<!-- TODO settings modal content synced with settings
TODO communicate with display component to update display reactively -->

<Tabs>
	<TabList>
		<Tab>Appearance</Tab>
		<Tab>User</Tab>
		<Tab>Application</Tab>
		<Tab>Help</Tab>
	</TabList>

	<!-- Appearance -->
	<TabPanel>
		<div class="details">
			<p
				class="summary"
				on:click={() => {
					if (currentDetail == 0) currentDetail = -1;
					else currentDetail = 0;
				}}
			>
				General
			</p>
			<div class="details-content" class:open={currentDetail === 0}>
				<div class="mb-2">
					<!-- Remove first 2 items from array (black and white). They do not have themes. -->
					{#each Object.keys(TailwindColors).slice(2) as color, colorIndex}
						<button
							class="theme-btn"
							style="background-color: {TailwindColors[color][300]}"
							on:click={() => ($session.settings.colorPalette = color)}
						/>
					{/each}
				</div>
				<div class="block mb-2">
					<button
						class="dark-btn icon-btn"
						on:click={() => ($session.settings.darkMode = !$session.settings.darkMode)}
					>
						<Icon name="moon" class="w-6 h-6 md:w-8 md:h-8" />
					</button>

					<button class="fullscreen-btn icon-btn" on:click={toggleFullscreen}>
						<Icon name="fullscreen" class="w-6 h-6 md:w-8 md:h-8" />
					</button>
				</div>

				<Toggle id="show-fullscreen-btn-toggle" checked={true} labelText="Show fullscreen button" />

				<br />

				<Toggle id="show-dark-btn-toggle" checked={true} labelText="Show dark button" />

				<br />

				<Toggle id="show-theme-btn-toggle" checked={false} labelText="Show theme buttons" />
			</div>
		</div>
		<div class="details">
			<p
				class="summary"
				on:click={() => {
					if (currentDetail == 1) currentDetail = -1;
					else currentDetail = 1;
				}}
			>
				Displays
			</p>
			<div class="details-content" class:open={currentDetail === 1}>
				<div class="block mb-2">
					<label for="primary-display-select">Primary Display:</label>
					<select id="primary-display-select">
						<option>Analog Clock</option>
						<option>Digital Time</option>
						<option>Date</option>
						<option>Date + Digital Time</option>
					</select>
				</div>

				<div class="block mb-2">
					<label for="secondary-display-select">Secondary Display:</label>
					<select id="secondary-display-select">
						<option>Digital Time</option>
						<option>Date</option>
						<option>Date + Digital Time</option>
						<option>None</option>
					</select>
				</div>

				<div class="block mb-2">
					<Toggle id="show-battery-toggle" checked={false} labelText="Show battery" />
				</div>
			</div>
		</div>
		<div class="details">
			<p
				class="summary"
				on:click={() => {
					if (currentDetail == 2) currentDetail = -1;
					else currentDetail = 2;
				}}
			>
				Analog
			</p>
			<div class="details-content" class:open={currentDetail === 2}>
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
		<div class="details">
			<p
				class="summary"
				on:click={() => {
					if (currentDetail == 3) currentDetail = -1;
					else currentDetail = 3;
				}}
			>
				Digital Datetime
			</p>
			<div class="details-content" class:open={currentDetail === 3}>
				<div class="block mb-2">
					<div class="block mb-2">
						<label for="time-format-select">Time Format:</label>
						<select id="time-format-select">
							<option>HH:MM</option>
							<option>HH:MM:SS</option>
							<option>HH:MM:SS.SS</option>
							<option>HH:MM AM/PM</option>
							<option>HH:MM:SS AM/PM</option>
							<option>HH:MM:SS.SS AM/PM</option>
							<option>MM:SS</option>
						</select>
					</div>

					<div class="block mb-2">
						<label for="date-format-select">Date Format:</label>
						<select id="date-format-select">
							<option>DD/MM</option>
							<option>DD/MM/YY</option>
							<option>DD/MM/YYYY</option>
							<option>Wkdy DD/MM</option>
							<option>Wkdy DD/MM/YY</option>
							<option>Wkdy DD/MM/YYYY</option>
							<option>Weekday DD/MM</option>
							<option>Weekday DD/MM/YY</option>
							<option>Weekday DD/MM/YYYY</option>
							<option>Month DD</option>
							<option>Month DD YY</option>
							<option>Month DD YYYY</option>
							<option>Weekday Month DD</option>
							<option>Weekday Month DD YY</option>
							<option> Weekday Month DD YYYY </option>
						</select>
					</div>

					<div class="block mb-2">
						<label for="datetime-format-select">Datetime Format:</label>
						<select id="datetime-format-select">
							<option>HH:MM DD/MM</option>
							<option>HH:MM:SS DD/MM</option>
							<option>HH:MM DD/MM/YY</option>
							<option>HH:MM:SS DD/MM/YY</option>
						</select>
					</div>

					<div class="block mb-2">
						<label for="locale-select">Locale:</label>
						<select disabled id="locale-select">
							<option> EN-US Los Angeles, CA, USA </option>
						</select>
					</div>
					<Toggle id="auto-locale-toggle" checked={true} labelText="Automatically Detect Locale" />
				</div>
			</div>
		</div>
	</TabPanel>

	<!-- User -->
	<TabPanel>
		<h3>Shortcuts</h3>
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
		<div class="block mb-2">
			<Toggle id="save-settings-toggle" checked={true} labelText="Save Settings Automatically" />
		</div>
		<button class="btn">Reset Settings</button>
		<button class="btn">Download Settings</button>
		<button class="btn">Upload Settings</button>

		<h3>App</h3>
		<div class="block mb-2">
			<Toggle id="always-on-top-toggle" checked={true} labelText="Always On Top" />
		</div>
		<button class="btn">Open Another Clock</button>
		<button class="btn">Share</button>
		<button class="btn">Send Feedback</button>
		<button class="btn">Install</button>

		<h3>Advanced</h3>
		<button class="btn">Multiple Clock Settings</button>
		<button class="btn">Quick Resize Settings</button>

		<p>V. 0.0.0</p>
	</TabPanel>

	<!-- Help -->
	<TabPanel>
		<p>Coming soon. . .</p>
	</TabPanel>
</Tabs>

<style>
</style>
