// TODO: this ENTIRE FILE needs a LOT of work

export function convertTimezones(time, tz1, tz2) {
	if (!time || !tz1 || !tz2) return '';
	return addTimeToDate(getCurrentDateGivenTime(time), getDiffBetweenTimezones(time, tz1, tz2));
}

// https://stackoverflow.com/a/1214753/4907950
function addTimeToDate(oldDate, mins) {
	return new Date(oldDate.getTime() + mins * 60 * 1000);
}

function getCurrentDateGivenTime(time) {
	// Get hrs and min from given time string
	const hrs = time.split(':')[0];
	const min = time.split(':')[1];

	// Today's date, but with the time given
	// Set hr, min, sec, ms
	const currentDateGivenTime = new Date();
	currentDateGivenTime.setHours(hrs, min, 0, 0);
	return currentDateGivenTime;
}

// similar to timeText.js. condense logic?
export function getDiffBetweenTimezones(time, tz1, tz2) {
	if (!time || !tz1 || !tz2) return Infinity;

	const currentDateGivenTime = getCurrentDateGivenTime(time);

	// in minutes
	const offset1 = getTimeZoneOffset(currentDateGivenTime, tz1);
	const offset2 = getTimeZoneOffset(currentDateGivenTime, tz2);
	return offset1 - offset2;
}

// .setUTCHours()
// .getTimezoneOffset()

// https://stackoverflow.com/a/29268535/4907950

function getTimeZoneOffset(date, timeZone) {
	// Abuse the Intl API to get a local ISO 8601 string for a given time zone.
	let iso = date.toLocaleString('en-CA', { timeZone, hour12: false }).replace(', ', 'T');

	// Include the milliseconds from the original timestamp
	iso += '.' + date.getMilliseconds().toString().padStart(3, '0');

	// Lie to the Date object constructor that it's a UTC time.
	const lie = new Date(iso + 'Z');

	// Return the difference in timestamps, as minutes
	// Positive values are West of GMT, opposite of ISO 8601
	// this matches the output of `Date.getTimeZoneOffset`
	return -(lie - date) / 60 / 1000;
}
