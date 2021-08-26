async function getLanguageDictionary(headers)
{
    // const lang = 'es'; // testing
    const lang = headers['accept-language']?.substr?.(0, 2) ?? 'en';
    try
    {
        return ( await import(`./lang/${lang}.json` ) ).default;
    }
    catch( error )
    {
       return ( await import(`./lang/en.json` ) ).default;
    }
}

export async function handle({ request, resolve })
{
    request.locals.language_dictionary = await getLanguageDictionary(request.headers)

	return await resolve(request);
}

export function getSession({ locals })
{
    return {
        language_dictionary: locals.language_dictionary
    }
}