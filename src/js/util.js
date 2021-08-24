// https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
function toggleFullscreen() {
	if (!document.fullscreenElement) {
		document.documentElement.requestFullscreen();
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		}
	}
}

export { toggleFullscreen };
