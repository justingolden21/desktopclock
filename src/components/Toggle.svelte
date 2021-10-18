<script>
	export let checked;
	export let id;
	export let labelText;
</script>

<div class="toggle-container">
	<input bind:checked type="checkbox" {id} class="toggle-checkbox" />
	<label class="toggle-bg" on:click={() => (checked = !checked)} />
</div>
<label for={id} class="toggle-label">
	{labelText}
</label>

<style lang="postcss">
	.toggle-container {
		@apply relative inline-block w-12 m-2 ml-0 align-middle select-none;
	}
	.toggle-checkbox {
		@apply left-0 absolute block w-6 h-6 rounded-full bg-white border-gray-200 border-4 appearance-none cursor-pointer;
		transition: left 0.25s;
	}
	.toggle-checkbox:checked {
		@apply left-6 border-gray-400;
	}
	.toggle-checkbox + .toggle-bg {
		@apply block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer;
		transition: background-color 0.25s;
	}
	.toggle-checkbox:checked + .toggle-bg {
		@apply bg-gray-500;
	}

	.toggle-label:hover {
		@apply text-gray-500;
	}

	/* dark */

	:global(body.dark) .toggle-checkbox {
		@apply bg-gray-100 border-gray-300;
	}
	:global(body.dark) .toggle-checkbox + .toggle-bg {
		@apply bg-gray-400;
	}
	:global(body.dark) .toggle-checkbox:checked {
		@apply border-gray-500;
	}
	:global(body.dark) .toggle-checkbox:checked + .toggle-bg {
		@apply bg-gray-600;
	}

	:global(body.dark) .toggle-label:hover {
		@apply text-gray-400;
	}
</style>
