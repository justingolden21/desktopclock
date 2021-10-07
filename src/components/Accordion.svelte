<script>
    export let opened = false
</script>

<div class="bg-gray-50 border-b-2 border-gray-200">
    <div
        class="cursor-pointer p-2 hover:bg-gray-100 font-bold text-lg dark:hover:bg-gray-600"
        on:click={() => opened = !opened}
    >
        Appearance
    </div>
    <div class="p-4 hidden dark:bg-gray-700" class:open={opened}>
        <slot></slot>
    </div>
</div>

<style>
.open {
    @apply block;
    animation: sweep 0.5s ease-in-out;
}
</style>