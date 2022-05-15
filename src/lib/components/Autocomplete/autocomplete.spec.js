/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/svelte';
import Autocomplete from './Autocomplete.svelte';

describe('Test if Jest is working', () => {
	test('hello world', () => {});

	test('use jsdom in this test file', () => {
		const element = document.createElement('div');
		expect(element).not.toBeNull();
	});
});

describe('autocomplete component', () => {
	test('should create an empty input', () => {
		const { container } = render(Autocomplete);

		expect(container.querySelector('input').value).toEqual('');
	});
});
