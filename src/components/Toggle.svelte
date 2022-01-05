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
	<label for={id} class="hover:text-gray-500 dark:hover:text-gray-400">
		{labelText}
	</label>
</div>

<style lang="postcss">
	.toggle-checkbox {
		@apply left-0 absolute block w-6 h-6 rounded-full bg-white border-gray-200 border-4 appearance-none cursor-pointer;
		@apply dark:bg-gray-100 dark:border-gray-300;
		transition: left 0.25s;
	}
	.toggle-checkbox:checked {
		@apply left-6 border-gray-400;
		@apply dark:border-gray-500;
	}
	.toggle-checkbox + .toggle-bg {
		@apply block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer;
		@apply dark:bg-gray-400;
		transition: background-color 0.25s;
	}
	.toggle-checkbox:checked + .toggle-bg {
		@apply bg-gray-500;
		@apply dark:bg-gray-600;
	}
</style>
