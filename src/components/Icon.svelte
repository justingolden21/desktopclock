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
			name: 'share',
			svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>`
		},
		{
			name: 'theme', // modified palette icon from https://iconoir.com
			svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.5096 9.54C20.4243 9.77932 20.2918 9.99909 20.12 10.1863C19.9483 10.3735 19.7407 10.5244 19.5096 10.63C18.2796 11.1806 17.2346 12.0745 16.5002 13.2045C15.7659 14.3345 15.3733 15.6524 15.3696 17C15.3711 17.4701 15.418 17.9389 15.5096 18.4C15.5707 18.6818 15.5747 18.973 15.5215 19.2564C15.4682 19.5397 15.3588 19.8096 15.1996 20.05C15.0649 20.2604 14.8877 20.4403 14.6793 20.5781C14.4709 20.7158 14.2359 20.8085 13.9896 20.85C13.4554 20.9504 12.9131 21.0006 12.3696 21C11.1638 21.0006 9.97011 20.7588 8.85952 20.2891C7.74893 19.8194 6.74405 19.1314 5.90455 18.2657C5.06506 17.4001 4.40807 16.3747 3.97261 15.2502C3.53714 14.1257 3.33208 12.9252 3.36959 11.72C3.4472 9.47279 4.3586 7.33495 5.92622 5.72296C7.49385 4.11097 9.60542 3.14028 11.8496 3H12.3596C14.0353 3.00042 15.6777 3.46869 17.1017 4.35207C18.5257 5.23544 19.6748 6.49885 20.4196 8C20.6488 8.47498 20.6812 9.02129 20.5096 9.52V9.54ZM8 16.01L8.01 15.9989M6 12.01L6.01 11.9989M8 8.01L8.01 7.99889M12 6.01L12.01 5.99889M16 8.01L16.01 7.99889"/>`
		},
		{
			name: 'application', // modified web-window icon from https://iconoir.com
			svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 17V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17M10 8H12M16 8H18"/>`
		},
		{
			name: 'eye',
			svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>`
		},
		{
			name: 'help',
			svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>`
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
