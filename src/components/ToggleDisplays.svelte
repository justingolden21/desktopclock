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

	// displayType is 'primary' or 'secondary'
	function toggleDisplay(displayType) {
		let currentPage;
		switch ($page.url.pathname) {
			case '/':
				currentPage = 'clock';
				break;
			case '/worldclock':
				currentPage = 'worldclock';
				break;
			default:
				return;
		}

		const options = displayOptions[currentPage][displayType];
		$settings[currentPage].displays[displayType] =
			options[(options.indexOf($settings[currentPage].displays[displayType]) + 1) % options.length];
	}

	export { toggleDisplay };
</script>
