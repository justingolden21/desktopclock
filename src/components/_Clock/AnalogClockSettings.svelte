<script>
	import { session } from '$app/stores';

	import { settings } from '../settings.js';

	import Icon from '../Icon.svelte';
	import AnalogClock from './AnalogClock.svelte';
	import ColorSelector from '../ColorSelector.svelte';
	import SettingSelect from '../SettingSelect.svelte';
	import { fontFamilies, movements, numeralStyles } from '../../data/consts.js';

	import defaultTheme from '../../themes/default';
	import defaultNightTheme from '../../themes/defaultNight';
	import classicTheme from '../../themes/classic';
	import classicNightTheme from '../../themes/classicNight';

	$: dictionary = $session.languageDictionary;

	// check and hide ticks behind numerals
	function numeralsChange(evt) {
		const hideTicks = (size) => {
			// if face is transparent, don't bother
			if ($settings.clock.theme.face.fill.lightness === '-1') return;

			// set the ticks to be same color as face
			// (if we just make it width 0 or lightness -1, the smaller ticks show through)
			$settings.clock.theme.ticks[size].stroke.lightness =
				$settings.clock.theme.face.fill.lightness;
			$settings.clock.theme.ticks[size].stroke.palette = $settings.clock.theme.face.fill.palette;

			// prevent other ticks from showing through
			$settings.clock.theme.ticks[size].width = Math.min(
				Math.max($settings.clock.theme.ticks['md'].width, $settings.clock.theme.ticks['sm'].width) +
					1,
				5
			);
			$settings.clock.theme.ticks[size].height = Math.min(
				Math.max(
					$settings.clock.theme.ticks['md'].height,
					$settings.clock.theme.ticks['sm'].height
				) + 0.5,
				2.5
			);
		};
		const style = evt.target.value;
		const lgStyles = ['numerals', 'fourNumerals', 'numbers', 'fourNumbers'];
		const mdStyles = ['numerals', 'numbers'];
		if (mdStyles.includes(style)) hideTicks('md');
		if (lgStyles.includes(style)) hideTicks('lg');
	}
</script>

<div
	class="float-right fixed right-16 top-72 w-32 h-32 p-1 rounded-full bg-opacity-75 bg-base-300 dark:bg-base-500 hidden md:block">
	<AnalogClock theme={$settings.clock.theme} mode="static" time={{ h: 10, m: 9, s: 0 }} />
