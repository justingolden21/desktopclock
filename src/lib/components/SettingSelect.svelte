<script>
	import { systemFontFamilies } from '$lib/data/consts.js';

	/*
    id: id of select and for label
    selectLabel: label text
    value: current value of select (can be bound)
    disabled: disabled attr of select
    values: list of values to loop through, option values
    labels: array of labels for each option, indexed by values
    onchange: function that runs on:change
    labelMapper: custom function that maps a value to a label string
    dynamicFont: true if each option should have a font family according to its value (for font family pickers)
    */
	export let id = undefined,
		selectLabel = undefined,
		value,
		disabled = false,
		values,
		labels = undefined,
		onchange = undefined,
		labelMapper = undefined,
		dynamicFont = false;
</script>

{#if selectLabel}
	<label for={id}>{selectLabel}</label>
{/if}
<select {id} {disabled} bind:value on:change={onchange}>
	{#each values as val}
		<option
			value={val}
			style={dynamicFont && val === ''
				? `font-family:${systemFontFamilies}`
				: `font-family:${dynamicFont ? val : ''}`}
			>{labelMapper ? labelMapper(val) : labels ? labels[val] : val}</option>
	{/each}
</select>
