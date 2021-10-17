// '-1' is transparent
// numbers representing colors (100,200,300... and -1) are strings

const defaultTheme = {
	face: {
		stroke: '700',
		fill: '200',
		strokeWidth: 0,
		shape: 'circle'
	},
	shadow: {
		fill: '700'
	},
	pin: {
		stroke: {
			color: 'red',
			lightness: '700'
		},
		fill: '200',
		strokeWidth: 0.5,
		size: 1
	},
	ticks: {
		sm: {
			stroke: '-1',
			height: 0.5,
			width: 2
		},
		md: {
			stroke: '400',
			height: 0.5,
			width: 3
		},
		lg: {
			stroke: '500',
			height: 0.5,
			width: 5
		}
	},
	hands: {
		hour: {
			stroke: {
				lightness: '700'
			},
			strokeWidth: 1,
			length: 15,
			back: 3,
			linecap: 'butt'
		},
		minute: {
			stroke: {
				lightness: '500'
			},
			strokeWidth: 0.5,
			length: 21,
			back: 3,
			linecap: 'butt'
		},
		second: {
			stroke: {
				color: 'red',
				lightness: '700'
			},
			strokeWidth: 0.5,
			length: 27,
			back: 6,
			linecap: 'butt'
		}
	}
};

export default defaultTheme;
