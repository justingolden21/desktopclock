const minimalTheme = {
	name: 'Minimal Theme',
	face: {
		fill: {
			lightness: '100',
			palette: 'base'
		},
		strokeWidth: 0,
		shape: 'circle'
	},
	shadow: {
		fill: {
			lightness: '-1'
		}
	},
	pin: {
		fill: {
			lightness: '700',
			palette: 'base'
		},
		strokeWidth: 0,
		size: 1
	},
	numerals: {
		style: 'none'
	},
	ticks: {
		sm: {
			stroke: {
				lightness: '-1'
			}
		},
		md: {
			stroke: {
				lightness: '-1'
			}
		},
		lg: {
			stroke: {
				lightness: '-1'
			}
		}
	},
	hands: {
		hour: {
			stroke: {
				lightness: '700',
				palette: 'base'
			},
			strokeWidth: 1.5,
			length: 15,
			back: 0,
			linecap: 'round'
		},
		minute: {
			stroke: {
				lightness: '900',
				palette: 'accent'
			},
			strokeWidth: 1,
			length: 21,
			back: 0,
			linecap: 'round'
		},
		second: {
			stroke: {
				lightness: '-1'
			}
		}
	}
};

export default minimalTheme;
