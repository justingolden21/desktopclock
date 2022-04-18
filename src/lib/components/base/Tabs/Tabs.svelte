<!-- https://svelte.dev/repl/8e68120858e5322272dc9136c4bb79cc?version=3.5.1 -->
<script context="module">
	export const TABS = {};
</script>

<script>
	import { setContext, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

	const tabs = [];
	const panels = [];
	const selectedTab = writable(null);
	const selectedPanel = writable(null);

	setContext(TABS, {
		registerTab: (tab) => {
			tabs.push(tab);
			$selectedTab = $selectedTab || tab;

			onDestroy(() => {
				const i = tabs.indexOf(tab);
				tabs.splice(i, 1);
				$selectedTab = $selectedTab === tab ? tabs[i] || tabs[tabs.length - 1] : $selectedTab;
			});
		},

		registerPanel: (panel) => {
			panels.push(panel);
			$selectedPanel = $selectedPanel || panel;

			onDestroy(() => {
				const i = panels.indexOf(panel);
				panels.splice(i, 1);
				$selectedPanel =
					$selectedPanel === panel ? panels[i] || panels[panels.length - 1] : $selectedPanel;
			});
		},

		selectTab: (tab) => {
			const i = tabs.indexOf(tab);
			$selectedTab = tab;
			$selectedPanel = panels[i];
		},

		selectedTab,
		selectedPanel
	});
</script>

<div class="tabs">
	<slot />
</div>
