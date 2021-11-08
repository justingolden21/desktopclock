import defaultTheme from './default';

export default {
	...defaultTheme,
	pin: { ...defaultTheme.pin, fill: { ...defaultTheme.pin.fill, lightness: '900' } },
	face: { ...defaultTheme.face, fill: { ...defaultTheme.face.fill, lightness: '900' } }
};
