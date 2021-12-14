import { writable } from 'svelte/store';
import merge from 'lodash.merge';

export function localStore(key, default_value) {
	let store = writable(default_value);

	if (typeof localStorage !== 'undefined') {
		const value = merge(default_value, JSON.parse(localStorage.getItem(key)));
		if (value !== null) store.set(value);

		store.subscribe((value) => {
			localStorage.setItem(key, JSON.stringify(value));
		});
	}

	return store;
}
