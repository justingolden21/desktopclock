<script>
	// https://dev.to/danawoodman/svelte-quick-tip-creating-a-toast-notification-system-ge3

	import Toast from './Toast.svelte';

	import { dismissToast, toasts } from './toastStore';
</script>

{#if $toasts}
	<section class="fixed inset-x-0 bottom-4 w-full flex justify-center flex-col">
		{#each $toasts as toast (toast.id)}
			<Toast
				type={toast.type}
				dismissible={toast.dismissible}
				timeout={toast.timeout}
				on:dismiss={() => dismissToast(toast.id)}>
				{toast.message}
			</Toast>
		{/each}
	</section>
{/if}
