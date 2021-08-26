<script>
	import '../app.postcss';
	import { navigating, page, session } from '$app/stores';
	import TailwindColors from 'tailwindcss/colors';
	import screenfull from 'screenfull';

	import Toggle from '../components/Toggle.svelte';
	import { Tabs, TabList, TabPanel, Tab } from '../js/components/tabs.js';
	import Modal from '../components/Modal.svelte';
	import Icon from '../components/Icon.svelte';
	let settingsModal, aboutModal;

	let navOpen = false;
	$: if ($navigating) navOpen = false;

	function doubleClickFullscreen({ target }) {
		if (target.tagName === 'BUTTON' || target.parentNode.tagName === 'BUTTON') return;
		fullscreen();
	}

	function fullscreen() {
		if (screenfull.isEnabled) {
			screenfull.toggle();
		}
	}

	let darkMode = false;
	$: if (darkMode) document.body.classList.toggle('dark');
	let themeColor = 'blueGray';
</script>

<svelte:head>
	<meta name="apple-mobile-web-app-status-bar" content={themeColor} />
	<meta name="theme-color" content={themeColor} />
</svelte:head>

<svelte:body on:dblclick={doubleClickFullscreen} />

<div class="text-center flex min-h-screen">
	<nav
		class="
            min-h-screen
            bg-gray-50 bg-opacity-75
            w-64
            p-8
            pt-20
            text-left
            absolute
            left-0
            transform
            transition-all
            duration-200
            ease-in-out
            md:relative md:translate-x-0"
		class:-translate-x-full={!navOpen}
	>
		<a class:active={$page.path === '/'} href="/">
			<Icon name="clock" class="w-6 h-6 inline mr-2" />
			Clock</a
		>
		<a class:active={$page.path === '/worldclock'} href="/worldclock">
			<Icon name="worldclock" class="w-6 h-6 inline mr-2" />
			Worldclock</a
		>
		<a>
			<Icon name="stopwatch" class="w-6 h-6 inline mr-2" />
			Stopwatch</a
		>
		<a>
			<Icon name="timer" class="w-6 h-6 inline mr-2" />
			Timers</a
		>
		<a
			on:click={() => {
				navOpen = false;
				settingsModal.show();
			}}
		>
			<Icon name="settings" class="w-6 h-6 inline mr-2" />
			Settings</a
		>
		<a
			on:click={() => {
				navOpen = false;
				aboutModal.show();
			}}
		>
			<Icon name="info" class="w-6 h-6 inline mr-2" />
			About
		</a>
	</nav>

	<header class="flex-1">
		<button
			id="menu-btn"
			class="icon-btn float-left md:hidden"
			on:click={() => (navOpen = !navOpen)}
		>
			<Icon name={navOpen ? 'close' : 'menu'} class="w-6 h-6 md:w-8 md:h-8" />
		</button>

		<button
			id="main-dark-btn"
			class="dark-btn icon-btn float-left"
			on:click={() => (darkMode = !darkMode)}
		>
			<Icon name="moon" class="w-6 h-6 md:w-8 md:h-8" />
		</button>

		<h1 id="title-text">
			{$session.language_dictionary.pageNames[$page.path.substring(1) || 'clock']}
		</h1>

		<button
			id="main-fullscreen-btn"
			class="fullscreen-btn icon-btn float-right"
			on:click={fullscreen}
		>
			<Icon name="fullscreen" class="w-6 h-6 md:w-8 md:h-8" />
		</button>
		<div class="p-16">
			<slot />
		</div>
	</header>

	<!-- Modals -->

	<Modal bind:this={settingsModal} title="Settings" icon="settings">
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
									on:click={() => (themeColor = color)}
								/>
							{/each}
						</div>
						<div class="block mb-2">
							<button class="dark-btn icon-btn">
								<Icon name="moon" class="w-6 h-6 md:w-8 md:h-8" />
							</button>

							<button class="fullscreen-btn icon-btn">
								<Icon name="fullscreen" class="w-6 h-6 md:w-8 md:h-8" />
							</button>
						</div>

						<Toggle
							id="show-fullscreen-btn-toggle"
							checked={true}
							labelText="Show fullscreen button"
						/>

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
							<Toggle
								id="auto-locale-toggle"
								checked={true}
								labelText="Automatically Detect Locale"
							/>
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
						labelText={$session.language_dictionary['Doubleclick Fullscreen']}
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
					<Toggle
						id="save-settings-toggle"
						checked={true}
						labelText="Save Settings Automatically"
					/>
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
	</Modal>

	<Modal bind:this={aboutModal} title="About" icon="info">
		<h3>About</h3>
		<p>
			Desktop Clock is a simple, resizable and customizable clock for any device. Features include
			customizable analog and digital displays, night mode, and more. Desktop Clock is designed to
			scale perfectly to any screen size and ratio, with no distortion or pixelation. Use Desktop
			Clock as a clock on your TV, a night clock, or even project the time for exams. Customize the
			time, date and more to your liking.
		</p>

		<h3>Contact</h3>
		<p>
			Made by
			<a href="https://justingolden.me" target="_blank">Justin Golden</a>. Feel free to contact me
			with any feedback, questions, or requests at
			<a href="mailto:contact@justingolden.me" target="_blank">contact@justingolden.me</a>.
		</p>
	</Modal>
</div>
