import { writable } from 'svelte/store';
import { mergeDeep } from './mergeSettings';

export function localStore(key, default_value) {
	let store = writable(default_value);

	if (typeof localStorage !== 'undefined') {
		const value = mergeDeep(default_value, JSON.parse(localStorage.getItem(key)));

		if (value !== null) store.set(value);

		store.subscribe((value) => {
			localStorage.setItem(key, JSON.stringify(value));
		});
	}

	return store;
}
