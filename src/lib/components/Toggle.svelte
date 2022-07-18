<script>
	export let checked;
	export let id;
	export let labelText;
</script>

<div class="block">
	<div class="relative inline-block w-12 m-2 ml-1 align-middle select-none">
		<input bind:checked type="checkbox" {id} class="toggle-checkbox" on:change />
		<label for={id} class="toggle-bg" />
	</div>
	<label for={id} class="hover:text-base-500 dark:hover:text-base-400 select-none">
		{labelText}
	</label>
</div>

<style global>
	:local(.toggle-checkbox) {
		@apply left-0 absolute block w-6 h-6 rounded-full bg-white border-base-300 border-4 appearance-none cursor-pointer dark:bg-base-100 dark:border-base-400;
		transition: left 0.25s;
	}
	:local(.toggle-checkbox):checked {
		@apply left-6 border-base-500 dark:border-base-600;
	}
	:local(.toggle-checkbox) + :local(.toggle-bg) {
		@apply block overflow-hidden h-6 rounded-full bg-base-300 cursor-pointer transition-colors dark:bg-base-400;
	}
	:local(.toggle-checkbox):checked + :local(.toggle-bg) {
		@apply bg-base-500 dark:bg-base-600;
	}
</style>
