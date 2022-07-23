<script context="module">
	import { session } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { writable } from 'svelte/store';

	import { Icon } from '$lib/components/Icon';
	import uid from '$lib/util/uid';

	const toasts = writable([]);

	const dismissToast = (id) => {
		toasts.update((all) => all.filter((t) => t.id !== id));
	};

	export function addToast({ text = '', icon = 'info', duration = 3000, dismissible = true } = {}) {
		const id = uid();
		toasts.update((t) => [...t, { id, text, icon, duration, dismissible }]);
		setTimeout(() => {
			dismissToast(id);
		}, duration);
	}
</script>

{#if $toasts}
	<section class="z-30 fixed inset-x-0 bottom-4 w-full flex justify-center flex-col">
		{#each $toasts as toast (toast.id)}
			<div class="w-80 p-4 flex items-center mb-2 mx-auto surface" role="alert" transition:fade>
				<Icon name={toast.icon} class="inline w-6 h-6" />

				<div class="ml-4 font-bold">
					{toast.text}
				</div>

				{#if toast.dismissible}
					<button
						class="ml-auto"
						aria-label={$session.languageDictionary.labels['Close']}
						on:click={() => dismissToast(toast.id)}>
						<Icon name="close" class="inline w-6 h-6" />
					</button>
				{/if}

				{#if toast.duration}
					<div
						class="progress-bar absolute bottom-0 left-0 h-1 bg-base-600 dark:bg-base-200"
						style:animation-duration="{toast.duration / 1000}s" />
				{/if}
			</div>
		{/each}
	</section>
{/if}

<style>
	.progress-bar {
		animation-timing-function: linear;
		animation-name: shrink;
	}

	@keyframes shrink {
		from {
			width: 100%;
		}
		to {
			width: 0%;
		}
	}
</style>
