const classicTheme = {
	face: {
		stroke: '#999',
		fill: '#fff',
		strokeWidth: 2,
		shape: 'circle'
	},
	shadow: {
		fill: -1 // transparent
	},
	pin: {
		stroke: -1, // transparent
		fill: '#900',
		strokeWidth: 0,
		size: 1
	},
	ticks: {
		sm: {
			stroke: '#999',
			height: 1,
			width: 1
		},
		md: {
			stroke: '#666',
			height: 1.5,
			width: 3
		},
		lg: {
			stroke: '#333',
			height: 2,
			width: 5
		}
	},
	hands: {
		hour: {
			stroke: '#333',
			strokeWidth: 1.5,
			length: 15,
			back: 3,
			linecap: 'round'
		},
		minute: {
			stroke: '#666',
			strokeWidth: 1,
			length: 21,
			back: 3,
			linecap: 'round'
		},
		second: {
			stroke: '#900',
			strokeWidth: 0.5,
			length: 27,
			back: 9,
			linecap: 'round'
		}
	}
};

export default classicTheme;
