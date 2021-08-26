export async function get({ locals })
{
    return {
        status: 200,
        body: {
            "name": locals.language_dictionary.appName,
            "short_name": locals.language_dictionary.appShortName,
            "description":  locals.language_dictionary.appDescription,
            "start_url": "index.html",
            "display": "standalone",
            "background_color": "#FFFFFF",
            "theme_color": "#FFFFFF",
            "orientation": "portrait-primary",
            "icons": [
                {
                    "src": "img/icons/manifest-icon-192.png",
                    "sizes": "192x192",
                    "type": "image/png",
                    "purpose": "maskable any"
                },
                {
                    "src": "img/icons/manifest-icon-512.png",
                    "sizes": "512x512",
                    "type": "image/png",
                    "purpose": "maskable any"
                }
            ]
        }
    }
}