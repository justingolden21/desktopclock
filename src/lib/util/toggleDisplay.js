// Toggle the primary or secondary display settings on the given page

const displayOptions = {
	clock: {
		primary: ['analog', 'time', 'date', 'datetime'],
		secondary: ['time', 'date', 'datetime', 'none']
	},
	worldclock: {
		primary: ['analog_digital', 'digital', 'none'],
		secondary: ['rows', 'compact_rows', 'analog_grid', 'digital_grid']
	}
};

const pages = {
	'/': 'clock',
	'/worldclock': 'worldclock'
};

// displayType is 'primary' or 'secondary'
// example usage: `ToggleDisplay($page, settings, 'primary');`
function toggleDisplay(page, settings, displayType) {
	const currentPage = pages[page.url.pathname];
	if (!currentPage) return;

	settings.update((currentSettings) => {
		const options = displayOptions[currentPage][displayType];

		const currentDisplay = currentSettings[currentPage].displays[displayType];
		const newDisplay = options[(options.indexOf(currentDisplay) + 1) % options.length];

		const newSettings = { ...currentSettings };
		newSettings[currentPage].displays[displayType] = newDisplay;
		return newSettings;
	});
}

export default toggleDisplay;
