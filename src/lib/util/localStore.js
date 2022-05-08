import { writable } from 'svelte/store';
import mergeDeep from './mergeSettings';

export function localStore(key, defaultValue) {
	const store = writable(defaultValue);

	if (typeof localStorage !== 'undefined') {
		const value = mergeDeep(defaultValue, JSON.parse(localStorage.getItem(key)));

		if (value !== null) store.set(value);

		store.subscribe((val) => {
			localStorage.setItem(key, JSON.stringify(val));
		});
	}

	return store;
}
