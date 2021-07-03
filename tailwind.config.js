const colors = require('tailwindcss/colors');

module.exports = {
	// mode: 'jit',
	purge: {
		content: ['./dist/**/*.html'],
		options: {
			safelist: ['dark'],
		},
	},
	darkMode: 'class',
	theme: {
		colors: {
			white: '#FFF',
			gray: colors.blueGray,
		},
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
