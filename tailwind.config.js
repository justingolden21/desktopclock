const colors = require('tailwindcss/colors');

module.exports = {
	// mode: 'jit',
	purge: ['./dist/**/*.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		colors: {
			white: '#FFF',
			gray: colors.coolGray,
		},
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
