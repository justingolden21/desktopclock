<script>
	import { session } from '$app/stores';

	import Modal from '../Modal.svelte';
	import Icon from '../Icon.svelte';
	import NewWorldclock from './NewWorldclock.svelte';

	$: dictionary = $session.languageDictionary;

	let newWorldclockModal;
</script>

<img src="img/time_management_undraw.svg" alt="" class="w-72 mx-auto mt-4" />
<p class="my-4">
	{dictionary.worldclockSettings["You don't have any other worldclocks. Try adding a new one"]}
</p>
<!-- copied from worldclock tray: -->
<button
	class="icon-btn rounded-none bg-transparent mx-auto"
	on:click={() => newWorldclockModal.show()}
	aria-label={dictionary.worldclockSettings['New timezone']}
	title={dictionary.worldclockSettings['New timezone']}>
	<Icon name="plus" class="inline-block w-8 h-8" />
	<span>{dictionary.labels['New']}</span>
</button>

<Modal
	bind:this={newWorldclockModal}
	title={$session.languageDictionary.worldclockSettings['New timezone']}
	icon="plus_circle">
	<NewWorldclock bind:modal={newWorldclockModal} />
</Modal>
