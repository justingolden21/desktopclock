# Desktop Clock

### About

A simple, resizable and customizable clock for any device

### Codebase

This project is made with Svelte (using Svelte kit) and TailwindCSS. It uses Hero Icons and postCSS/purgeCSS for tailwind. Vite is the bundler used under the hood for Svelte kit. It is hosted on Netlify and has no backend currently. It uses day.js for date/time logic, and uses Prettier, ESLint, and the AirBNB Javascript Style guide for code formatting and style.

### Development

First time setup: `npm i`

Generate Assets: `npm run generate-assets`

Development: `npm run dev` (or `npm run dev -- --open`)

Build: `npm run build`

Preview: `npm run preview`

### PWA

_In order to test service worker, must run `npm run build` then `npm run preview` for any changes to the service worker to appear on localhost. Test by opening localhost in incognito chrome, then running lighthouse for PWA_

Location of service worker: `view-source:http://localhost:3000/service-worker.js`

### Styleguide and Linting

This project uses ESLint, Prettier for VS code, and the AirBNB Javascript style guide.

VS Code Extensions:

- Auto Rename Tag

- ESLint

- Path Intellisense

- PostCSS Language Support

- Prettier

- Svelte 3 Snippets

- Svelte for VS Code

- Tailwind CSS Intellisense

- Tailwind Docs

Set up VS code to auto format on save

1. Open preferences (ctrl+shift+P)

2. Preferences: Open Settings (JSON)

3. Add the following line

```diff
"[javascript]": {
+    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
}

...

+ "[svelte]": {
+	"editor.formatOnSave": true,
+ 	"editor.defaultFormatter": "svelte.svelte-vscode"
+ },

...

+ "editor.formatOnSave": true,

```

Full `settings.json` in VS Code for reference:

```json
{
	"editor.linkedEditing": true,
	"editor.detectIndentation": true,
	"notebook.cellToolbarLocation": {
		"default": "right",
		"jupyter-notebook": "left"
	},
	"prettier.tabWidth": 4,
	"prettier.useTabs": true,
	"[javascript]": {
		"editor.formatOnSave": true,
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[svelte]": {
		"editor.formatOnSave": true,
		"editor.defaultFormatter": "svelte.svelte-vscode"
	},
	"eslint.alwaysShowStatus": true,
	"workbench.colorTheme": "Default Dark+",
	"prettier.singleQuote": true,
	"editor.defaultFormatter": "esbenp.prettier-vscode",
	"editor.formatOnSave": true,
	"security.workspace.trust.untrustedFiles": "newWindow",
	"files.autoSave": "afterDelay"
}
```

4. Reload VS code (may be necessary to go to extensions and find an extension with a button to reload and click that)

Note: Click Prettier button on bottom right of file to view console output and any errors in formatting / autosave

### Other Recommended Extensions

- Svelte 3 Snippets by fivethree

### Debugging

For changes not appearing or hydration bugs, try killing the server and restarting, as well as hard refreshing (ctrl+shift+R) the page

For issues with building, previewing, and npm packages, try deleting the build, .netlify, .svelte-kit, and node_modules folders.

### Links

- Live demo: https://justingolden.me/desktop-clock

- This repo: https://github.com/justingolden21/desktop-clock

### Attribution

404 vector from https://undraw.co/

<hr>

- My website: https://justingolden.me

- My repos: https://github.com/justingolden21

- Contact me: contact@justingolden.me
