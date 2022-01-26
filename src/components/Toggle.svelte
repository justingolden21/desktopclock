<script>
	export let checked;
	export let id;
	export let labelText;
</script>

<div class="block">
	<div class="relative inline-block w-12 m-2 ml-0 align-middle select-none">
		<input bind:checked type="checkbox" {id} class="toggle-checkbox" on:change />
		<label for={id} class="toggle-bg" />
	</div>
	<label for={id} class="hover:text-base-500 dark:hover:text-base-400">
		{labelText}
	</label>
</div>

<style lang="postcss">
	.toggle-checkbox {
		@apply left-0 absolute block w-6 h-6 rounded-full bg-white border-base-200 border-4 appearance-none cursor-pointer;
		transition: left 0.25s;
	}
	.toggle-checkbox:checked {
		@apply left-6 border-base-400;
	}
	.toggle-checkbox + .toggle-bg {
		@apply block overflow-hidden h-6 rounded-full bg-base-300 cursor-pointer transition-colors;
	}
	.toggle-checkbox:checked + .toggle-bg {
		@apply bg-base-500;
	}

	:global(.dark) .toggle-checkbox {
		@apply bg-base-100 border-base-300;
	}
	:global(.dark) .toggle-checkbox:checked {
		@apply border-base-500;
	}
	:global(.dark) .toggle-checkbox + .toggle-bg {
		@apply bg-base-400;
	}
	:global(.dark) .toggle-checkbox:checked + .toggle-bg {
		@apply bg-base-600;
	}
</style>
