<!-- https://github.com/rsdavis/svelte-collapsible/tree/main/src/components -->
<script>
	import { createEventDispatcher, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	/// STATE ///
	export let key = null;

	const dispatch = createEventDispatcher();

	// create a store for the children to access
	const store = writable({ key });

	// when the store changes, update the key prop
	$: dispatch('change', { key: $store.key });

	// when the key prop changes, update the store
	$: $store = { key };

	// make the store available to children
	setContext('accordion', store);
</script>

<ul>
	<slot />
</ul>
