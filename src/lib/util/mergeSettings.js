/* eslint-disable no-continue */

/**
 * Check if param is a non array, non null object
 * @param item
 * @returns {boolean}
 */
const isObject = (item) => item && typeof item === 'object' && !Array.isArray(item);

/**
 * Check if param is not undefined, null, or NaN
 * @param item
 * @returns {boolean}
 */
const isValid = (item) => item !== undefined && item !== null;

/**
 * Check if params have same `typeof`
 * @param item1, item2
 * @returns {boolean}
 */
const isSameType = (item1, item2) => typeof item1 === typeof item2;

const isPrimitiveType = (item) => ['string', 'number', 'boolean'].includes(typeof item);

// overriden by user default
const validNulls = {
	timeFormat: 'string',
	timeFormatCustom: 'string',
	darkMode: 'boolean',
	language: 'string',
	datetime: 'string',
	timezone: 'string',
	ampm: 'boolean'
};

/**
 * Deep merge two objects
 * @param target
 * @param ...sources
 * copy properties from sources to target
 * only if that property is present in target
 * and only if they are the same data type
 * undefined, null, and NaN values are ignored
 * as well as functions
 * falsey values such as false, 0, '', [], and {} are vaild
 * the property on the target can be null
 * but must be in validNulls
 * so timeFormat cannot be a number or boolean for example
 */
const mergeDeep = (target, ...sources) => {
	if (!sources.length) {
		return target;
	}
	const source = sources.shift();

	if (!isObject(target)) {
		throw new Error('target must be an object');
	}
	if (!isObject(source)) {
		return target;
	}

	for (const key in source) {
		// only add properties present in original target object

		// properties must exist. target is allowed to be null
		// (value intentionally set null to be overriden)
		if (!isValid(source[key])) continue;
		if (!isValid(target[key]) && target[key] !== null) continue;

		// if it's an object, recur
		if (isObject(target[key])) {
			if (isObject(source[key])) {
				mergeDeep(target[key], source[key]);
			}
			// only add properties if they are the same type
			// or if target is null (intentional lack of value) amd source isn't
		} else if (
			isSameType(target[key], source[key]) ||
			(target[key] === null &&
				source[key] !== null &&
				Object.keys(validNulls).includes(key) &&
				// the strings 'string', 'boolean', etc. are defined above:
				// eslint-disable-next-line valid-typeof
				typeof source[key] === validNulls[key])
		) {
			target[key] = source[key];
		}
	}

	return mergeDeep(target, ...sources);
};

export default mergeDeep;
