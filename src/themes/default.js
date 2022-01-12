const defaultTheme = {
	name: 'Default Theme',
	face: {
		stroke: {
			lightness: '700'
		},
		fill: {
			lightness: '100'
		},
		strokeWidth: 0,
		shape: 'circle'
	},
	shadow: {
		fill: {
			lightness: '700'
		}
	},
	pin: {
		stroke: {
			palette: 'accent',
			lightness: '700'
		},
		fill: {
			lightness: '100'
		},
		strokeWidth: 0.5,
		size: 1
	},
	ticks: {
		sm: {
			stroke: {
				lightness: '-1'
			},
			height: 0.5,
			width: 2
		},
		md: {
			stroke: {
				lightness: '400'
			},
			height: 0.5,
			width: 3
		},
		lg: {
			stroke: {
				lightness: '500'
			},
			height: 0.5,
			width: 5
		}
	},
	hands: {
		hour: {
			stroke: {
				lightness: '700'
			},
			strokeWidth: 0.5,
			length: 15,
			back: 3,
			linecap: 'square'
		},
		minute: {
			stroke: {
				lightness: '500'
			},
			strokeWidth: 0.5,
			length: 21,
			back: 3,
			linecap: 'square'
		},
		second: {
			stroke: {
				palette: 'accent',
				lightness: '700'
			},
			strokeWidth: 0.5,
			length: 27,
			back: 6,
			linecap: 'square'
		}
	}
};

export default defaultTheme;
