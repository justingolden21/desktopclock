// https://dev.to/danawoodman/svelte-quick-tip-creating-a-toast-notification-system-ge3

import { writable } from 'svelte/store';

import uid from '$lib/util/uid';

export const toasts = writable([]);

export const dismissToast = (id) => {
	toasts.update((all) => all.filter((t) => t.id !== id));
};

// constructor: addToast({ message, type, dismissible, timeout })}
export const addToast = (toast) => {
	const id = uid();

	// TODO: default timeout not working
	const defaults = {
		id,
		type: 'info',
		dismissible: true,
		timeout: 3000
	};

	toasts.update((all) => [{ ...defaults, ...toast }, ...all]);

	if (toast.timeout) setTimeout(() => dismissToast(id), toast.timeout);
};
