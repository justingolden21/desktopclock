import { fontFamilies } from '$lib/data/consts';

// https://stackoverflow.com/a/65917124/4907950
const addStylesheetURL = (url) => {
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = url;
	document.getElementsByTagName('head')[0].appendChild(link);
};

const addFontsStylesheets = (fonts) => {
	const fontsURL = Object.keys(fonts)
		.map((font) =>
			font === ''
				? ''
				: `family=${font.split(' ').join('+')}${
						fonts[font] && fonts[font].length > 1 ? ':wght@' + fonts[font].join(';') : ''
				  }&`
		)
		.join('');
	// console.dir(`https://fonts.googleapis.com/css2?${fontsURL}display=swap`);
	addStylesheetURL(`https://fonts.googleapis.com/css2?${fontsURL}display=swap`);
};

export const loadFonts = () => {
	// addStylesheetURL(
	//  'https://fonts.googleapis.com/css2?family=Aldrich&family=Arsenal:wght@400;700&family=Bai+Jamjuree:wght@300;500;700&family=Bitter:wght@300;500;700&family=Comfortaa:wght@300;400;500;600;700&family=Josefin+Sans:wght@300;500;700&family=Julius+Sans+One&family=Jura:wght@300;500;700&family=K2D:wght@300;500;700&family=KoHo:wght@300;500;700&family=Libre+Baskerville:wght@400;700&family=Limelight&family=Major+Mono+Display&family=Montserrat+Alternates:wght@300;600;900&family=Orbitron:wght@400;600;800&family=Yatra+One&display=swap'
	// );
	addFontsStylesheets(fontFamilies);
};
