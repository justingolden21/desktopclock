// Color utility functions
// Used for conversion and to get the hex color string of a color object in theme settings

import TailwindColors from 'tailwindcss/colors.js';
import { get } from 'svelte/store';
import { settings } from '$lib/stores/settings.js';

// Used in `__layout` to generate color palette variables inside HTML
const hexToRgb = (hex) => {
	// https://stackoverflow.com/a/5624139/4907950
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
};

/**
 * Given a color object, return hex color
 * @param {object} obj: color information object from a theme
 * @param {string} lightness: a string (100, 200, 300) that represents the lightness of the color in the tailwind theme
 * if -1, return 'none' (transparent)
 * @param {string} palette: 'base' unless otherwise specified, 'accent' is the other valid color palette
 * @returns hex color string or 'none'
 */
const getColor = (obj) =>
	obj.lightness === '-1'
		? 'none'
		: TailwindColors[get(settings)[`${obj.palette}ColorPalette`]][obj.lightness];

export { hexToRgb, getColor };
