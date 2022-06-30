import { writable } from 'svelte/store';
import mergeDeep from './mergeSettings';

const localStore = (key, defaultValue) => {
	const store = writable(defaultValue);

	if (typeof localStorage !== 'undefined') {
		const lsVal = JSON.parse(localStorage.getItem(key)) ?? {};
		const value = { ...defaultValue, ...lsVal };

		if (value !== null) store.set(value);

		store.subscribe((val) => {
			localStorage.setItem(key, JSON.stringify(val));
		});
	}

	return store;
};

export default localStore;
