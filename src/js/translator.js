const translations = {
	en: {
		title: 'Desktop Clock',
	},
	es: {
		title: 'Reloj Sencillo',
	},
};

// TODO: add translations for nav items and modal content

function translate(lang) {
	u('#title-text').html(translations[lang]['title']);
}
