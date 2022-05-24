// stopwatch uses timestamps / ms since epoch generated from Date.now()
// to record start, stop, and laps

// for getting net ms
// takes in an array of timestamps
export const getNetMs = (times) => {
	let ms = 0;
	for (let i = 0; i < times.length; i += 2) {
		if (i === times.length - 1) {
			ms += Date.now() - times[i];
		} else {
			ms += times[i + 1] - times[i];
		}
	}
	return ms;
};

// for displaying
const msToTimeObj = (ms) => ({
	hours: Math.floor(ms / 1000 / 60 / 60),
	minutes: Math.floor(ms / 1000 / 60) % 60,
	seconds: Math.floor(ms / 1000) % 60,
	milliseconds: ms % 1000
});

const timeObjToStr = ({ hours, minutes, seconds, milliseconds }, displaySettings) =>
	`${hours === 0 ? '' : `${hours.toString().padStart(2, '0')}:`}${minutes
		.toString()
		.padStart(2, '0')}:${seconds.toString().padStart(2, '0')}${
		!displaySettings?.displayMs ? '' : `:${milliseconds.toString().padStart(3, '0')}`
	}`;

export const msToStr = (ms, displaySettings) => timeObjToStr(msToTimeObj(ms), displaySettings);

// ==== Laps ====

export const getCurrentLapTime = (times, laps) => {
	/**
	 * We only care about the most recent time in `laps` and the current time,
	 * as well as any times in `times` that fall between that
	 *
	 * We want to get the `getNetMs` of the `times` up to one before the last `laps` item
	 * and move the first one to the time of `laps`
	 *
	 * This works in part because lap btn can only be pressed while stopwatch is running,
	 * in other words, while time is increasing, or while there are an odd number of `times`
	 *
	 * Visual timeline of what we are accomplishing:
	 * stopwatch time:     ____   _______     _____    ____   ___
	 * times:              |   |  |      |    |    |   |   | |   NOW
	 * laps:                         |          |
	 * relevant times:                          |  |   |   | |
	 * current lap time:                         __    ____   ___
	 */
	const mostRecentLap = laps[laps.length - 1];
	const relevantTimes = [];
	const reversedTimes = [...times].reverse(); // a shallow clone, reversed (so we don't mutate original when reversing)

	// push all times after mostRecentLap and then one more
	for (let i = 0; i < reversedTimes.length; i++) {
		relevantTimes.push(reversedTimes[i]);
		if (reversedTimes[i] < mostRecentLap) break;
	}
	relevantTimes.reverse(); // un-reverse now that we finished the loop
	relevantTimes[0] = mostRecentLap; // the first time doesn't matter since it's before the most recent lap, we move it up to the most recent lap

	return getNetMs(relevantTimes);
};

// TODO: FIXME
// get all lap times
// use `getCurrentLapTime` and splice off last lap each time
// then subtract from the cumulative total
export const getLapTimes2 = (times, laps) => {
	const lapsClone = [...laps];
	lapsClone.unshift(times[0]); // add first time to beginning of lap array, to count the lap before the lap button was pressed
	const lapTimes = [];
	let total = 0;
	for (let i = 0; i < lapsClone.length; i++) {
		const currentLapTime = getCurrentLapTime(times, lapsClone) - total;
		total += currentLapTime;
		lapTimes.push({
			current: currentLapTime,
			total
		});
		lapsClone.pop();
	}
	return lapTimes;
};

export const getLapTimes = (times, laps) => {
	const allTimes = [];
	for (const time of times) {
		allTimes.push({
			time,
			isLap: false
		});
	}
	for (const lap of laps) {
		allTimes.push({
			time: lap,
			isLap: true
		});
	}

	const lapTimes = [];

	// when starting/resuming, note the time
	// when pausing, add the difference between the previously noted time and current time to the lap and total times
	// when hitting lap, add the lap and total times, then reset the lap time
	let timeIntoCurrentLap = 0;
	let previousTime = 0;
	let totalTime = 0;
	let isRunning = false;
	for (const currentTime of allTimes) {
		if (!currentTime.isLap) {
			isRunning = !isRunning;
			if (isRunning) {
				// START / RESUME
				previousTime = currentTime.time;
			} else {
				// PAUSE
				timeIntoCurrentLap += currentTime.time - previousTime;
				totalTime += currentTime.time - previousTime;
			}
		} else {
			// LAP
			timeIntoCurrentLap += currentTime.time - previousTime;
			totalTime += currentTime.time - previousTime;
			lapTimes.push({
				current: timeIntoCurrentLap,
				total: totalTime
			});
			previousTime = currentTime.time;
			timeIntoCurrentLap = 0;
		}
	}

	if (isRunning) {
		timeIntoCurrentLap += Date.now() - allTimes[allTimes.length - 1].time;
		totalTime += Date.now() - allTimes[allTimes.length - 1].time;
		lapTimes.push({
			current: timeIntoCurrentLap,
			total: totalTime
		});
	} else {
		timeIntoCurrentLap += allTimes[allTimes.length - 1].time - previousTime;
		totalTime += allTimes[allTimes.length - 1].time - previousTime;
		lapTimes.push({
			current: timeIntoCurrentLap,
			total: totalTime
		});
	}

	return lapTimes;
};
