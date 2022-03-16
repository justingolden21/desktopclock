import { writable } from 'svelte/store';
// import merge from 'lodash.merge';
import { mergeDeep } from './mergeSettings';

export function localStore(key, default_value) {
	// console.time('local store');
	let store = writable(default_value);

	if (typeof localStorage !== 'undefined') {
		// console.log(default_value);
		// console.log(JSON.parse(localStorage.getItem(key)));
		// console.time('merge settings');

		console.log('default', default_value?.baseColorPalette);
		console.log('default', default_value?.accentColorPalette);
		console.log('storage', JSON.parse(localStorage.getItem(key))?.baseColorPalette);
		console.log('storage', JSON.parse(localStorage.getItem(key))?.accentColorPalette);

		const value = mergeDeep(default_value, JSON.parse(localStorage.getItem(key)));

		console.log(value.baseColorPalette);
		console.log(value.accentColorPalette);

		// console.timeEnd('merge settings');
		// const value = merge(default_value, JSON.parse(localStorage.getItem(key)));
		if (value !== null) store.set(value);
		// console.log(value);

		console.log(value.baseColorPalette);
		console.log(value.accentColorPalette);

		store.subscribe((value) => {
			console.log(value.baseColorPalette);
			console.log(value.accentColorPalette);
			localStorage.setItem(key, JSON.stringify(value));
		});
	}

	// console.timeEnd('local store');

	return store;
}
