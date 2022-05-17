<script>
	/// UTILS ///
	import clickOutside from '$lib/util/clickOutside';
	import { removeBold, splitStringThree } from './string';

	/// STATE ///
	export let options;
	export let placeholder = '';
	export let value = '';
	export let disabled = false;
	export let closeOnClickAway = true;
	export let id = '';

	// min characters in input for autocomplete to appear
	export let minChars = 2;
	// max results to show at a time
	export let maxResults = 20;

	// filter options based on input
	let filteredOptions = [];

	/**
	 * inputValue is the value used for the component
	 * we export a value back to the consumer only if it's valid (if it's included in the given options)
	 *
	 * make new variable for inputValue and on inputValue change set value to it only if it's one of the options
	 */
	let inputValue = value;
	$: if (options.includes(inputValue)) value = inputValue;

	const filterOptions = () => {
		if (!inputValue || inputValue.length < minChars) {
			filteredOptions = [];
			highlightIdx = null;
			return;
		}
		let newOptions = [];
		let numResults = 0;
		for (const option of options) {
			// replace spaces with underscores for timezone input
			const foundIdx = option
				.toLowerCase()
				.replace(/ /g, '_')
				.indexOf(inputValue.toLowerCase().replace(/ /g, '_'));
			if (foundIdx !== -1) {
				const splitString = splitStringThree(option, 0, foundIdx, foundIdx + inputValue.length);
				const boldString = `${splitString[0]}<strong>${splitString[1]}</strong>${splitString[2]}`;
				newOptions.push(boldString);

				numResults++;
				if (maxResults && numResults >= maxResults) {
					break;
				}
			}
		}
		filteredOptions = newOptions;
	};

	// handle user input

	let searchInput;

	const setInputVal = (optionName) => {
		inputValue = removeBold(optionName);
		filteredOptions = [];
		highlightIdx = null;
		searchInput.focus();
	};

	// use keyboard to navigate and highlight options

	let highlightIdx = null;

	const navigateList = (e) => {
		// if autocomplete input is not focused, return
		if (document.activeElement !== searchInput) return;

		if (e.key === 'ArrowDown') {
			if (highlightIdx === null) {
				highlightIdx = 0;
			} else {
				highlightIdx++;
			}
		} else if (e.key === 'ArrowUp') {
			if (highlightIdx === null) {
				highlightIdx = filteredOptions.length - 1;
			} else {
				highlightIdx--;
			}
		} else if (e.key === 'Enter' && filteredOptions.length > 0) {
			if (highlightIdx !== null) {
				setInputVal(filteredOptions[highlightIdx]);
			} else if (filterOptions) {
				setInputVal(filteredOptions[0]);
			}
		} else if (e.key === 'Escape') {
			filteredOptions = [];
		}
		if (highlightIdx >= filteredOptions.length) highlightIdx = 0;
		if (highlightIdx < 0) highlightIdx = filteredOptions.length - 1;
	};
</script>

<svelte:window on:keydown={navigateList} />

<div class="relative inline-block w-64">
	{value}
	<input
		{id}
		spellcheck="false"
		autocomplete="off"
		type="text"
		class="w-full"
		{disabled}
		{placeholder}
		bind:this={searchInput}
		bind:value={inputValue}
		on:input={filterOptions} />
	{#if filteredOptions.length > 0}
		<ul
			class="absolute w-full max-h-64 overflow-y-auto z-10"
			use:clickOutside
			on:click_outside={() => {
				if (closeOnClickAway) filteredOptions = [];
			}}>
			{#each filteredOptions as option, i}
				<li
					class="block autocomplete-item p-2 cursor-pointer border-2 border-t-0 border-base-200 dark:border-base-700
                    hover:bg-accent-600 hover:dark:bg-accent-500 hover:text-white {i ===
					highlightIdx
						? 'bg-accent-200 dark:bg-accent-800'
						: 'bg-base-50 dark:bg-base-900'}"
					on:click={() => setInputVal(option)}>
					{@html option}
				</li>
			{/each}
		</ul>
	{/if}
</div>
