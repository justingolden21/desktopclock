import { u } from '../lib/umbrella.min.js';

function openTab(tabName) {
	// open the tab, hide others
	u('.tab-content').addClass('hidden');
	u(`#${tabName}`).removeClass('hidden');
}

// window.addEventListener('load', () => {
u('.tab-content').addClass('hidden');
u('.tab').on('click', (e) => {
	let { target } = e;

	// if clicked on a child of a tab like an icon, get parent
	while (!target.classList.contains('tab')) {
		target = target.parentNode;
	}

	// tab active classes
	u('.tab').removeClass('active');
	u(target).addClass('active');

	// display tab content
	const tabName = u(target).attr('data-tab');
	openTab(tabName);
});

// focusable tabs
u('.tab').attr('tabindex', 0);

// if tab focused with enter then click it
u('.tab').on('keypress', function (e) {
	if (e.keyCode === 13) {
		// enter
		u(this).trigger('click');
	}
});

// open first tab
u('.tab:first-child').trigger('click');
// });
