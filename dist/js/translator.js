const translations = {
	en: {
		title: 'Desktop Clock',
	},
	es: {
		title: 'Reloj Sencillo',
	},
};
function translate(lang) {
	u('#title-text').html(translations[lang]['title']);
}
