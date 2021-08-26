import { build, files, timestamp } from '$service-worker';

// `build` is an array of all the files generated by the bundler,
// `files` is an array of everything in the `static` directory
const assets = build.concat(files);

// use timestamp to generate a new cache name each build
const staticCacheName = `site-static-${timestamp}`;
// const dynamicCacheName = `site-dynamic-${timestamp}`;

// cache size limit function
const limitCacheSize = (name, size) => {
	caches.open(name).then((cache) => {
		cache.keys().then((keys) => {
			if (keys.length > size) {
				cache.delete(keys[0]).then(limitCacheSize(name, size));
			}
		});
	});
};

// install event
self.addEventListener('install', (evt) => {
	//console.log('service worker installed');
	evt.waitUntil(
		caches
			.open(staticCacheName)
			.then((cache) => {
				console.log('caching shell assets');
				console.log('Latest Build: ' + new Date(timestamp));
				cache.addAll(assets);
			})
			.then(() => {
				self.skipWaiting();
			})
	);
});

// activate event
self.addEventListener('activate', (evt) => {
	//console.log('service worker activated');
	evt.waitUntil(
		caches.keys().then((keys) => {
			//console.log(keys);
			return Promise.all(
				keys
					// .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
					.filter((key) => key !== staticCacheName)
					.map((key) => caches.delete(key))
			);
		})
	);
});

// fetch event
/*
self.addEventListener('fetch', (evt) => {
	//console.log('fetch event', evt);
	evt.respondWith(
		caches
			.match(evt.request)
			.then((cacheRes) => {
				return (
					cacheRes ||
					fetch(evt.request).then((fetchRes) => {
						return caches.open(dynamicCacheName).then((cache) => {
							cache.put(evt.request.url, fetchRes.clone());
							// check cached items size
							limitCacheSize(dynamicCacheName, 100);
							return fetchRes;
						});
					})
				);
			})
			.catch(() => {
				// if (evt.request.url.indexOf('.html') > -1) {
				// 	return caches.match('/pages/fallback.html');
				// }
			})
	);
});
*/