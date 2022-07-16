// Utility functions used by worldclock timetable

import { get } from 'svelte/store';

import { settings } from '$lib/stores/settings';

// Time Variable Conversion
// Times can be stored in strings, number of minutes, or objects
// These utility functions convert between these three formats

function timeStrToObj(timeStr) {
	const pm = timeStr.toUpperCase().includes('PM');
	const hours = parseInt(timeStr.split(':')[0]) + (pm ? 12 : 0);
	const mins = parseInt(timeStr.split(':')[1]);
	return { hours, mins };
}

function minsToObj(n) {
	const h = n / 60;
	const hours = Math.floor(h);
	const m = (h - hours) * 60;
	const mins = Math.round(m);
	return {
		hours,
		mins
	};
}

function objToTimeStr(obj, ampm = false) {
	let h = obj.hours % (ampm ? 12 : 24);
	if (ampm && h === 0) h = 12;
	const m = obj.mins.toString().padStart(2, '0');
	const ampmText = obj.hours >= 12 ? ' PM' : ' AM';
	return `${h}:${m}${ampm ? ampmText : ''}`;
}

function minsToTimeStr(n, ampm = false) {
	return objToTimeStr(minsToObj(n), ampm);
}

function objToMins(obj) {
	return obj.hours * 60 + obj.mins;
}

function timeStrToMins(timeStr) {
	return objToMins(timeStrToObj(timeStr));
}

// Core logic

// Get diff between two times, in mins
function getDiff(time1, time2) {
	if (typeof time1 === 'string') time1 = timeStrToObj(time1);
	if (typeof time2 === 'string') time2 = timeStrToObj(time2);

	const mins1 = objToMins(time1);
	const mins2 = objToMins(time2);

	let minsDiff = mins1 - mins2;

	const minsPerDay = 60 * 24;
	if (minsDiff < 0) minsDiff += minsPerDay;
	if (minsDiff > minsPerDay) minsDiff -= minsPerDay;

	return minsDiff;
}

// Add mins to a time
function getSum(time, mins) {
	if (typeof time === 'string') time = timeStrToObj(time);

	const timeMins = objToMins(time);

	const minsSum = timeMins + mins;
	// if (minsSum < 0) minsSum += 60 * 24;
	// if (minsSum > 60 * 24) minsSum -= 60 * 24;

	return minsToTimeStr(minsSum, get(settings).worldclock.timetable.ampm);
}

export { getDiff, getSum };
