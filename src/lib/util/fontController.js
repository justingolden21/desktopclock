import { fontFamilies } from '$lib/data/consts';

// https://stackoverflow.com/a/65917124/4907950
const addStylesheetURL = (url) => {
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = url;
	document.getElementsByTagName('head')[0].appendChild(link);
};

const addFontsStylesheets = (fonts) => {
	const fontsURL = Object.entries(fonts)
		.map(([font, weights]) =>
			font
				? `family=${font.split(' ').join('+')}${
						weights && weights.length > 1 ? ':wght@' + weights.join(';') : ''
				  }&`
				: ''
		)
		.join('');
	addStylesheetURL(`https://fonts.googleapis.com/css2?${fontsURL}display=optional`);
};

export const loadFonts = () => {
	addFontsStylesheets(fontFamilies);
};
