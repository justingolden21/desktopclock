import { u } from './lib/umbrella.min.js';

let displays = {
	// both should not be same
	primary: 'analog', // analog, time, date, datetime
	secondary: 'date' // time, date, datetime, none
};

// https://tc39.es/ecma402/#table-datetimeformat-components
let dateSettings = {
	weekday: 'short',
	// year: 'numeric',
	month: 'long',
	day: 'numeric'
};
let timeSettings = {
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric'
	// fractionalSecondDigits: '1',
};
let dateTimeSettings = {};

let dateTimeInterval;

// todo: add ms or seconds to first interval (to update first time on even second / minute)
function setDisplays(displays, lang) {
	// uncomment for testing
	// u('#clock').first().style.opacity = 0;
	// u('#primary-display h1').html('12:34:56 PM');
	// u('#secondary-display h2').html(getDate(dateSettings));
	// return;

	u('#clock').first().style.opacity = displays.primary === 'analog' ? 1 : 0;
	u('#primary-display').first().style.opacity = displays.primary == 'analog' ? 0 : 1;
	u('#secondary-display').first().style.opacity = displays.secondary == 'none' ? 0 : 1;

	if (displays.primary == 'time') u('#primary-display h1').html(getTime(timeSettings));
	if (displays.primary == 'date') u('#primary-display h1').html(getDate(dateSettings, lang));
	if (displays.primary == 'datetime')
		u('#primary-display h1').html(getDateTime(dateTimeSettings, lang));

	if (displays.secondary == 'time') u('#secondary-display h2').html(getTime(timeSettings));
	if (displays.secondary == 'date') u('#secondary-display h2').html(getDate(dateSettings, lang));
	if (displays.secondary == 'datetime')
		u('#secondary-display h2').html(getDateTime(dateTimeSettings, lang));

	clearInterval(dateTimeInterval);

	dateTimeInterval = setInterval(
		() => setDisplays(displays, lang),
		timeSettings.second || dateTimeSettings.second ? 1000 : 1000 * 60
	);
}

function getDate(options = {}, lang) {
	return new Date().toLocaleDateString(lang, options);
}
function getTime(options = {}, lang) {
	return new Date().toLocaleTimeString(lang, options);
}
function getDateTime(options = {}, lang) {
	return new Date().toLocaleString(lang, options);
}

export { displays, setDisplays };
