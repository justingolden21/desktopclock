<script>
	import { session } from '$app/stores';

	import { open, close, modal } from '$lib/util/modal.js';

	/// COMPONENTS ///
	import Icon from '$lib/components/Icon.svelte';
	import Settings from '$lib/components/Settings.svelte';
	import KeyboardShortcutsModal from '$lib/components/KeyboardShortcutsModal.svelte';
	import DatetimeFormatModal from '$lib/components/_Clock/DatetimeFormatModal.svelte';
	import NewWorldclock from '$lib/components/_Worldclock/NewWorldclock.svelte';
	import WorldclockTimetable from '$lib/components/_Worldclock/WorldclockTimetable.svelte';
	import ConvertTimezones from '$lib/components/_Worldclock/ConvertTimezones.svelte';

	/// STATE ///
	const modalData = {
		'settings': {
			title: $session.languageDictionary.labels['Settings'],
			icon: 'settings',
			component: Settings
		},
		'convert-timezones': {
			title: $session.languageDictionary.worldclockSettings['Convert timezones'],
			icon: 'switch_horizontal',
			component: ConvertTimezones
		},
		'new-worldclock': {
			title: $session.languageDictionary.worldclockSettings['New timezone'],
			icon: 'plus_circle',
			component: NewWorldclock
		},
		'edit-worldclock': {
			title: $session.languageDictionary.worldclockSettings['Edit timezone'],
			icon: 'pencil',
			component: NewWorldclock
		},
		'keyboard-shortcuts': {
			title: $session.languageDictionary.labels['Keyboard shortcuts'],
			icon: 'table',
			previous: 'settings',
			component: KeyboardShortcutsModal
		},
		'datetime-format': {
			title: $session.languageDictionary.clockSettings['Datetime Formatting'],
			icon: 'table',
			previous: 'settings',
			component: DatetimeFormatModal
		},
		'worldclock-timetable': {
			title: $session.languageDictionary.worldclockSettings['Timetable'],
			icon: 'table',
			component: WorldclockTimetable
		}
	};

	let component, title, icon, previous, data;
	$: {
		const modalName = $modal?.name;
		if (modalName) {
			({ component, title, icon, previous, data } = modalData[modalName]);
		} else {
			({ component, title, icon, previous, data } = {});
		}
	}
	$: data = $modal?.data || {};

	/// EVENT HANDLERS ///
	function onWindowKeyDown(e) {
		if (e.key !== 'Escape') return;

		if (previous) {
			open(previous);
		} else {
			close();
		}
	}
</script>

<svelte:window on:keydown={onWindowKeyDown} />

{#if component}
	<div class="modal" on:click={close}>
		<div class="modal-content surface rounded" on:click|stopPropagation>
			<div class="modal-header">
				{#if previous}
					<button
						class="icon-btn float-left mr-8"
						on:click={() => open(previous)}
						aria-label={$session.languageDictionary.labels['Go back']}>
						<Icon name="arrow_left" class="w-6 h-6" />
					</button>
				{/if}
				<button
					class="icon-btn float-right"
					on:click={close}
					aria-label={$session.languageDictionary.labels['Close']}>
					<Icon name="close" class="w-6 h-6" />
				</button>
				<h1>
					<Icon name={icon} class="w-6 h-6 inline mr-2" />
					{title}
				</h1>
			</div>
			<div class="modal-body">
				<svelte:component this={component} {data} />
			</div>
		</div>
	</div>
{/if}

<style lang="postcss">
	.modal {
		@apply xs:p-3 sm:p-6 md:p-12 fixed left-0 top-0 w-full h-full bg-base-300 bg-opacity-75 z-20;
	}
	.modal-content {
		@apply flex flex-col max-h-full p-2 xs:p-8 xs:pt-4 relative m-auto w-full md:w-3/4;
		animation: animateTop 0.25s;
		-webkit-animation: animateTop 0.25s;
	}
	.modal-header button {
		@apply z-30 mt-2;
	}
	.modal h1 {
		@apply text-left mt-4;
	}
	.modal-header {
		@apply border-b-2 border-base-300 pb-4;
	}
	.modal-body {
		@apply text-left relative flex-1 overflow-auto;
	}

	:global(.dark) .modal {
		@apply bg-base-700 bg-opacity-75;
	}
	:global(.dark) .modal-header {
		@apply border-base-200;
	}

	@keyframes animateTop {
		from {
			top: -240px;
			opacity: 0;
		}
		to {
			top: 0;
			opacity: 1;
		}
	}
	@-webkit-keyframes animateTop {
		from {
			top: -240px;
			opacity: 0;
		}
		to {
			top: 0;
			opacity: 1;
		}
	}
</style>
