async function getLanguageDictionary(headers) {
	// toggle comment below to test another language
	// const lang = 'es';
	const lang = headers ? headers['accept-language']?.substr?.(0, 2) ?? 'en' : 'en';
	try {
		return (await import(`./lang/${lang}.json`)).default;
	} catch (error) {
		return (await import(`./lang/en.json`)).default;
	}
}

export async function handle({ request, resolve }) {
	request.locals.languageDictionary = await getLanguageDictionary(request.headers);

	return await resolve(request);
}

export function getSession({ locals }) {
	return {
		languageDictionary: locals.languageDictionary
	};
}
