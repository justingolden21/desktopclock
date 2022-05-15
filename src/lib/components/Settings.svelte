<script context="module">
	import Screenfull from 'screenfull';

	import { app_url, valid_pages } from '$lib/data/consts.js';

	export function toggleFullscreen() {
		if (Screenfull.isEnabled) {
			Screenfull.toggle();
		}
	}

	export function shareApp(languageDictionary, pathname) {
		if (navigator.share) {
			const isValid = valid_pages.includes(pathname);
			navigator
				.share({
					title: isValid
						? languageDictionary.pageNames[pathname.substring(1) || 'clock'] +
						  ' | ' +
						  languageDictionary['appName']
						: languageDictionary['appName'],
					text: languageDictionary.seo.clock.shareDescription,
					url: isValid ? app_url + pathname : app_url
				})
				.then(() => console.log('Successful share'))
				.catch((err) => console.log('Error sharing', err));
		}
	}

	export function copyURL(languageDictionary) {
		copyText(window.location.href).then((success) => {
			const message = success
				? languageDictionary.messages['Copied successfully']
				: languageDictionary.messages['Failed to copy'];
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
		const win = window.open(
			url,
			'_blank',
			`width=${width},height=${height},left=${left},top=${top},titlebar=no,toolbar=no,menubar=no,location=no,status=no`,
			false
		);
		win.focus();
	}

	let wakeLock;

	// https://developer.mozilla.org/en-US/docs/Web/API/WakeLock/request
	export async function requestWakeLock(languageDictionary) {
		let success = true;
		try {
			wakeLock = await navigator.wakeLock.request('screen');
			wakeLock.addEventListener('release', () => {
				console.log('wakeLock was released');
			});
			console.log('wakeLock success');
		} catch (err) {
			// The wake lock request fails - usually system-related, such as low battery.
			console.log(`Error creating wakeLock: ${err.name}, ${err.message}`);
			success = false;
		}

		const message = success
			? languageDictionary.messages['Wake lock was activated successfully']
			: languageDictionary.messages['Wake lock failure'];
		const type = success ? 'success' : 'error';
		const dismissible = true;
		const timeout = 2000;
		addToast({ message, type, dismissible, timeout });
	}

	// https://phpnews.io/feeditem/have-a-web-page-prevent-your-screen-computer-from-dimming-sleeping-with-the-wake-lock-api
	const releaseWakeLock = async (languageDictionary) => {
		let success = true;
		if (!wakeLock) return;
		try {
			await wakeLock.release();
			wakeLock = null;
		} catch (err) {
			console.log(`Error releasing wakeLock: ${err.name}, ${err.message}`);
			success = false;
		}

		const message = success
			? languageDictionary.messages['Wake lock was deactivated successfully']
			: languageDictionary.messages['Wake lock failure'];
		const type = success ? 'success' : 'error';
		const dismissible = true;
		const timeout = 2000;
		addToast({ message, type, dismissible, timeout });
	};

	export function validate(input) {
		const min = input.min;
		const max = input.max;
		const val = input.value;

		if (!val.length || isNaN(val) || val == null) return min;
		return Math.max(Math.min(parseInt(val), max), min);
	}

	export async function fetchLanguage(language) {
		const result = await fetch(`/lang/${language}.json`);
		return await result.json();
	}
</script>

<script>
	import { page, session } from '$app/stores';
	import { onMount } from 'svelte';
	import { now } from '../util/now.js';

	onMount(setupCasting);

	import dayjs from 'dayjs';

	import { setupCasting, castClock, isCastSupported } from '../util/cast.js';
	import { open } from '../util/modal.js';

	import { settings, defaultSettings } from '$lib/stores/settings.js';

	/// COMPONENTS ///
	import { Icon } from '$lib/components/Icon';
	import Toggle from '$lib/components/Toggle.svelte';
	import { Tabs, TabList, TabPanel, Tab } from '$lib/components/Tabs';
	import { Accordion, AccordionPanel } from '$lib/components/Accordion';
	import ThemeButtons from '$lib/components/ThemeButtons.svelte';
	import { addToast } from '$lib/components/Toast';
	import SettingSelect from '$lib/components/SettingSelect.svelte';
	import TimezoneSelect from '$lib/components/TimezoneSelect.svelte';
	import ClockSettings from '$lib/components/_Clock/ClockSettings.svelte';
	import WorldclockSettings from '$lib/components/_Worldclock/WorldclockSettings.svelte';

	import { defaultNightTheme } from '$lib/themes';

	import version from '../data/version.js';

	/// STATE ///
	$: dictionary = $session.languageDictionary;

	const castSupported = isCastSupported();

	import { fontFamilies, locales, supportedLangs } from '../data/consts.js';
	import { installButtonClick, showInstallButton } from '../util/install.js';

	async function changeLanguage() {
		$session.languageDictionary = await fetchLanguage($settings.locale.language);
	}

	let hoveringContact = false;

	function fontFamilyChange(evt) {
		const family = evt.target.value;
		const weight = $settings.clock.datetimeFontWeight;
		// if selected font does not have selected weight
		if (fontFamilies[family].indexOf(weight) == -1) {
			// default to first listed weight
			fontFamilies[family].length &&
				($settings.clock.datetimeFontWeight = fontFamilies[family][0].toString());
		}
	}
</script>

<!-- dirty trick to cache fonts when opening settings (for PWA) -->
{#each Object.keys(fontFamilies) as fontFamily}
	<span class="w-0 h-0" style:font-family={fontFamily} />
{/each}

<Tabs>
	<TabList>
		<Tab>
			{#if $page.url.pathname === '/'}
				<Icon name="clock" class="inline w-6 h-6 mr-1 md:w-0 md:h-0 lg:w-6 lg:h-6" />
				{dictionary.pageNames['clock']}
			{/if}
			{#if $page.url.pathname === '/worldclock'}
				<Icon name="worldclock" class="inline w-6 h-6 mr-1 md:w-0 md:h-0 lg:w-6 lg:h-6" />
				{dictionary.pageNames['worldclock']}
			{/if}
		</Tab>
		<Tab>
			<Icon name="eye" class="inline w-6 h-6 mr-1 md:w-0 md:h-0 lg:w-6 lg:h-6" />
			{dictionary.settingsTabs['Appearance']}
		</Tab>
		<Tab>
			<Icon name="application" class="inline w-6 h-6 mr-1 md:w-0 md:h-0 lg:w-6 lg:h-6" />
			{dictionary.settingsTabs['General']}
		</Tab>
		<Tab>
			<Icon name="info" class="inline w-6 h-6 mr-1 md:w-0 md:h-0 lg:w-6 lg:h-6" />
			{dictionary.settingsTabs['About']}
		</Tab>
	</TabList>

	<!-- Clock -->
	<TabPanel>
		{#if $page.url.pathname === '/'}
			<ClockSettings />
		{/if}
		{#if $page.url.pathname === '/worldclock'}
			<WorldclockSettings />
		{/if}
	</TabPanel>

	<!-- Appearance -->
	<TabPanel>
		<Accordion key="0">
			<AccordionPanel accordionTitle={dictionary.labels['Aesthetics']} key="1">
				<div class="mb-2">
					<h3 class="mt-0">{dictionary.labels.palettes.base}</h3>
					<ThemeButtons
						colors={['slate', 'gray', 'zinc', 'neutral', 'stone']}
						theme="baseColorPalette" />
					<h3>{dictionary.labels.palettes.accent}</h3>
					<ThemeButtons
						colors={[
							'rose',
							'pink',
							'fuchsia',
							'purple',
							'violet',
							'indigo',
							'blue',
							'sky',
							'cyan',
							'teal',
							'emerald',
							'green',
							'lime',
							'yellow',
							'amber',
							'orange',
							'red'
						]}
						theme="accentColorPalette" />
				</div>
				<div class="block mb-2">
					<button class="dark-btn btn" on:click={() => ($settings.darkMode = !$settings.darkMode)}>
						<Icon name="moon" class="inline w-6 h-6" />
						{dictionary.labels['Dark']}
					</button>
				</div>

				<SettingSelect
					id="font-family-select"
					selectLabel={dictionary.labels['Heading font family:']}
					bind:value={$settings.fontFamily}
					onchange={fontFamilyChange}
					values={Object.keys(fontFamilies)}
					labelMapper={(fontFamily) =>
						fontFamily === '' ? dictionary.display['System default'] : fontFamily}
					dynamicFont={true} />

				<br />

				<SettingSelect
					id="font-family-body-select"
					selectLabel={dictionary.labels['Body font family:']}
					bind:value={$settings.fontFamilyBody}
					values={Object.keys(fontFamilies)}
					labelMapper={(fontFamily) =>
						fontFamily === '' ? dictionary.display['System default'] : fontFamily}
					dynamicFont={true} />
			</AccordionPanel>
			<AccordionPanel accordionTitle={dictionary.labels['User Interface']} key="2">
				<Toggle
					id="show-dark-btn-toggle"
					bind:checked={$settings.showDarkButton}
					labelText={dictionary.labels['Show dark button']} />

				<Toggle
					id="show-primary-btn-toggle"
					bind:checked={$settings.showPrimaryButton}
					labelText={dictionary.labels['Show primary toggle button']} />

				<Toggle
					id="show-secondary-btn-toggle"
					bind:checked={$settings.showSecondaryButton}
					labelText={dictionary.labels['Show secondary toggle button']} />

				<div class:hidden={!castSupported}>
					<Toggle
						id="show-cast-btn-toggle"
						bind:checked={$settings.showCastButton}
						labelText={dictionary.labels['Show cast button']} />
				</div>

				<Toggle
					id="show-fullscreen-btn-toggle"
					bind:checked={$settings.showFullscreenButton}
					labelText={dictionary.labels['Show fullscreen button']} />

				<hr />

				<Toggle
					id="smaller-menu-toggle"
					bind:checked={$settings.smallerMenu}
					labelText={dictionary.labels['Smaller menu']} />

				<!-- only relevant on larger screens that don't always have the menu collapsed anyway -->
				<div class="hidden md:block">
					<Toggle
						id="always-collapse-menu-toggle"
						bind:checked={$settings.alwaysCollapseMenu}
						labelText={dictionary.labels['Always collapse menu']} />
				</div>

				<Toggle
					id="hide-titlebar-when-idle-toggle"
					bind:checked={$settings.hideTitlebarWhenIdle}
					labelText={dictionary.labels['Hide title bar when idle']} />

				{#if $settings.hideTitlebarWhenIdle}
					<div class="my-2 ml-8">
						<label for="seconds-until-idle-input">{dictionary.labels['Seconds until idle:']}</label>
						<input
							id="seconds-until-idle-input"
							on:input|preventDefault={(event) => {
								const value = validate(event.target);
								$settings.secondsUntilIdle = value;
								event.target.value = value;
							}}
							value={$settings.secondsUntilIdle}
							type="number"
							min="1"
							max="1000"
							required />
					</div>
					<br />
				{/if}
			</AccordionPanel>
		</Accordion>
		<button
			class="btn undo-btn block mt-4"
			on:click={() => {
				for (const option of 'baseColorPalette accentColorPalette darkMode showDarkButton showPrimaryButton showSecondaryButton showCastButton showFullscreenButton smallerMenu alwaysCollapseMenu hideTitlebarWhenIdle secondsUntilIdle fontFamily fontFamilyBody'.split(
					' '
				))
					$settings[option] = defaultSettings[option];

				// auto detect user device preferences (same code as in layout)
				$settings.darkMode = !!window.matchMedia('(prefers-color-scheme: dark)').matches;
			}}>
			<Icon name="undo" class="inline w-6 h-6" />
			{dictionary.labels['Reset appearance settings']}
		</button>
	</TabPanel>

	<!-- General -->
	<TabPanel>
		<!-- key="0" to default to all accordions closed -->
		<Accordion key="0">
			<AccordionPanel accordionTitle={dictionary.labels['Application']} key="1">
				<!-- <button class="btn">Download Settings</button> -->
				<!-- <button class="btn">Upload Settings</button> -->

				<button class="btn share-btn" on:click={() => shareApp(dictionary, $page.url.pathname)}>
					<Icon name="share" class="inline w-6 h-6" />
					{dictionary.labels['Share']}
				</button>
				<button class="btn link-btn" on:click={() => copyURL(dictionary)}>
					<Icon name="link" class="inline w-6 h-6" />
					{dictionary.labels['Copy website link']}
				</button>

				<button class="cast-btn btn" on:click={castClock} class:hidden={!castSupported}>
					<Icon name="cast" class="inline w-6 h-6" />
					{dictionary.labels['Cast']}
				</button>

				<button class="fullscreen-btn btn" on:click={toggleFullscreen}>
					<Icon name="fullscreen" class="inline w-6 h-6" />
					{dictionary.labels['Fullscreen']}
				</button>

				<br />

				{#if $showInstallButton}
					<button on:click={installButtonClick} class="btn install-btn">
						<Icon name="download" class="w-6 h-6 inline" />
						{$session.languageDictionary.labels['Install']}
					</button>
				{/if}

				<button class="btn external-link-btn" on:click={() => openWindow(window.location.href)}>
					<Icon name="external-link" class="inline w-6 h-6" />
					{dictionary.labels['Open another clock']}
				</button>
				<button
					class="btn"
					on:mouseover={() => (hoveringContact = true)}
					on:focus={() => (hoveringContact = true)}
					on:mouseout={() => (hoveringContact = false)}
					on:blur={() => (hoveringContact = false)}
					on:click={() =>
						window.open('mailto:contact@justingolden.me?subject=Desktop%20Clock%20Feedback')}>
					<Icon name={hoveringContact ? 'envelope_open' : 'envelope'} class="inline w-6 h-6" />
					{dictionary.labels['Send feedback']}
				</button>

				<br />

				<button
					class="btn undo-btn"
					on:click={() => {
						$settings = JSON.parse(JSON.stringify(defaultSettings));

						// auto detect user device preferences (same code as in layout)
						$settings.darkMode = !!window.matchMedia('(prefers-color-scheme: dark)').matches;
						if ($settings.darkMode) {
							$settings.clock.theme = JSON.parse(JSON.stringify(defaultNightTheme));
							$settings.worldclock.theme = JSON.parse(JSON.stringify(defaultNightTheme));
						}

						$settings.locale.language =
							Intl.DateTimeFormat().resolvedOptions().locale.substring(0, 2) ?? 'en';
						$settings.locale.datetime =
							Intl.DateTimeFormat().resolvedOptions().locale.substring(0, 2) ?? 'en';
						$settings.locale.timezone =
							Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'Etc/GMT';

						// https://stackoverflow.com/q/27647918/4907950
						const AMPM =
							Intl.DateTimeFormat(navigator.language, { hour: 'numeric' }).resolvedOptions()
								.hourCycle === 'h12';
						$settings.clock.timeFormat = AMPM ? 'h:mm A' : 'H:mm';
						$settings.clock.timeFormatCustom = AMPM ? 'h:mm A' : 'H:mm';
						$settings.worldclock.timeFormat = AMPM ? 'h:mm A' : 'H:mm';
						$settings.worldclock.timeFormatCustom = AMPM ? 'h:mm A' : 'H:mm';
					}}>
					<Icon name="undo" class="inline w-6 h-6" />
					{dictionary.labels['Reset all settings']}
				</button>

				<h3>{dictionary.labels['Advanced / Experimental']}</h3>

				<div class="block mb-2">
					<Toggle
						id="wakelock-toggle"
						labelText={dictionary.labels['Keep screen awake']}
						checked={false}
						on:change={(evt) =>
							evt.target.checked ? requestWakeLock(dictionary) : releaseWakeLock(dictionary)} />
				</div>
				<button
					class="btn"
					on:click={() => {
						localStorage.clear();
						location.reload();
					}}>{dictionary.labels['Delete settings and reload']}</button>

				<!-- <button class="btn">Multiple Clock Settings</button>
		        <button class="btn">Quick Resize Settings</button> -->
			</AccordionPanel>
			<AccordionPanel accordionTitle={dictionary.labels['Shortcuts']} key="2">
				<div class="block mb-2">
					<Toggle
						id="dbl-click-fullscreen-toggle"
						labelText={dictionary.labels['Doubleclick fullscreen']}
						bind:checked={$settings.doubleclickFullscreen} />
				</div>
				<div class="block mb-2">
					<Toggle
						id="keyboard-shortcuts-toggle"
						labelText={dictionary.labels['Keyboard shortcuts']}
						bind:checked={$settings.keyboardShortcuts} />
				</div>
				<button class="btn" on:click={() => open('keyboard-shortcuts')}>
					<Icon name="table" class="inline w-6 h-6" />
					{dictionary.labels['View keyboard shortcuts']}
				</button>
			</AccordionPanel>
			<AccordionPanel accordionTitle={dictionary.labels['Locale']} key="3">
				<div class="block mb-2">
					<SettingSelect
						id="language-select"
						selectLabel={dictionary.labels['Language:']}
						disabled={$settings.locale.automaticLanguage}
						bind:value={$settings.locale.language}
						onchange={changeLanguage}
						values={supportedLangs}
						labels={dictionary.languages} />

					<br class="block lg:hidden" />
					<Toggle
						id="auto-detect-language-toggle"
						labelText={dictionary.labels['Automatically detect language']}
						bind:checked={$settings.locale.automaticLanguage}
						on:change={(e) => {
							if (e.target.checked) {
								// same code as layout, reset to user device default
								$settings.locale.language = Intl.DateTimeFormat()
									.resolvedOptions()
									.locale.substring(0, 2);
								changeLanguage();
							}
						}} />
				</div>
				<div class="block mb-2">
					<SettingSelect
						id="datetime-locale-select"
						selectLabel={dictionary.labels['Datetime locale:']}
						disabled={$settings.locale.automaticDatetime}
						bind:value={$settings.locale.datetime}
						values={locales} />

					<br class="block lg:hidden" />
					<Toggle
						id="auto-detect-datetime-locale-toggle"
						labelText={dictionary.labels['Automatically detect datetime locale']}
						bind:checked={$settings.locale.automaticDatetime}
						on:change={(e) => {
							if (e.target.checked) {
								// same code as layout, reset to user device default
								$settings.locale.datetime = Intl.DateTimeFormat()
									.resolvedOptions()
									.locale.substring(0, 2);
							}
						}} />
				</div>
				<!-- todo: display gmt offset to the side -->
				<!-- todo: search input that finds results containing that string in below select -->
				<!-- options should look something like "Pacific Daylight Time (GMT-7) Los Angeles, CA" -->
				<div class="block mb-2">
					<TimezoneSelect
						id="timezone-select"
						bind:value={$settings.locale.timezone}
						disabled={$settings.locale.automaticTimezone} />
					<br class="block lg:hidden" />
					<Toggle
						id="auto-detect-timezone-toggle"
						labelText={dictionary.labels['Automatically detect timezone']}
						bind:checked={$settings.locale.automaticTimezone}
						on:change={(e) => {
							if (e.target.checked) {
								// same code as layout, reset to user device default
								$settings.locale.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
							}
						}} />
					<p>
						{dictionary.labels['Timezone offset:']}
						{new dayjs($now).tz($settings.locale.timezone).utcOffset() / 60}
					</p>
					<!-- TODO: btn to reset all locale settings, onclick toggles all auto to on which resets others -->
				</div>
			</AccordionPanel>
		</Accordion>
	</TabPanel>

	<!-- About -->
	<TabPanel>
		<h3>{dictionary.settingsTabs['About']}</h3>
		<p>
			{dictionary.about.aboutText}
		</p>
		<p>
			{dictionary.about.shareText.split('{{sharing}}')[0]}
			<button
				class="font-bold hover:underline"
				on:click={() => shareApp(dictionary, $page.url.pathname)}>
				<!-- svelte-ignore a11y-missing-attribute -->
				<a>{dictionary.about['sharing']}</a>
			</button>
			{dictionary.about.shareText.split('{{sharing}}')[1]}
		</p>
		<p class="mt-2">
			{dictionary.about['Version']}
			{version}
			{import.meta.env.PROD ? 'prod' : 'dev'}
		</p>

		<h3>{dictionary.about['Contact']}</h3>
		<p>
			{@html dictionary.about.contactText
				.replace(
					'{{author}}',
					'<a href="https://justingolden.me" target="_blank">Justin Golden</a>'
				)
				.replace(
					'{{email}}',
					'<a href="mailto:contact@justingolden.me?subject=Desktop+Clock" target="_blank">contact@justingolden.me</a>'
				)}
		</p>
	</TabPanel>
</Tabs>
