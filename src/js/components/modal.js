import { u } from '../lib/umbrella.min.js';
// TODO: convert to using umbrella (for readability and file size)
window.addEventListener('load', () => {
	const modals = document.getElementsByClassName('modal');
	const modalBtns = document.getElementsByClassName('modal-btn');
	const closeBtns = document.getElementsByClassName('close');

	for (const modalBtn of modalBtns) {
		modalBtn.onclick = function (event) {
			event.preventDefault();
			document.querySelector(modalBtn.getAttribute('href')).style.display = 'block';
		};
	}

	for (const closeBtn of closeBtns) {
		closeBtn.onclick = function (event) {
			closeBtn.parentNode.parentNode.parentNode.style.display = 'none';
		};
	}

	window.onclick = function (event) {
		if (event.target.classList.contains('modal')) {
			for (const modal of modals) {
				if (typeof modal.style !== undefined) {
					modal.style.display = 'none';
				}
			}
		}
	};

	window.onkeydown = function (event) {
		if (event.key === 'Escape') {
			for (const modal of modals) {
				modal.style.display = 'none';
			}
		}
	};
});
