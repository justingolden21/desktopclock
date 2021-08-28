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
		<details open>
			<summary>General</summary>
			<div class="details-content">
				<div class="mb-2">
					<!-- Remove first 2 items from array (black and white). They do not have themes. -->
					{#each Object.keys(TailwindColors).slice(2) as color, colorIndex}
						<button
							class="theme-btn"
							style="background-color: {TailwindColors[color][300]}"
							on:click={() => ($session.settings.themeColor = color)}
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
		</details>
		<details>
			<summary>Displays</summary>
			<div class="details-content">
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
		</details>
		<details>
			<summary>Analog</summary>
			<div class="details-content">
				<h3>Face</h3>

				<div class="block mb-2">
					<label for="face-fill-select">Face Fill Color:</label>
					<select id="face-fill-select">
						<option>50</option>
						<option>100</option>
						<option>200</option>
						<option>300</option>
						<option>400</option>
						<option>500</option>
						<option>600</option>
						<option>700</option>
						<option>800</option>
						<option>900</option>
						<option>None</option>
					</select>
				</div>
				<div class="block mb-2">
					<label for="face-stroke-select">Face Stroke Color:</label>
					<select id="face-stroke-select">
						<option>50</option>
						<option>100</option>
						<option>200</option>
						<option>300</option>
						<option>400</option>
						<option>500</option>
						<option>600</option>
						<option>700</option>
						<option>800</option>
						<option>900</option>
						<option>None</option>
					</select>
				</div>
				<div class="block mb-2">
					<label for="face-stroke-width-select">Face Stroke Width:</label>
					<select id="face-stroke-width-select">
						<option>0</option>
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
						<option>6</option>
					</select>
				</div>
				<div class="block mb-2">
					<label for="face-shape-select">Face Shape:</label>
					<select id="face-shape-select">
						<option>Circle</option>
						<option>Rounded Square</option>
						<option>Square</option>
					</select>
				</div>

				<h3>Shadow</h3>
				<div class="block mb-2">
					<label for="shadow-fill-select">Shadow Color:</label>
					<select id="shadow-fill-select">
						<option>50</option>
						<option>100</option>
						<option>200</option>
						<option>300</option>
						<option>400</option>
						<option>500</option>
						<option>600</option>
						<option>700</option>
						<option>800</option>
						<option>900</option>
						<option>None</option>
					</select>
				</div>

				<h3>Pin</h3>

				<div class="block mb-2">
					<label for="pin-fill-select">Pin Fill Color:</label>
					<select id="pin-fill-select">
						<option>50</option>
						<option>100</option>
						<option>200</option>
						<option>300</option>
						<option>400</option>
						<option>500</option>
						<option>600</option>
						<option>700</option>
						<option>800</option>
						<option>900</option>
						<option>None</option>
					</select>
				</div>
				<div class="block mb-2">
					<label for="pin-stroke-select">Pin Stroke Color:</label>
					<select id="pin-stroke-select">
						<option>50</option>
						<option>100</option>
						<option>200</option>
						<option>300</option>
						<option>400</option>
						<option>500</option>
						<option>600</option>
						<option>700</option>
						<option>800</option>
						<option>900</option>
						<option>None</option>
					</select>
				</div>
				<div class="block mb-2">
					<label for="pin-stroke-width-select">Pin Stroke Width:</label>
					<select id="pin-stroke-width-select">
						<option>0</option>
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
						<option>6</option>
					</select>
				</div>
				<div class="block mb-2">
					<label for="pin-size-select">Pin Size:</label>
					<select id="pin-size-select">
						<option>0</option>
						<option>0.5</option>
						<option>1</option>
						<option>1.5</option>
						<option>2</option>
						<option>2.5</option>
						<option>3</option>
					</select>
				</div>

				<p>Coming soon: Ticks, Hands</p>
				<!-- TODO: dynamically create options via js, save to browser -->
			</div>
		</details>
		<details>
			<summary>Digital Datetime</summary>
			<div class="details-content">
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
		</details>
	</TabPanel>

	<!-- User -->
	<TabPanel>
		<h3>Shortcuts</h3>
		<div class="block mb-2">
			<Toggle
				id="dbl-click-fullscreen-toggle"
				checked={true}
				labelText={$session.languageDictionary['Doubleclick Fullscreen']}
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
