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

- Svelte for VS Code

- Tailwind CSS Intellisense

- Tailwind Docs

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
