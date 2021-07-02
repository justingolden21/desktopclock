/* global u */

const defaultTheme = {
	face: {
		stroke: '#0000',
		fill: '#' + colors['Cool Gray']['100'],
		strokeWidth: 2,
	},
	shadow: {
		fill: '#' + colors['Cool Gray']['700'],
	},
	pin: {
		stroke: '#' + colors['Red']['700'],
		fill: '#' + colors['Cool Gray']['100'],
		strokeWidth: 0.5,
		size: 1,
	},
	ticks: {
		sm: {
			stroke: '#0000',
			height: 1,
			width: 1,
		},
		md: {
			stroke: '#' + colors['Cool Gray']['500'],
			height: 0.5,
			width: 3,
		},
		lg: {
			stroke: '#' + colors['Cool Gray']['700'],
			height: 0.5,
			width: 5,
		},
	},
	hands: {
		hour: {
			stroke: '#' + colors['Cool Gray']['700'],
			strokeWidth: 1,
			length: 15,
			back: 3,
			linecap: 'round',
		},
		minute: {
			stroke: '#' + colors['Cool Gray']['500'],
			strokeWidth: 1,
			length: 21,
			back: 3,
			linecap: 'round',
		},
		second: {
			stroke: '#' + colors['Red']['700'],
			strokeWidth: 0.5,
			length: 27,
			back: 9,
			linecap: 'round',
		},
	},
};

const classicTheme = {
	face: {
		stroke: '#999',
		fill: '#fff',
		strokeWidth: 2,
	},
	shadow: {
		fill: '#0000',
	},
	pin: {
		stroke: '#0000',
		fill: '#900',
		strokeWidth: 0,
		size: 1,
	},
	ticks: {
		sm: {
			stroke: '#999',
			height: 1,
			width: 1,
		},
		md: {
			stroke: '#666',
			height: 1.5,
			width: 3,
		},
		lg: {
			stroke: '#333',
			height: 2,
			width: 5,
		},
	},
	hands: {
		hour: {
			stroke: '#333',
			strokeWidth: 1.5,
			length: 15,
			back: 3,
			linecap: 'round',
		},
		minute: {
			stroke: '#666',
			strokeWidth: 1,
			length: 21,
			back: 3,
			linecap: 'round',
		},
		second: {
			stroke: '#900',
			strokeWidth: 0.5,
			length: 27,
			back: 9,
			linecap: 'round',
		},
	},
};

const sizes = ['sm', 'md', 'lg'];
const hands = ['hour', 'minute', 'second'];

function setTheme(theme) {
	u('#face').first().setAttribute('stroke', theme.face.stroke);
	u('#face').first().setAttribute('fill', theme.face.fill);
	u('#face').first().setAttribute('stroke-width', theme.face.strokeWidth);

	u('#shadow').first().setAttribute('fill', theme.shadow.fill);

	u('#pin').first().setAttribute('stroke', theme.pin.stroke);
	u('#pin').first().setAttribute('fill', theme.pin.fill);
	u('#pin').first().setAttribute('stroke-width', theme.pin.strokeWidth);
	u('#pin').first().setAttribute('r', theme.pin.size);

	for (const size of sizes) {
		u(`#${size}-ticks`)
			.first()
			.setAttribute('stroke', theme.ticks[size].stroke);
		const r = 27.5 - theme.ticks[size].width / 2;
		u(`#${size}-ticks`).first().setAttribute('r', r);
		u(`#${size}-ticks`)
			.first()
			.setAttribute('stroke-width', theme.ticks[size].width);
		u(`#${size}-ticks`)
			.first()
			.setAttribute('transform', `rotate(-${theme.ticks[size].height})`);
		const numTicks = size == 'sm' ? 60 : size == 'md' ? 12 : 4;
		const dash = (2 * r * Math.PI) / numTicks - theme.ticks[size].height;
		u(`#${size}-ticks`)
			.first()
			.setAttribute(
				'stroke-dasharray',
				`${theme.ticks[size].height},${dash}`
			);
	}

	for (const hand of hands) {
		u(`#${hand}-hand`)
			.first()
			.setAttribute('stroke', theme.hands[hand].stroke);
		u(`#${hand}-hand`)
			.first()
			.setAttribute('stroke-width', theme.hands[hand].strokeWidth);
		u(`#${hand}-hand`).first().setAttribute('y1', -theme.hands[hand].back);
		u(`#${hand}-hand`).first().setAttribute('y2', theme.hands[hand].length);
		u(`#${hand}-hand`)
			.first()
			.setAttribute('stroke-linecap', theme.hands[hand].linecap);
	}
}
