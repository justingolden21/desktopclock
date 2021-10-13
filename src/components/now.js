import { writable } from 'svelte/store';

export const now = new writable(new Date());
