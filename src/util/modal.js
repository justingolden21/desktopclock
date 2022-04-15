// set this to null to close the modal

import { writable, get } from 'svelte/store';

export const modal = writable({});

export const close = () => modal.set({});
export const open = (name, data = {}) => modal.set({ name, data });
export const toggle = (name, data = {}) => (!get(modal)?.name ? open(name, data) : close());
