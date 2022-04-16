<!-- https://github.com/rsdavis/svelte-collapsible/tree/main/src/components -->
<script>
	import { createEventDispatcher, onDestroy, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let key = null;

	const dispatch = createEventDispatcher();

	// create a store for the children to access
	const store = writable({ key });

	// when the store changes, update the key prop
	const unsubscribe = store.subscribe((s) => {
		key = s.key;
		dispatch('change', { key });
	});

	// when the key prop changes, update the store
	$: store.update((s) => Object.assign(s, { key }));

	// make the store available to children
	setContext('accordion', store);

	onDestroy(unsubscribe);
</script>

<ul>
	<slot />
</ul>
