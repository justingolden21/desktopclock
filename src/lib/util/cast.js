// Utilities for casting the current page to another screen / TV

// https://googlechrome.github.io/samples/presentation-api/
// https://googlechrome.github.io/samples/presentation-api/receiver/

// TODO: On leave clear the presentation request so no error upon refresh?

let presentationRequest;

// Return `true` if the browser supports casting, else `false`
function isCastSupported() {
	return typeof PresentationRequest !== 'undefined';
}

// Prepare presentation request, called `onMount`
function setupCasting() {
	if (!isCastSupported()) return;

	// in quotes is url location of receiver page, for example, "receiver/index.html"
	presentationRequest = new PresentationRequest(['']);

	// Make this presentation the default one when using the "Cast" browser menu.
	navigator.presentation.defaultRequest = presentationRequest;
}

// Attempt to cast current page, called on button click
function castClock() {
	if (!isCastSupported()) {
		console.log('Not supported');
		return;
	}

	console.log('Starting presentation request...');
	presentationRequest
		.start()
		.then((connection) => {
			console.log(`Connected to ${connection.url}, id: ${connection.id}`);
		})
		.catch((error) => {
			console.log(`${error.name}: ${error.message}`);
		});
}

export { setupCasting, castClock, isCastSupported };
