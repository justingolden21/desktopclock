import defaultTheme from './default';

export default {
	...defaultTheme,
	name: 'Default Night Theme',
	pin: { ...defaultTheme.pin, fill: { ...defaultTheme.pin.fill, lightness: '900' } },
	numerals: { ...defaultTheme.numerals, fill: { ...defaultTheme.numerals.fill, lightness: '300' } },
	face: { ...defaultTheme.face, fill: { ...defaultTheme.face.fill, lightness: '900' } }
};
