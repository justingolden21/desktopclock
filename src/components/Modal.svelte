<!-- svelte logic from https://bitbucket.org/spinspire/svelte-modal/src/master/src/Modal.svelte -->
<!-- TODO click away to close modal https://svelte.dev/repl/dae848c2157e48ab932106779960f5d5?version=3.19.2 -->
<script>
    export let title;

    let shown = false;
    export function show() {
      shown = true;
    }
    export function hide() {
      shown = false;
    }
</script>
  
<style>
.modal {
	@apply pt-8 fixed left-0 top-0 block w-full h-full overflow-auto bg-gray-300 bg-opacity-75;
	z-index: 3;
}
.modal-content {
	@apply border-2 border-gray-300 bg-gray-100 p-2 xs:p-8 xs:pt-4 relative m-auto w-full md:w-3/4 bg-opacity-75;
	backdrop-filter: blur(2px);
	animation: animateTop 0.25s;
	-webkit-animation: animateTop 0.25s;
}
.modal button.close {
	float: right;
	z-index: 4;
}
.modal h1 {
	@apply text-left mt-4;
}
.modal-header {
	@apply border-b-2 border-gray-300 pb-9;
}
.modal-body {
	@apply pt-4 text-left;
}
.modal-body p {
	@apply text-base sm:text-lg md:text-xl;
}
.modal-body h3 {
	@apply font-bold my-2 md:my-4;
}

:global(body.dark) .modal {
	@apply bg-gray-700 bg-opacity-75;
}
:global(body.dark) .modal-content {
	@apply border-gray-200 bg-gray-800 bg-opacity-75;
}
:global(body.dark) .modal-header {
	@apply border-gray-200;
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
  
<svelte:window
on:keydown={e => {
    if (e.key == 'Escape') {
    hide();
    }
}} />

{#if shown}
<div class="modal" on:click={()=> hide()}>
    <div class="modal-content" on:click|stopPropagation>
        <div class="modal-header">
            <button class="close icon-btn" on:click={() => hide()}>
                <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="square"
                        stroke-linejoin="square"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
            <h1>{title}</h1>
        </div>
        <div class="modal-body">
            <slot></slot>
        </div>
    </div>
</div>
{/if}
  