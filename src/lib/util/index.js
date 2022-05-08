import TailwindColors from 'tailwindcss/colors';
import { settings } from '$lib/stores/settings';
import { get } from 'svelte/store';

// https://stackoverflow.com/a/5624139/4907950
export function hexToRgb(hex) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

// return the hex color given a string or object with color information from a theme
// lightness is a string (100, 200, 300) that represents the lightness of the color in the tailwind theme
// if falsey or '-1', return 'none' (lack of value or '-1' results in a transparent color)
// palette is 'base' unless otherwise specified, 'accent' is the other valid color palette
export function getColor(obj) {
	const palette = obj.palette == 'accent' ? 'accentColorPalette' : 'baseColorPalette';
	return obj.lightness === '-1' ? 'none' : TailwindColors[get(settings)[palette]][obj.lightness];
}
