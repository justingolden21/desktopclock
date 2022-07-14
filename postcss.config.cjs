const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssimport = require('postcss-import');

const dev = process.env.NODE_ENV === 'development';

module.exports = {
	plugins: [
		// postcss needs to run before tailwind
		postcssimport(),
		tailwindcss(),
		// autoprefixer needs to run after tailwind
		autoprefixer(),
		!dev &&
			cssnano({
				preset: 'default'
			})
	]
};
