if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('sw.js')
		.then((reg) => console.log('service worker registered'))
		.catch((err) => console.log('service worker not registered', err));
}

/* global u */

window.addEventListener('load', () => {
	setTime();

	setTheme(defaultTheme);
	// setTheme(classicTheme);
});

function setTime() {
	const date = new Date();

	const h = date.getHours() % 12;
	const m = date.getMinutes();
	const s = date.getSeconds();

	const sDegrees = 6 * s;
	const mDegrees = (m + s / 60) * 6;
	const hDegrees = (h + m / 60 + s / 3600) * 30;

	u('#hour-hand')
		.first()
		.setAttribute('transform', `rotate(${hDegrees.toString()})`);
	u('#minute-hand')
		.first()
		.setAttribute('transform', `rotate(${mDegrees.toString()})`);
	u('#second-hand')
		.first()
		.setAttribute('transform', `rotate(${sDegrees.toString()})`);
}
