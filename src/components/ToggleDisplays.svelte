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
		let currentPage = getCurrentPage();
		if (currentPage) toggleDisplaySetting(currentPage, displayType);
	}

	function getCurrentPage() {
		if ($page.url.pathname === '/') {
			return 'clock';
		} else if ($page.url.pathname === '/worldclock') {
			return 'worldclock';
		}
	}

	function toggleDisplaySetting(page, displayType) {
		const options = displayOptions[page][displayType];
		$settings[page].displays[displayType] =
			options[(options.indexOf($settings[page].displays[displayType]) + 1) % options.length];
	}

	export { toggleDisplay };
</script>
