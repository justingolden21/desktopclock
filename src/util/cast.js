// https://googlechrome.github.io/samples/presentation-api/
// https://googlechrome.github.io/samples/presentation-api/receiver/

// TODO check if navigator presentation api exists, export bool if supported, if not hide btn
// change settings toggle label to say "show (if casting is available)" as opposed to just "show" for the main button
// TODO: on leave clear the presentation request so no error upon refresh?

let presentationConnection, presentationRequest;

function isCastSupported() {
	return typeof PresentationRequest !== 'undefined';
}

function setupCasting() {
	if (!isCastSupported()) return;

	// in quotes is url location of receiver page, for example, "receiver/index.html"
	presentationRequest = new PresentationRequest(['']);

	// Make this presentation the default one when using the "Cast" browser menu.
	navigator.presentation.defaultRequest = presentationRequest;
}

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
			console.log(error.name + ': ' + error.message);
		});
}

export { setupCasting, castClock, isCastSupported };
