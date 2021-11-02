import { writable } from 'svelte/store';

export function localStore(key, default_value) {
	let store = writable(default_value);

	if (typeof localStorage !== 'undefined') {
		const value = localStorage.getItem(key);
		if (value !== null) store.set(JSON.parse(value));

		store.subscribe((value) => {
			localStorage.setItem(key, JSON.stringify(value));
		});
	}

	return store;
}
