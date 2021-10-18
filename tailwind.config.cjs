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
		// extend: {
		// 	colors: {
		// 		gray: colors.blueGray
		// 	}
		// },
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
