async function getLanguageDictionary(lang) {
	try {
		return (await import(`../static/lang/${lang}.json`)).default;
	} catch (error) {
		return (await import('../static/lang/en.json')).default;
	}
}

export async function handle({ event, resolve }) {
	event.locals.lang = event.request.headers.get('accept-language')?.substr(0, 2) || 'en';
	event.locals.languageDictionary = await getLanguageDictionary(event.locals.lang);

	return resolve(event);
}

export function getSession({ locals }) {
	return {
		languageDictionary: locals.languageDictionary,
		lang: locals.lang
	};
}
