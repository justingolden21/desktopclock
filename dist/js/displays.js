/* global u */

let displays = {
	// both should not be same
	primary: 'digital', // analog, digital, date
	secondary: 'date', // digital, date, none
};

let dateSettings = {
	weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric',
};

function setDisplays(displays) {
	u('#clock').first().style.opacity = displays.primary == 'analog' ? 1 : 0;
	u('#primary-display').first().style.opacity =
		displays.primary == 'analog' ? 0 : 1;

	if (displays.primary == 'digital')
		u('#primary-display h1').html(getDigitalTime());
	if (displays.primary == 'date')
		u('#primary-display h1').html(getDate(dateSettings));

	if (displays.secondary == 'digital')
		u('#secondary-display h2').html(getDigitalTime());
	if (displays.secondary == 'date')
		u('#secondary-display h2').html(getDate(dateSettings));
}

function getDigitalTime(options = {}) {
	const today = new Date();
	return `${today.getHours() % 12} : ${today.getMinutes()} ${
		today.getHours() > 12 ? 'AM' : 'PM'
	}`;
}

function getDate(options = {}) {
	return new Date().toLocaleDateString('en-US', options);
}
