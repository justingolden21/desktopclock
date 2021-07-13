if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('sw.js')
		.then((reg) => console.log('service worker registered'))
		.catch((err) => console.log('service worker not registered', err));
}

/* global u */

let setTimeInterval;

window.addEventListener('load', () => {
	const langs = ['en', 'es'];
	let lang = navigator.language.substring(0, 2);
	if (langs.indexOf(lang) !== -1) lang = 'en';
	// lang = 'es'; // tmp for testing
	u('head').append(
		`<link rel="manifest" href="localized/${lang}/manifest.webmanifest" />`
	);

	translate(lang);

	setTheme(defaultTheme);
	// setTheme(classicTheme);

	setTime();
	setTimeInterval = setInterval(setTime, 20 * 1000);

	setDisplays(displays, lang);

	u('#fullscreen-btn').on('click', toggleFullscreen);

	u('#dark-btn').on('click', () => {
		u('body').toggleClass('dark');

		const themeColor = u('body').hasClass('dark')
			? `#${colors['Blue Gray']['900']}`
			: '#FFFFFF';
		u('meta[name="theme-color"]')
			.first()
			.setAttribute('content', themeColor);
		u('meta[name="apple-mobile-web-app-status-bar"]')
			.first()
			.setAttribute('content', themeColor);
	});

	u('body').on('dblclick', (evt) => {
		if (
			evt.target.tagName === 'BUTTON' ||
			evt.target.parentNode.tagName === 'BUTTON'
		)
			return;
		toggleFullscreen();
	});

	u('#menu-btn').on('click', () => {
		const closeSVG = 'M6 18L18 6M6 6l12 12';
		const menuSVG = 'M4 6h16M4 12h16M4 18h16';

		u('nav').toggleClass('-translate-x-full');

		u('#menu-btn svg path')
			.first()
			.setAttribute(
				'd',
				u('nav').hasClass('-translate-x-full') ? menuSVG : closeSVG
			);
	});
	u('nav a').on('click', () => {
		if (!u('nav').hasClass('-translate-x-full'))
			u('#menu-btn').first().click();
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

	// u('#menu-btn').on('mouseover', () => {
	// 	u('#menu-btn svg path')
	// 		.first()
	// 		.setAttribute('d', 'M8 6h16M4 12h16M0 18h16');
	// });
	// u('#menu-btn').on('mouseout', () => {
	// 	u('#menu-btn svg path')
	// 		.first()
	// 		.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
	// });
});

let firstSetTime = null;

// let lastRotations = [0, 0, 0];

function setTime() {
	const date = new Date();

	const h = date.getHours() % 12;
	const m = date.getMinutes();
	let s = date.getSeconds();

	// attempt 1 to fix calling setTime on interval to fix time on awake
	if (firstSetTime == null) {
		firstSetTime = date;
	} else {
		// updating secs carries over to mins and hrs because of math below
		s -= Math.ceil((date - firstSetTime) / 1000);
	}

	let sDegrees = 6 * s;
	let mDegrees = (m + s / 60) * 6;
	let hDegrees = (h + m / 60 + s / 3600) * 30;

	// attempt 3 to fix calling setTime on interval to fix time on awake
	// hDegrees -= u('#hour-animate').first().getAttribute('from');
	// mDegrees -= u('#minute-animate').first().getAttribute('from');
	// sDegrees -= u('#second-animate').first().getAttribute('from');

	// attempt 2 to fix calling setTime on interval to fix time on awake
	// hDegrees -= lastRotations[0];
	// mDegrees -= lastRotations[1];
	// sDegrees -= lastRotations[2];
	// console.log(hDegrees, mDegrees, sDegrees);
	// lastRotations = [hDegrees, mDegrees, sDegrees];

	u('#hour-animate').first().setAttribute('from', hDegrees);
	u('#hour-animate')
		.first()
		.setAttribute('to', hDegrees + 360);

	u('#minute-animate').first().setAttribute('from', mDegrees);
	u('#minute-animate')
		.first()
		.setAttribute('to', mDegrees + 360);

	u('#second-animate').first().setAttribute('from', sDegrees);
	u('#second-animate')
		.first()
		.setAttribute('to', sDegrees + 360);

	// tick
	u('#second-animate').first().setAttribute('calcMode', 'discrete');

	// const ms = new Date().getMilliseconds();
	// setTimeout(() => {
	u('#second-animate')
		.first()
		.setAttribute(
			'values',
			Array(60)
				.fill()
				.map((_, idx) => sDegrees + idx * 6)
				.join(';')
		);
	// }, 1000 - ms);
}