</div>
<!-- using stringify for efficient deep clone so original theme object is not mutated -->
{#each [defaultTheme, defaultNightTheme, classicTheme, classicNightTheme] as clockTheme}
	<button
		class="btn theme-btn"
		on:click={() => ($settings.clock.theme = JSON.parse(JSON.stringify(clockTheme)))}>
		<Icon name="theme" class="inline w-6 h-6" />
		{dictionary.clockSettings[clockTheme.name]}
	</button>
{/each}
<button
	class="btn theme-btn"
	on:click={() => {
		for (const size of 'sm md lg'.split(' '))
			$settings.clock.theme.ticks[size].stroke.lightness = '-1';
	}}>
	<Icon name="settings" class="inline w-6 h-6" />
	{dictionary.clockSettings['Simple Mode']}
</button>

<br />

<SettingSelect
	id="second-hand-movement-select"
	selectLabel={dictionary.clockSettings['Second hand movement:']}
	bind:value={$settings.clock.secondHandMovement}
	values={movements}
	labels={dictionary.labels['Movements']} />

<div class="grid lg:grid-cols-2 xl:grid-cols-3">
	<div>
		<h3>{dictionary.clockSettings['Face']}</h3>
		<div>
			<ColorSelector bind:colorObj={$settings.clock.theme.face.fill} label="Fill color" />
		</div>
		<div>
			<ColorSelector bind:colorObj={$settings.clock.theme.shadow.fill} label="Shadow fill color" />
		</div>
		<div>
			<SettingSelect
				id="face-stroke-width-select"
				selectLabel={dictionary.display['Stroke width:']}
				bind:value={$settings.clock.theme.face.strokeWidth}
				values={[...Array(6).keys()]} />
		</div>
		{#if $settings.clock.theme.face.strokeWidth !== 0}
			<div>
				<ColorSelector bind:colorObj={$settings.clock.theme.face.stroke} label="Stroke color" />
			</div>
		{/if}
		<div>
			<SettingSelect
				id="face-shape-select"
				selectLabel={dictionary.display['Shape:']}
				bind:value={$settings.clock.theme.face.shape}
				values={['circle', 'rounded', 'square']}
				labels={dictionary.display.shapes} />
		</div>
	</div>
	<div>
		<h3>{dictionary.clockSettings['Pin']}</h3>
		<div>
			<SettingSelect
				id="pin-size-select"
				selectLabel={dictionary.display['Size:']}
				bind:value={$settings.clock.theme.pin.size}
				values={[...Array(6).keys()].map((x) => x / 2)} />
		</div>
		{#if $settings.clock.theme.pin.size !== 0}
			<div>
				<ColorSelector bind:colorObj={$settings.clock.theme.pin.fill} label="Fill color" />
			</div>
			<div>
				<SettingSelect
					id="pin-stroke-width-select"
					selectLabel={dictionary.display['Stroke width:']}
					bind:value={$settings.clock.theme.pin.strokeWidth}
					values={[...Array(7).keys()].map((x) => x / 2)} />
			</div>
			{#if $settings.clock.theme.pin.strokeWidth !== 0}
				<div>
					<ColorSelector bind:colorObj={$settings.clock.theme.pin.stroke} label="Stroke color" />
				</div>
			{/if}
		{/if}
	</div>
	<div>
		<h3>{dictionary.clockSettings['Numerals']}</h3>
		<div>
			<SettingSelect
				id="numerals-select"
				selectLabel={dictionary.clockSettings['Numeral Style:']}
				bind:value={$settings.clock.theme.numerals.style}
				onchange={numeralsChange}
				values={Object.keys(numeralStyles)}
				labels={dictionary.labels['Numeral Styles']} />
		</div>
		{#if $settings.clock.theme.numerals.style !== 'none'}
			<div>
				<ColorSelector bind:colorObj={$settings.clock.theme.numerals.fill} label="Fill color" />
			</div>

			<SettingSelect
				id="numerals-font-family-select"
				selectLabel={dictionary.labels['Font family:']}
				bind:value={$settings.clock.theme.numerals.fontFamily}
				onchange={numeralsChange}
				values={Object.keys(fontFamilies).filter((x) => x !== '')}
				dynamicFont={true} />
		{/if}
	</div>
</div>

<h3>{dictionary.clockSettings['Ticks']}</h3>

<div class="grid lg:grid-cols-2 xl:grid-cols-3">
	{#each ['sm', 'md', 'lg'] as size}
		<div>
			<h4>
				{dictionary.clockSettings.sizes[{ sm: 'small', md: 'medium', lg: 'large' }[size]]}
			</h4>
			<div>
				<ColorSelector
					bind:colorObj={$settings.clock.theme.ticks[size].stroke}
					label="Stroke color" />
			</div>
			{#if $settings.clock.theme.ticks[size].stroke.lightness !== '-1'}
				<div>
					<SettingSelect
						id="{size}-tick-width-select"
						selectLabel={dictionary.display['Width:']}
						bind:value={$settings.clock.theme.ticks[size].width}
						values={[...Array(6).keys()]} />
				</div>
				<div>
					<SettingSelect
						id="{size}-tick-height-select"
						selectLabel={dictionary.display['Height:']}
						bind:value={$settings.clock.theme.ticks[size].height}
						values={[...Array(6).keys()].map((x) => x / 2)} />
				</div>
			{/if}
		</div>
	{/each}
</div>

<h3>{dictionary.clockSettings['Hands']}</h3>

<div class="grid lg:grid-cols-2 xl:grid-cols-3">
	{#each ['hour', 'minute', 'second'] as hand}
		<div>
			<h4>
				{dictionary.clockSettings[{ hour: 'Hour', minute: 'Minute', second: 'Second' }[hand]]}
			</h4>
			<div>
				<ColorSelector
					bind:colorObj={$settings.clock.theme.hands[hand].stroke}
					label="Stroke color" />
			</div>
			{#if $settings.clock.theme.hands[hand].stroke.lightness !== '-1'}
				<div>
					<SettingSelect
						id="{hand}-hand-stroke-width-select"
						selectLabel={dictionary.display['Stroke width:']}
						bind:value={$settings.clock.theme.hands[hand].strokeWidth}
						values={[...Array(6).keys()].map((x) => (x + 1) / 2)} />
				</div>
				<div>
					<SettingSelect
						id="{hand}-hand-length-select"
						selectLabel={dictionary.display['Length:']}
						bind:value={$settings.clock.theme.hands[hand].length}
						values={[...Array(6).keys()].map((x) => x * 3 + 12)} />
				</div>
				<div>
					<SettingSelect
						id="{hand}-hand-back-select"
						selectLabel={dictionary.display['Back:']}
						bind:value={$settings.clock.theme.hands[hand].back}
						values={[...Array(10).keys()]} />
				</div>
				<div>
					<SettingSelect
						id="{hand}-hand-linecap-select"
						selectLabel={dictionary.display['Linecap:']}
						bind:value={$settings.clock.theme.hands[hand].linecap}
						values={['round', 'square']}
						labels={dictionary.display.linecaps} />
				</div>
			{/if}
		</div>
	{/each}
</div>
