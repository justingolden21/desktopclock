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

	const pages = {
		'/': 'clock',
		'/worldclock': 'worldclock'
	};

	// displayType is 'primary' or 'secondary'
	function toggleDisplay(displayType) {
		const currentPage = pages[$page.url.pathname];
		if (!currentPage) return;

		const options = displayOptions[currentPage][displayType];
		$settings[currentPage].displays[displayType] =
			options[(options.indexOf($settings[currentPage].displays[displayType]) + 1) % options.length];
	}

	export { toggleDisplay };
</script>
