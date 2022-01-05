const colors = require('tailwindcss/colors.js');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	mode: 'jit',
	purge: {
		content: ['./src/**/*.{html,js,svelte,ts}'],
		options: {
			safelist: ['dark']
		}
	},
	darkMode: 'class',
	theme: {
		colors: {
			// ...colors,
			white: '#FFF',
			gray: colors.blueGray
		},
		screens: {
			xs: '360px',
			...defaultTheme.screens
		},
		fontSize: {
			...defaultTheme.fontSize,
			'10xl': '10rem',
			'11xl': '12rem'
		},
		extend: {}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
