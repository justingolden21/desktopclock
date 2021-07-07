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
	setTimeInterval = setInterval(setTime, 5000);

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
});

let firstSetTime = null;

function setTime() {
	const date = new Date();

	const h = date.getHours() % 12;
	const m = date.getMinutes();
	let s = date.getSeconds();

	if (firstSetTime == null) {
		firstSetTime = date;
	} else {
		// updating secs carries over to mins and hrs because of math below
		s -= (date - firstSetTime) / 1000;
	}

	const sDegrees = 6 * s;
	const mDegrees = (m + s / 60) * 6;
	const hDegrees = (h + m / 60 + s / 3600) * 30;

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

	const ms = new Date().getMilliseconds();
	setTimeout(() => {
		u('#second-animate')
			.first()
			.setAttribute(
				'values',
				Array(60)
					.fill()
					.map((_, idx) => sDegrees + idx * 6)
					.join(';')
			);
	}, 1000 - ms);
}
