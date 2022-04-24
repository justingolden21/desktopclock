# Desktop Clock

### About

A simple, resizable customizable, installable clock for any device!

### Codebase

This project is made with Svelte (using Svelte kit) and TailwindCSS. It uses Hero Icons and postCSS/purgeCSS for Tailwind. Vite is the bundler used under the hood for Svelte kit. It is hosted on Netlify and has no backend currently. It uses day.js for date/time logic, and uses Prettier, ESLint, and the AirBNB Javascript Style guide for code formatting and style. Desktop Clock is a PWA and can handle many timezones, date and time formats and locales, and languages.

Requires NodeJS/npm

### Development

Install: `npm i`

Generate Assets: `npm run generate-assets`

Development: `npm run dev`

Build: `npm run build`

Preview: `npm run preview`

Update version: `npm version patch`

Update packages: `npm update`

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

- Svelte 3 Snippets by fivethree

- Svelte for VS Code

- Tailwind CSS Intellisense

- Tailwind Docs

Set up VS code to auto format on save

1. Open preferences (ctrl+shift+P)

2. Preferences: Open Settings (JSON)

3. Add the following to your `settings.json`:

```json
{
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
	"prettier.singleQuote": true,
	"editor.detectIndentation": true,
	"editor.defaultFormatter": "esbenp.prettier-vscode",
	"editor.formatOnSave": true
}
```

Recommended keyboard shortcuts (ctrl+shift+P > keyboard shortcuts):

```json
[
	{
		"key": "alt+w",
		"command": "editor.emmet.action.wrapWithAbbreviation",
		"when": "editorTextFocus"
	}
]
```

4. Reload VS code (may be necessary to go to extensions and find an extension with a button to reload and click that)

Note: Click Prettier button on bottom right of file to view console output and any errors in formatting / autosave

Prettier options: https://prettier.io/docs/en/options.html

ESLint rules: https://eslint.org/docs/rules/

`alt+shift+F` to format current file with prettier

### Debugging

For changes not appearing or hydration bugs, try killing the server and restarting, as well as hard refreshing (ctrl+shift+R) the page

For issues with building, previewing, and npm packages, try deleting the build, .netlify, .svelte-kit, and node_modules folders.

### Other

When adding a language, add it to `supportedLangs` in `consts.js`

When adding a page, add it to cache in `service-worker.js`

### Links

- Dev: https://desktopclockdev.netlify.app/

- Prod Netlify: https://desktopclock.netlify.app/

- Prod: https://desktopclock.app

- This repo: https://github.com/justingolden21/desktop-clock

- Netlify:https://app.netlify.com/sites/desktopclock/overview

- Google Analytics: https://analytics.google.com/analytics/web/#/p293529519/reports/intelligenthome

- Search console: https://search.google.com/search-console?resource_id=sc-domain:desktopclock.app

- Sonar Cloud: https://sonarcloud.io/project/overview?id=justingolden21_desktopclock

### Attribution

404 and missing clock vectors from https://undraw.co/

Icons from https://heroicons.dev and https://iconoir.com

<hr>

- My website: https://justingolden.me

- My repos: https://github.com/justingolden21

- Contact me: contact@justingolden.me
