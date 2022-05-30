<script>
	/// UTILS ///
	import { open } from '$lib/util/modal';
	import { settings } from '$lib/stores/settings';

	/// COMPONENTS ///
	import ThreeDotMenu from '../ThreeDotMenu.svelte';

	/// STATE ///
	export let idx = -1;
	export let classes;

	$: options = [
		{
			text: 'Edit',
			icon: 'pencil',
			func: () => open('edit-worldclock', { editIndex: idx })
		},
		{
			text: 'Up',
			icon: 'chevron_up',
			func: () => {
				moveItem($settings.worldclock.timezones, idx, idx - 1);
			},
			hidden: idx === 0
		},
		{
			text: 'Down',
			icon: 'chevron_down',
			func: () => {
				moveItem($settings.worldclock.timezones, idx, idx + 1);
			},
			hidden: idx === $settings.worldclock.timezones.length - 1
		},
		{
			text: 'Delete',
			icon: 'trash',
			func: () => {
				$settings.worldclock.timezones = $settings.worldclock.timezones.filter((_, i) => i !== idx);
			}
		}
	];

	// remove `from` item and insert into position `to`
	// https://stackoverflow.com/a/46351038/4907950
	function moveItem(data, from, to) {
		data.splice(to, 0, data.splice(from, 1)[0]);
	}
</script>

<ThreeDotMenu {classes} {idx} {options} />
