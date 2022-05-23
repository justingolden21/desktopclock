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

export const msToStr = (ms) => timeObjToStr(msToTimeObj(ms));
