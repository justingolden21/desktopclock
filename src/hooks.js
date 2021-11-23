async function getLanguageDictionary(headers) {
	// toggle comment below to test another language
	// const lang = 'es';
	const lang = headers ? headers['accept-language']?.substr?.(0, 2) ?? 'en' : 'en';
	try {
		return (await import(`../static/lang/${lang}.json`)).default;
	} catch (error) {
		return (await import(`../static/lang/en.json`)).default;
	}
}

export async function handle({ request, resolve }) {
	request.locals.languageDictionary = await getLanguageDictionary(request.headers);
	request.locals.lang = request.headers
		? request.headers['accept-language']?.substr?.(0, 2) ?? 'en'
		: 'en';

	return await resolve(request);
}

export function getSession({ locals }) {
	return {
		languageDictionary: locals.languageDictionary,
		lang: locals.lang
	};
}
