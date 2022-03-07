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
		let currentPage;
		if ($page.url.pathname === '/') {
			currentPage = 'clock';
		} else if ($page.url.pathname === '/worldclock') {
			currentPage = 'worldclock';
		}
		if (currentPage) toggleDisplay(currentPage, 'primary');
	}
	function toggleSecondaryDisplay() {
		let currentPage;
		if ($page.url.pathname === '/') {
			currentPage = 'clock';
		} else if ($page.url.pathname === '/worldclock') {
			currentPage = 'worldclock';
		}
		if (currentPage) toggleDisplay(currentPage, 'secondary');
	}

	function toggleDisplay(page, displayType) {
		const options = displayOptions[page][displayType];
		$settings[page].displays[displayType] =
			options[(options.indexOf($settings[page].displays[displayType]) + 1) % options.length];
	}

	export { togglePrimaryDisplay, toggleSecondaryDisplay };
</script>
