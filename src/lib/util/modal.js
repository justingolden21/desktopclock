// Utility functions for modals

import { writable, get } from 'svelte/store';

const modal = writable({});

const close = () => modal.set({});
const open = (name, data = {}) => modal.set({ name, data });
const toggle = (name, data = {}) => (!get(modal)?.name ? open(name, data) : close());

export { modal, close, open, toggle };
