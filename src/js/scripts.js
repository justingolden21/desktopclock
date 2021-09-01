import { displays, setDisplays } from './displays.js';

// below code is not necessary
// automatically handled by svelte kit if file is named service-worker.js
// https://kit.svelte.dev/docs#service-workers

// if ('serviceWorker' in navigator) {
// 	navigator.serviceWorker
// 		.register('sw.js')
// 		.then((reg) => console.log('service worker registered'))
// 		.catch((err) => console.log('service worker not registered', err));
// }

const setAngle = (type, newAngle) => {
	document.documentElement.style.setProperty(`--${type}-angle`, `${newAngle}deg`);
};

function setTime(date = new Date()) {
	// todo: add one second to current date, because transition to current time takes one second
	const h = date.getHours() % 12;
	const m = date.getMinutes();
	const s = date.getSeconds();

	let rotations = {
		second: 6 * s,
		minute: (m + s / 60) * 6,
		hour: (h + m / 60 + s / 3600) * 30
	};

	// check one second's rotation after 0 degrees
	// because this is when we need to replace the angle with 0 and transition to the next second (rotation % 360)
	if (rotations['second'] <= 6) rotations['second'] += 360;
	if (rotations['minute'] <= 0.1) rotations['minute'] += 360;
	if (rotations['hour'] <= 0.0084) rotations['hour'] += 360;

	// Quickly reset position
	// See https://stackoverflow.com/q/11131875/4907950
	for (const handType of ['second', 'minute', 'hour']) {
		setAngle(handType, rotations[handType]);

		if (rotations[handType] > 360) {
			let hand = document.getElementById(handType + '-hand');
			hand.classList.add('notransition');
			setAngle(handType, 0);
			// See https://gist.github.com/paulirish/5d52fb081b3570c81e3a#svg
			hand.getBBox(); // trigger CSS reflow
			hand.classList.remove('notransition');
			setAngle(handType, rotations[handType] % 360);
		}
	}
}

let setTimeInterval;

// manifest has to load before the service worker for the service worker to install
// since both are async here, the app breaks
// for localization, the manifest should be loaded from an endpoint in svelte kit, to point to a json that loads the correct language manifest


function init() {
	setTime();
	setTimeInterval = setInterval(setTime, 1 * 1000);

    let lang = 'en'; // tmp
	setDisplays(displays, lang);

	// TODO not working after details are inside of tab component
	// one details at a time in settings
	const details = document.querySelectorAll('#settings-modal details');
	details.forEach((targetDetail) => {
		targetDetail.addEventListener('click', () => {
			details.forEach((detail) => {
				if (detail !== targetDetail) {
					detail.removeAttribute('open');
				}
			});
		});
	});
}

export { init };
