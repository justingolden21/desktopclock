const classicTheme = {
	face: {
		// prev #999 now #64748B
		stroke: {
			lightness: '500'
		},
		// prev #fff now #F8FAFC
		fill: {
			lightness: '50'
		},
		strokeWidth: 2,
		shape: 'circle'
	},
	shadow: {
		fill: '-1' // transparent
	},
	pin: {
		stroke: '-1', // transparent
		// prev #900 now #991B1B
		fill: {
			color: 'red',
			lightness: '800'
		},
		strokeWidth: 0,
		size: 1
	},
	ticks: {
		sm: {
			// prev #999 now #64748B
			stroke: {
				lightness: '500'
			},
			height: 1,
			width: 1
		},
		md: {
			// prev #666 now #475569
			stroke: {
				lightness: '600'
			},
			height: 1.5,
			width: 3
		},
		lg: {
			// prev #333 now #1E293B
			stroke: {
				lightness: '800'
			},
			height: 2,
			width: 5
		}
	},
	hands: {
		hour: {
			// prev #333 now #1E293B
			stroke: {
				lightness: '800'
			},
			strokeWidth: 1.5,
			length: 15,
			back: 3,
			linecap: 'round'
		},
		minute: {
			// prev #666 now #475569
			stroke: {
				lightness: '600'
			},
			strokeWidth: 1,
			length: 21,
			back: 3,
			linecap: 'round'
		},
		second: {
			// prev #900 now #991B1B
			stroke: {
				color: 'red',
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
