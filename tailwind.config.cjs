const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

// https://stackoverflow.com/a/70480061/4907950
// https://github.com/adamwathan/tailwind-css-variable-text-opacity-demo
function withOpacity(cssVariable) {
	return ({ opacityVariable, opacityValue }) => {
		if (opacityValue !== undefined) {
			return `rgba(var(${cssVariable}), ${opacityValue})`;
		}
		if (opacityVariable !== undefined) {
			return `rgba(var(${cssVariable}), var(${opacityVariable}, 1))`;
		}
		return `rgb(var(${cssVariable}))`;
	};
}

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['dark'],
	darkMode: 'class',
	theme: {
		colors: {
			// ...colors,
			white: '#FFF',
			gray: colors.slate,
			transparent: 'transparent'
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
		extend: {
			screens: {
				supershort: { raw: '(max-height: 240px)' },
				short: { raw: '(max-height: 480px)' },
				tall: { raw: '(min-height: 720px)' }
			},
			colors: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'].reduce(
				(obj, item) => {
					return {
						...obj,
						[`base-${item}`]: withOpacity(`--base-${item}`),
						[`accent-${item}`]: withOpacity(`--accent-${item}`)
					};
				},
				{}
			)
		}
	},
	plugins: []
};
