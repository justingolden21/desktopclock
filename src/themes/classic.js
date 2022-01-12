const classicTheme = {
	name: 'Classic Theme',
	face: {
		stroke: {
			lightness: '500'
		},
		fill: {
			lightness: '50'
		},
		strokeWidth: 2,
		shape: 'circle'
	},
	shadow: {
		fill: {
			lightness: '-1'
		}
	},
	pin: {
		stroke: {
			lightness: '-1'
		},

		fill: {
			palette: 'accent',
			lightness: '800'
		},
		strokeWidth: 0,
		size: 1
	},
	ticks: {
		sm: {
			stroke: {
				lightness: '500'
			},
			height: 1,
			width: 1
		},
		md: {
			stroke: {
				lightness: '600'
			},
			height: 1.5,
			width: 3
		},
		lg: {
			stroke: {
				lightness: '800'
			},
			height: 2,
			width: 5
		}
	},
	hands: {
		hour: {
			stroke: {
				lightness: '800'
			},
			strokeWidth: 1.5,
			length: 15,
			back: 3,
			linecap: 'round'
		},
		minute: {
			stroke: {
				lightness: '600'
			},
			strokeWidth: 1,
			length: 21,
			back: 3,
			linecap: 'round'
		},
		second: {
			stroke: {
				palette: 'accent',
				lightness: '800'
			},
			strokeWidth: 0.5,
			length: 27,
			back: 9,
			linecap: 'round'
		}
	}
};

export default classicTheme;
