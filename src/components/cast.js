// https://googlechrome.github.io/samples/presentation-api/

// TODO check if navigator presentation api exists, export bool if supported, if not hide btn
// change settings toggle label to say "show (if casting is available)" as opposed to just "show" for the main button
// TODO: on leave clear the presentation request so no error upon refresh?

let presentationConnection, presentationRequest;

function setupCasting() {
  presentationRequest = new PresentationRequest(['index.html']);

  // Make this presentation the default one when using the "Cast" browser menu.
  navigator.presentation.defaultRequest = presentationRequest;
}

function castClock() {
  console.log('Starting presentation request...');
    presentationRequest.start()
    .then(connection => {
      console.log(`Connected to ${connection.url}, id: ${connection.id}`);
    })
    .catch(error => {
      console.log(error.name + ': ' + error.message);
    }); 
}

export {setupCasting, castClock};