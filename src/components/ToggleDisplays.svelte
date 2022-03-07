<script>
	import { page } from '$app/stores';
	import { settings } from './settings';

	const displayOptions = {
		clock: {
			primary: ['analog', 'time', 'date', 'datetime'],
			secondary: ['time', 'date', 'datetime', 'none']
		},
		worldclock: {
			primary: ['analog_digital', 'digital'],
			secondary: ['rows', 'analog_grid', 'digital_grid']
		}
	};

	function togglePrimaryDisplay() {
		if ($page.url.pathname === '/') {
			toggleDisplay('clock', 'primary');
		} else if ($page.url.pathname === '/worldclock') {
			toggleDisplay('worldclock', 'primary');
		}
	}
	function toggleSecondaryDisplay() {
		if ($page.url.pathname === '/') {
			toggleDisplay('clock', 'secondary');
		} else if ($page.url.pathname === '/worldclock') {
			toggleDisplay('worldclock', 'secondary');
		}
	}

	function toggleDisplay(page, displayType) {
		const options = displayOptions[page][displayType];
		$settings[page].displays[displayType] =
			options[(options.indexOf($settings[page].displays[displayType]) + 1) % options.length];
	}

	export { togglePrimaryDisplay, toggleSecondaryDisplay };
</script>
