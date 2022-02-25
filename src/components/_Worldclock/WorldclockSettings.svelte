<script>
	import { session } from '$app/stores';

	import { settings, defaultSettings } from '../settings.js';
	import Icon from '../Icon.svelte';
	import { Accordion, AccordionPanel } from './../Accordion/_accordion.js';
	import AnalogClockSettings from '../_clock/AnalogClockSettings.svelte';
	import SettingSelect from '../SettingSelect.svelte';

	$: dictionary = $session.languageDictionary;
</script>

<!-- 
primary display
secondary display

worldclock date format
worldclock time format (default seconds)
worldclock analog theme (default simpler, maybe numerals, higher contrast, maybe just default theme with 12 numerals)
 -->

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
		</div>

		<div>
			<SettingSelect
				id="secondary-display-select"
				selectLabel={dictionary.clockSettings['Secondary display:']}
				bind:value={$settings.clock.displays.secondary}
				values={['time', 'date', 'datetime', 'none']}
				labels={dictionary.clockSettings.clockFormats} />
		</div>
	</AccordionPanel>

	<AccordionPanel accordionTitle={dictionary.clockSettings['Analog']} key="2">
		<AnalogClockSettings page="worldclock" />
	</AccordionPanel>

	<AccordionPanel accordionTitle={dictionary.clockSettings['Digital Datetime']} key="3">
		<p>{dictionary.messages['Coming soon']}</p>
	</AccordionPanel>
</Accordion>

<button
	class="btn undo-btn mt-4"
	on:click={() => {
		$settings.worldclock.timezones = JSON.parse(
			JSON.stringify(defaultSettings.worldclock.timezones)
		);
	}}>
	<Icon name="undo" class="inline w-6 h-6" />
	{dictionary.worldclockSettings['Reset timezones']}
</button>

<button
	class="btn trash-btn mt-4"
	on:click={() => {
		$settings.worldclock.timezones = [];
	}}>
	<Icon name="trash" class="inline w-6 h-6" />
	{dictionary.worldclockSettings['Delete timezones']}
</button>

<button
	class="btn undo-btn mt-4"
	on:click={() => {
		$settings.worldclock = JSON.parse(JSON.stringify(defaultSettings.worldclock));
	}}>
	<Icon name="undo" class="inline w-6 h-6" />
	{dictionary.worldclockSettings['Reset worldclock settings']}
</button>
