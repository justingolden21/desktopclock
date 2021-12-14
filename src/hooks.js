async function getLanguageDictionary(lang) {
	try {
		return (await import(`../static/lang/${lang}.json`)).default;
	} catch (error) {
		return (await import(`../static/lang/en.json`)).default;
	}
}

export async function handle({ request, resolve }) {
	request.locals.lang = request.headers
		? request.headers['accept-language']?.substr(0, 2) ?? 'en'
		: 'en';
	request.locals.languageDictionary = await getLanguageDictionary(request.locals.lang);

	return await resolve(request);
}

export function getSession({ locals }) {
	return {
		languageDictionary: locals.languageDictionary,
		lang: locals.lang
	};
}
