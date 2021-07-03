/* global u */

let displays = {
	// both should not be same
	primary: 'analog', // analog, digital, date
	secondary: 'date', // digital, date, none
};

// https://tc39.es/ecma402/#table-datetimeformat-components
let dateSettings = {
	weekday: 'short',
	// year: 'numeric',
	month: 'long',
	day: 'numeric',
};
let digitalSettings = {
	seconds: true,
};

function setDisplays(displays) {
	u('#clock').first().style.opacity = displays.primary == 'analog' ? 1 : 0;
	u('#primary-display').first().style.opacity =
		displays.primary == 'analog' ? 0 : 1;

	if (displays.primary == 'digital')
		setDigitalTime('primary', digitalSettings);
	// u('#primary-display h1').html(getDigitalTime(digitalSettings));
	if (displays.primary == 'date')
		u('#primary-display h1').html(getDate(dateSettings));

	if (displays.secondary == 'digital')
		setDigitalTime('secondary', digitalSettings);
	// u('#secondary-display h2').html(getDigitalTime(digitalSettings));
	if (displays.secondary == 'date')
		u('#secondary-display h2').html(getDate(dateSettings));
}

let digitalTimeInterval;

function setDigitalTime(display, options) {
	if (display == 'primary')
		u('#primary-display h1').html(getDigitalTime(options));
	else u('#secondary-display h2').html(getDigitalTime(options));

	// todo if no seconds, display will lag by fraction of a min
	clearInterval(digitalTimeInterval);

	digitalTimeInterval = setInterval(
		() => setDigitalTime(display, options),
		options.seconds ? 1000 : 1000 * 60
	);
}

function getDigitalTime(options = {}) {
	const today = new Date();
	return `${
		(today.getHours() % 12) + (today.getHours() % 12 === 0 ? 12 : 0)
	}:${today.getMinutes().toString().padStart(2, '0')}${
		options.seconds
			? `:${today.getSeconds().toString().padStart(2, '0')}`
			: ''
	} ${today.getHours() > 12 ? 'PM' : 'AM'}`;
}

function getDate(options = {}) {
	return new Date().toLocaleDateString('en-US', options);
}
