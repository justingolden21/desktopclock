import { addToast } from '$lib/components/Toast.svelte';

/**
 * If too many stopwatches, create a toast and return true, else return false
 * @param {object} dictionary language dictionary
 * @param {number} currentNum current number of stopwatches
 * @param {number} addingNum number of new stopwatches to create
 * @param {number} max maximum number of stopwatches
 * @example
 * ```
 * const tooMany = checkTooManyStopwatches(dictionary, $settings.stopwatch.stopwatches.length, 1);
 * if (tooMany) return;
 * ```
 * @returns boolean
 */
const checkTooManyStopwatches = (dictionary, currentNum, addingNum, max = 100) => {
	if (!(currentNum + addingNum > max)) return false;

	const text = dictionary.messages['Too many stopwatches'];
	const icon = 'error';
	addToast({ text, icon });

	return true;
};

export default checkTooManyStopwatches;
