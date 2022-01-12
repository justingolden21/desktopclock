const defaultTheme = {
	name: 'Default Theme',
	face: {
		stroke: {
			lightness: '700',
			palette: 'base'
		},
		fill: {
			lightness: '100',
			palette: 'base'
		},
		strokeWidth: 0,
		shape: 'circle'
	},
	shadow: {
		fill: {
			lightness: '700',
			palette: 'base'
		}
	},
	pin: {
		stroke: {
			lightness: '700',
			palette: 'accent'
		},
		fill: {
			lightness: '100',
			palette: 'base'
		},
		strokeWidth: 0.5,
		size: 1
	},
	ticks: {
		sm: {
			stroke: {
				lightness: '-1',
				palette: 'base'
			},
			height: 0.5,
			width: 2
		},
		md: {
			stroke: {
				lightness: '400',
				palette: 'base'
			},
			height: 0.5,
			width: 3
		},
		lg: {
			stroke: {
				lightness: '500',
				palette: 'base'
			},
			height: 0.5,
			width: 5
		}
	},
	hands: {
		hour: {
			stroke: {
				lightness: '700',
				palette: 'base'
			},
			strokeWidth: 0.5,
			length: 15,
			back: 3,
			linecap: 'square'
		},
		minute: {
			stroke: {
				lightness: '500',
				palette: 'base'
			},
			strokeWidth: 0.5,
			length: 21,
			back: 3,
			linecap: 'square'
		},
		second: {
			stroke: {
				lightness: '700',
				palette: 'accent'
			},
			strokeWidth: 0.5,
			length: 27,
			back: 6,
			linecap: 'square'
		}
	}
};

export default defaultTheme;
