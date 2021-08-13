const colors = require('tailwindcss/colors');
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
			white: '#FFF',
			gray: colors.blueGray
		},
		screens: {
			xs: '360px',
			...defaultTheme.screens
		},
		extend: {}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
