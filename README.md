# Desktop Clock

### About

A simple, resizable customizable, installable clock for any device!

### Codebase

This project is made with Svelte (using Svelte kit, bundled with Vite) and TailwindCSS. It uses Hero Icons and postCSS/purgeCSS for Tailwind. It is hosted on Netlify and has no backend currently. It uses day.js for date/time logic, and uses Prettier, ESLint, and the AirBNB Javascript Style guide for code formatting and style (VS Code is recommended). Desktop Clock is a PWA and can handle many timezones, date and time formats, locales, and languages.

Requires [NodeJS/npm](https://nodejs.org/en/download/)

(`SET PATH=C:\Program Files\Nodejs;%PATH%`)

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

3. Update your `settings.json`. See `.vscode/settings.json` for reference.

4. Reload VS code (may be necessary to go to extensions and find an extension with a button to reload and click that)

Note: Click Prettier button on bottom right of file to view console output and any errors in formatting / autosave

Prettier options: https://prettier.io/docs/en/options.html

ESLint rules: https://eslint.org/docs/rules/

### Debugging

For changes not appearing or hydration bugs, try killing the server and restarting, as well as hard refreshing (ctrl+shift+R) the page

For issues with building, previewing, and npm packages, try running `npm run clean`.

### Other

When adding a language, add it to `supportedLangs` in `consts.js` (and also add screenshots). Also, the language name must be added to each other language json file.

When adding a page, add it to cache in `service-worker.js` and validPages in `data/consts.js`. Also add SEO data and add it to `Nav`. Add shortcut to `manifest.webmanifest.js`.

### Enviornments

Prod: Live app served to users. End product. `master` branch.

Dev: For testing code before sending to prod, including smoke testing, testing different platforms or devices, and testing with other users. `dev` branch.

QA: A playground for testing app. Unlike dev, QA is not meant to contain code that isn't about to go to prod. Only used while dev contains code nearly ready to ship and we want to test something different in a live site. `qa` branch.

### Links

- Dev: https://desktopclockdev.netlify.app/

- QA: https://desktopclockqa.netlify.app/

- Prod Netlify: https://desktopclock.netlify.app/

- Prod: https://desktopclock.app

---

- This repo: https://github.com/justingolden21/desktopclock

- Netlify: https://app.netlify.com/sites/desktopclock/overview

- Google Analytics: https://analytics.google.com/analytics/web/#/p293529519/reports/intelligenthome

- Search Console: https://search.google.com/search-console?resource_id=sc-domain:desktopclock.app

- Sonar Cloud: https://sonarcloud.io/project/overview?id=justingolden21_desktopclock

- Jira Board: https://justingolden.atlassian.net/jira/software/projects/DC/boards/1

### Attribution

404 and missing clock vectors from https://undraw.co/

Icons from https://heroicons.dev and https://iconoir.com

---

- My website: https://justingolden.me

- My repos: https://github.com/justingolden21

- Contact me: contact@justingolden.me
