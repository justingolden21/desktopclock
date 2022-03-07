<script>
	import { page } from '$app/stores';
	import { settings } from './settings';

	function togglePrimaryDisplay() {
		if ($page.url.pathname === '/') {
			const options = ['analog', 'time', 'date', 'datetime'];
			$settings.clock.displays.primary =
				options[(options.indexOf($settings.clock.displays.primary) + 1) % options.length];
		} else if ($page.url.pathname === '/worldclock') {
			const options = ['analog_digital', 'digital'];
			$settings.worldclock.displays.primary =
				options[(options.indexOf($settings.worldclock.displays.primary) + 1) % options.length];
		}
	}
	function toggleSecondaryDisplay() {
		if ($page.url.pathname === '/') {
			const options = ['time', 'date', 'datetime', 'none'];
			$settings.clock.displays.secondary =
				options[(options.indexOf($settings.clock.displays.secondary) + 1) % options.length];
		} else if ($page.url.pathname === '/worldclock') {
			const options = ['rows', 'analog_grid', 'digital_grid'];
			$settings.worldclock.displays.secondary =
				options[(options.indexOf($settings.worldclock.displays.secondary) + 1) % options.length];
		}
	}

	export { togglePrimaryDisplay, toggleSecondaryDisplay };
</script>
