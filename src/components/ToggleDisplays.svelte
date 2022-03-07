<script>
	import { page } from '$app/stores';
	import { settings } from './settings';

	function togglePrimaryDisplay() {
		if ($page.url.pathname === '/') {
			toggleDisplay('clock', 'primary', ['analog', 'time', 'date', 'datetime']);
		} else if ($page.url.pathname === '/worldclock') {
			toggleDisplay('worldclock', 'primary', ['analog_digital', 'digital']);
		}
	}
	function toggleSecondaryDisplay() {
		if ($page.url.pathname === '/') {
			toggleDisplay('clock', 'secondary', ['time', 'date', 'datetime', 'none']);
		} else if ($page.url.pathname === '/worldclock') {
			toggleDisplay('worldclock', 'secondary', ['rows', 'analog_grid', 'digital_grid']);
		}
	}

	function toggleDisplay(page, displayType, options) {
		$settings[page].displays[displayType] =
			options[(options.indexOf($settings[page].displays[displayType]) + 1) % options.length];
	}

	export { togglePrimaryDisplay, toggleSecondaryDisplay };
</script>
