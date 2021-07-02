if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('sw.js')
		.then((reg) => console.log('service worker registered'))
		.catch((err) => console.log('service worker not registered', err));
}

/* global u */

// let setTimeInterval;

window.addEventListener('load', () => {
	setTime();
	// setTimeInterval = setInterval(setTime, 5000);

	setTheme(defaultTheme);
	// setTheme(classicTheme);

	setDisplays(displays);

	u('#fullscreen-btn').on('click', toggleFullscreen);

	u('#dark-btn').on('click', () => u('body').toggleClass('dark'));

	u('body').on('dblclick', toggleFullscreen);
});

function setTime() {
	const date = new Date();

	const h = date.getHours() % 12;
	const m = date.getMinutes();
	const s = date.getSeconds();

	const sDegrees = 6 * s;
	const mDegrees = (m + s / 60) * 6;
	const hDegrees = (h + m / 60 + s / 3600) * 30;

	u('#hour-hand animatetransform').first().setAttribute('from', hDegrees);
	u('#hour-hand animatetransform')
		.first()
		.setAttribute('to', hDegrees + 360);

	u('#minute-hand animatetransform').first().setAttribute('from', mDegrees);
	u('#minute-hand animatetransform')
		.first()
		.setAttribute('to', mDegrees + 360);

	u('#second-hand animatetransform').first().setAttribute('from', sDegrees);
	u('#second-hand animatetransform')
		.first()
		.setAttribute('to', sDegrees + 360);

	// tick
	u('#second-hand animatetransform')
		.first()
		.setAttribute('calcMode', 'discrete');

	const ms = new Date().getMilliseconds();
	setTimeout(() => {
		u('#second-hand animatetransform')
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
