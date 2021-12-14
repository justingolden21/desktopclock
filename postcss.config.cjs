const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssimport = require('postcss-import');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

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
