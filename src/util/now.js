// exports a vanilla JS date to be used as a universal point of truth
// can be converted to a dayjs object for timezone, locale, etc.

import { writable } from 'svelte/store';

export const now = new writable(new Date());
