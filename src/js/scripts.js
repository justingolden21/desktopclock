import { translate } from './translator.js';
import { defaultTheme, classicTheme, setTheme } from './themes.js';
import { toggleFullscreen } from './util.js';
import { displays, setDisplays } from './displays.js';
import { colors } from './colors.js';

import { u } from './lib/umbrella.min.js';

// below code is not necessary
// automatically handled by svelte kit if file is named service-worker.js
// https://kit.svelte.dev/docs#service-workers

// if ('serviceWorker' in navigator) {
// 	navigator.serviceWorker
// 		.register('sw.js')
// 		.then((reg) => console.log('service worker registered'))
// 		.catch((err) => console.log('service worker not registered', err));
// }

let setTimeInterval;

// manifest has to load before the service worker for the service worker to install
// since both are async here, the app breaks
// for localization, the manifest should be loaded from an endpoint in svelte kit, to point to a json that loads the correct language manifest

window.addEventListener('load', () => {
	const langs = ['en', 'es'];
	let lang = navigator.language.substring(0, 2);
	if (langs.indexOf(lang) !== -1) lang = 'en';
	// lang = 'es'; // tmp for testing
	// u('head').append(`<link rel="manifest" href="localized/${lang}/manifest.webmanifest" />`); // todo

	translate(lang);

	setTheme(defaultTheme);
	// setTheme(classicTheme);

	setTime();
	setTimeInterval = setInterval(setTime, 1 * 1000);

	setDisplays(displays, lang);

	u('.fullscreen-btn').on('click', toggleFullscreen);

	u('.dark-btn').on('click', () => {
		u('body').toggleClass('dark');

		const themeColor = u('body').hasClass('dark') ? `#${colors['Blue Gray']['900']}` : '#FFFFFF';
		u('meta[name="theme-color"]').first().setAttribute('content', themeColor);
		u('meta[name="apple-mobile-web-app-status-bar"]').first().setAttribute('content', themeColor);
	});

	u('body').on('dblclick', (evt) => {
		if (evt.target.tagName === 'BUTTON' || evt.target.parentNode.tagName === 'BUTTON') return;
		toggleFullscreen();
	});

	u('#menu-btn').on('click', () => {
		const closeSVG = 'M6 18L18 6M6 6l12 12';
		const menuSVG = 'M4 6h16M4 12h16M4 18h16';

		u('nav').toggleClass('-translate-x-full');

		u('#menu-btn svg path')
			.first()
			.setAttribute('d', u('nav').hasClass('-translate-x-full') ? menuSVG : closeSVG);
	});
	u('nav a').on('click', () => {
		if (!u('nav').hasClass('-translate-x-full')) u('#menu-btn').first().click();
	});

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

	let themeBtnsHTML = '';
	// eslint-disable-next-line guard-for-in
	for (const color in colors) {
		const c = `#${colors[color]['300']}`;
		themeBtnsHTML += `<button class="theme-btn ${
			colors[color] === 'Blue Gray' ? 'active' : ''
		}" style="background-color: ${c}" data-color="${c}"></button>`;
	}

	u('#theme-btns').html(themeBtnsHTML);
});

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
