<script>
	export let name;
	export let focusable = false;

	// https://heroicons.dev/
	// other clock icons made by Justin Golden
	const icons = [
		{
			name: 'clock',
			svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 8v4l3 3m6-3a9 9 0 11-18 0a9 9 0 0118 0z"/>`
		},
		{
			viewbox: '0 0 24 30',
			name: 'worldclock',
			svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 8v4l3 3m6-3a9 9 0 11-18 0a9 9 0 0118 0m2 11-2-2a1 1 0 01-18-18l-2-2m11 24v4h3h-7"/>`
		},
		{
			viewbox: '0 -2 22 26',
			name: 'stopwatch',
			svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 8v4m9 0a9 9 0 11-18 0a9 9 0 0118 0m-9-9v-4h4h-8"/>`
		},
		{
			name: 'timer',
			svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 8v4l3 3m6-3a9 9 0 11-18 0a9 9 0 0118 0m-19-8 3-3m14 0 3 3"/>`
		},
		{
			name: 'settings',
			svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>`
		},
		{
			name: 'info',
			svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>`
		},
		{
			name: 'moon',
			svg: `<path stroke-linecap="square" stroke-linejoin="square" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>`
		},
		{
			name: 'fullscreen',
			svg: `<path stroke-linecap="square" stroke-linejoin="square" stroke-width="2" d="m4 8v-4m0 0h4m-4 0m16 4v-4m0 0h-4m4 0m-16 12v4m0 0h4m-4 0m16 0m0 0v-4m0 4h-4"/>`
		},
		{
			name: 'menu',
			svg: `<path stroke-linecap="square" stroke-linejoin="square" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>`
		},
		{
			name: 'close',
			svg: `<path stroke-linecap="square" stroke-linejoin="square" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>`
		},
		{
			name: 'external-link',
			svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>`
		},
		{
			name: 'battery',
			svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5h-2a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-12a2 2 0 00-2-2h-2a2 2 0 00-2-2h-2a2 2 0 00-2 2"/>`
		},
		{
			name: 'table',
			svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>`
		},
		{
			name: 'chevron-right',
			svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>`
		},
		{
			name: 'undo',
			svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>`
		},
		{
			name: 'download',
			svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>`
		}
	];
	$: icon = icons.find((i) => i.name === name);
</script>

<svg
	class={$$props.class ?? ''}
	{focusable}
	stroke="currentColor"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	viewBox={icon.viewbox ?? '0 0 24 24'}
>
	{@html icon.svg}
</svg>
