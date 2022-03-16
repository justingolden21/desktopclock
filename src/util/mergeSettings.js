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

function isPrimitiveType(item) {
	return ['string', 'number', 'boolean'].includes(typeof item);
}

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
 */
export function mergeDeep(target, ...sources) {
	if (!sources.length) {
		// console.log('sources is empty');
		return target;
	}
	const source = sources.shift();

	if (!isObject(target)) {
		throw 'target must be an object';
	}
	if (!isObject(source)) {
		// console.log('source is not an object');
		return target;
	}

	for (const key in source) {
		// only add properties present in original target object
		// console.log('key is', key);

		// properties must exist. target is allowed to be null
		// (value intentionally set null to be overriden)
		if (!isValid(source[key])) continue;
		// console.log('passed check 1');
		if (!isValid(target[key]) && target[key] !== null) continue;
		// console.log('passed check 2');

		// if it's an object, recur
		if (isObject(target[key])) {
			// console.log('target[key] is an object');

			if (isObject(source[key])) {
				// console.log('source[key] is an object');
				// console.log(target[key], source[key]);
				mergeDeep(target[key], source[key]);
			} else {
				// console.log('source[key] is not an object');
			}
		} else {
			// console.log('target[key] is not an object');

			// only add properties if they are the same type
			// or if target is null (intentional lack of value) amd source isn't
			if (isSameType(target[key], source[key])) {
				// console.log('target[key] and source[key] are same type');
				// console.log(target[key], source[key]);
				target[key] = source[key];
				// console.log(target[key]);
			} else if (target[key] === null && source[key] !== null) {
				// console.log('target[key] is null and source[key] is not');
				target[key] = source[key];
			} else {
				// console.log('target[key] and source[key] are not same type');
			}
		}
	}

	return mergeDeep(target, ...sources);
}

function test() {
	/**
	 * Create a deep clone of the parameter
	 * @param obj
	 * @returns {object}
	 * Note: uses JSON parse and stringify, which has pitfalls with complex objects
	 */
	function deepClone(obj) {
		return JSON.parse(JSON.stringify(obj));
	}

	const defaultValue = {
		clock: {
			displays: {
				primary: 'analog',
				secondary: 'date',
				primaryPalette: 'base',
				secondaryPalette: 'base',
				primaryFontSize: 'medium',
				secondaryFontSize: 'medium',
				battery: false
			},
			theme: {
				name: 'Default Night Theme',
				face: {
					stroke: { lightness: '700', palette: 'base' },
					fill: { lightness: '900', palette: 'base' },
					strokeWidth: 0,
					shape: 'circle'
				},
				shadow: { fill: { lightness: '700', palette: 'base' } },
				pin: {
					stroke: { lightness: '700', palette: 'accent' },
					fill: { lightness: '900', palette: 'base' },
					strokeWidth: 0.5,
					size: 1
				},
				numerals: {
					style: 'none',
					fontFamily: 'Arsenal',
					fill: { lightness: '300', palette: 'base' }
				},
				ticks: {
					sm: { stroke: { lightness: '-1', palette: 'base' }, height: 0.5, width: 2 },
					md: { stroke: { lightness: '400', palette: 'base' }, height: 0.5, width: 3 },
					lg: { stroke: { lightness: '500', palette: 'base' }, height: 0.5, width: 5 }
				},
				hands: {
					hour: {
						stroke: { lightness: '700', palette: 'base' },
						strokeWidth: 0.5,
						length: 15,
						back: 3,
						linecap: 'square'
					},
					minute: {
						stroke: { lightness: '500', palette: 'base' },
						strokeWidth: 0.5,
						length: 21,
						back: 3,
						linecap: 'square'
					},
					second: {
						stroke: { lightness: '700', palette: 'accent' },
						strokeWidth: 0.5,
						length: 27,
						back: 6,
						linecap: 'square'
					}
				}
			},
			secondHandMovement: 'sweeping',
			timeFormat: 'h:mm A',
			timeFormatCustom: 'h:mm A',
			dateFormat: 'ddd, MMMM D',
			dateFormatCustom: 'ddd, MMMM D',
			datetimeFontWeight: '300'
		},
		worldclock: {
			displays: { primary: 'analog_digital', secondary: 'rows' },
			timezones: [
				{ name: '', zone: 'America/Los_Angeles' },
				{ name: '', zone: 'America/New_York' },
				{ name: 'GMT', zone: 'Europe/London' },
				{ name: '', zone: 'Asia/Colombo' },
				{ name: '', zone: 'Asia/Tokyo' }
			],
			theme: {
				name: 'Default Theme',
				face: {
					stroke: { lightness: '700', palette: 'base' },
					fill: { lightness: '100', palette: 'base' },
					strokeWidth: 0,
					shape: 'circle'
				},
				shadow: { fill: { lightness: '700', palette: 'base' } },
				pin: {
					stroke: { lightness: '700', palette: 'accent' },
					fill: { lightness: '100', palette: 'base' },
					strokeWidth: 0.5,
					size: 1
				},
				numerals: {
					style: 'none',
					fontFamily: 'Arsenal',
					fill: { lightness: '700', palette: 'base' }
				},
				ticks: {
					sm: { stroke: { lightness: '-1', palette: 'base' }, height: 0.5, width: 2 },
					md: { stroke: { lightness: '400', palette: 'base' }, height: 0.5, width: 3 },
					lg: { stroke: { lightness: '500', palette: 'base' }, height: 0.5, width: 5 }
				},
				hands: {
					hour: {
						stroke: { lightness: '700', palette: 'base' },
						strokeWidth: 0.5,
						length: 15,
						back: 3,
						linecap: 'square'
					},
					minute: {
						stroke: { lightness: '500', palette: 'base' },
						strokeWidth: 0.5,
						length: 21,
						back: 3,
						linecap: 'square'
					},
					second: {
						stroke: { lightness: '700', palette: 'accent' },
						strokeWidth: 0.5,
						length: 27,
						back: 6,
						linecap: 'square'
					}
				}
			},
			secondHandMovement: 'sweeping',
			timeFormat: null,
			timeFormatCustom: null,
			dateFormat: 'ddd, MMMM D',
			dateFormatCustom: 'ddd, MMMM D'
		},
		baseColorPalette: 'slate',
		accentColorPalette: 'red',
		darkMode: false,
		showDarkButton: true,
		showPrimaryButton: true,
		showSecondaryButton: false,
		showCastButton: false,
		showFullscreenButton: true,
		smallerMenu: false,
		alwaysCollapseMenu: false,
		hideTitlebarWhenIdle: false,
		secondsUntilIdle: 2,
		fontFamily: 'Bai Jamjuree',
		fontFamilyBody: 'Bitter',
		doubleclickFullscreen: false,
		keyboardShortcuts: true,
		locale: {
			datetime: 'en',
			language: 'en',
			timezone: 'America/Los_Angeles',
			automaticDatetime: true,
			automaticLanguage: true,
			automaticTimezone: true
		}
	};

	const incomingValue = {
		darkMode: true,
		fontFamily: 'Jura',
		secondsUntilIdle: 3,
		showDarkButton: false,
		showPrimaryButton: '',
		smallerMenu: 777,
		keyboardShortcuts: 0,
		worldclock: {
			theme: {},
			timezones: [
				{ name: 'LA', zone: 'America/Los_Angeles' },
				{ name: 'NY', zone: 'America/New_York' }
			],
			timeFormat: -3.14
		},
		clock: {
			theme: Infinity,
			displays: ['abc'],
			secondHandMovement: 'modern',
			timeFormat: 'h:mm:ss A',
			timeFormatCustom: '',
			dateFormat: 'custom',
			dateFormatCustom: {},
			datetimeFontWeight: 400
		}
	};

	const expectedValue = {
		clock: {
			displays: {
				primary: 'analog',
				secondary: 'date',
				primaryPalette: 'base',
				secondaryPalette: 'base',
				primaryFontSize: 'medium',
				secondaryFontSize: 'medium',
				battery: false
			},
			theme: {
				name: 'Default Night Theme',
				face: {
					stroke: { lightness: '700', palette: 'base' },
					fill: { lightness: '900', palette: 'base' },
					strokeWidth: 0,
					shape: 'circle'
				},
				shadow: { fill: { lightness: '700', palette: 'base' } },
				pin: {
					stroke: { lightness: '700', palette: 'accent' },
					fill: { lightness: '900', palette: 'base' },
					strokeWidth: 0.5,
					size: 1
				},
				numerals: {
					style: 'none',
					fontFamily: 'Arsenal',
					fill: { lightness: '300', palette: 'base' }
				},
				ticks: {
					sm: { stroke: { lightness: '-1', palette: 'base' }, height: 0.5, width: 2 },
					md: { stroke: { lightness: '400', palette: 'base' }, height: 0.5, width: 3 },
					lg: { stroke: { lightness: '500', palette: 'base' }, height: 0.5, width: 5 }
				},
				hands: {
					hour: {
						stroke: { lightness: '700', palette: 'base' },
						strokeWidth: 0.5,
						length: 15,
						back: 3,
						linecap: 'square'
					},
					minute: {
						stroke: { lightness: '500', palette: 'base' },
						strokeWidth: 0.5,
						length: 21,
						back: 3,
						linecap: 'square'
					},
					second: {
						stroke: { lightness: '700', palette: 'accent' },
						strokeWidth: 0.5,
						length: 27,
						back: 6,
						linecap: 'square'
					}
				}
			},
			secondHandMovement: 'modern',
			timeFormat: 'h:mm:ss A',
			timeFormatCustom: '',
			dateFormat: 'custom',

			dateFormatCustom: 'ddd, MMMM D',
			datetimeFontWeight: '300'
		},
		worldclock: {
			displays: { primary: 'analog_digital', secondary: 'rows' },
			timezones: [
				{ name: 'LA', zone: 'America/Los_Angeles' },
				{ name: 'NY', zone: 'America/New_York' }
			],
			theme: {
				name: 'Default Theme',
				face: {
					stroke: { lightness: '700', palette: 'base' },
					fill: { lightness: '100', palette: 'base' },
					strokeWidth: 0,
					shape: 'circle'
				},
				shadow: { fill: { lightness: '700', palette: 'base' } },
				pin: {
					stroke: { lightness: '700', palette: 'accent' },
					fill: { lightness: '100', palette: 'base' },
					strokeWidth: 0.5,
					size: 1
				},
				numerals: {
					style: 'none',
					fontFamily: 'Arsenal',
					fill: { lightness: '700', palette: 'base' }
				},
				ticks: {
					sm: { stroke: { lightness: '-1', palette: 'base' }, height: 0.5, width: 2 },
					md: { stroke: { lightness: '400', palette: 'base' }, height: 0.5, width: 3 },
					lg: { stroke: { lightness: '500', palette: 'base' }, height: 0.5, width: 5 }
				},
				hands: {
					hour: {
						stroke: { lightness: '700', palette: 'base' },
						strokeWidth: 0.5,
						length: 15,
						back: 3,
						linecap: 'square'
					},
					minute: {
						stroke: { lightness: '500', palette: 'base' },
						strokeWidth: 0.5,
						length: 21,
						back: 3,
						linecap: 'square'
					},
					second: {
						stroke: { lightness: '700', palette: 'accent' },
						strokeWidth: 0.5,
						length: 27,
						back: 6,
						linecap: 'square'
					}
				}
			},
			secondHandMovement: 'sweeping',
			timeFormat: null,
			timeFormatCustom: null,
			dateFormat: 'ddd, MMMM D',
			dateFormatCustom: 'ddd, MMMM D'
		},
		baseColorPalette: 'slate',
		accentColorPalette: 'red',

		darkMode: true,
		showDarkButton: false,

		showPrimaryButton: true,
		showSecondaryButton: false,
		showCastButton: false,
		showFullscreenButton: true,
		smallerMenu: false,
		alwaysCollapseMenu: false,
		hideTitlebarWhenIdle: false,

		secondsUntilIdle: 3,
		fontFamily: 'Jura',

		fontFamilyBody: 'Bitter',
		doubleclickFullscreen: false,
		keyboardShortcuts: true,
		locale: {
			datetime: 'en',
			language: 'en',
			timezone: 'America/Los_Angeles',
			automaticDatetime: true,
			automaticLanguage: true,
			automaticTimezone: true
		}
	};

	const settings = mergeDeep(deepClone(defaultValue), deepClone(incomingValue));
	// console.log(settings);
	// console.log(expectedValue);
	// console.log(JSON.stringify(settings));
	// console.log(JSON.stringify(expectedValue));
	// console.log(JSON.stringify(settings) === JSON.stringify(expectedValue));
}

// test();

function simpleTest() {
	function deepClone(obj) {
		return JSON.parse(JSON.stringify(obj));
	}

	const defaultValue = {
		clock: {
			displays: {
				primary: 'analog',
				secondary: 'date',
				primaryPalette: 'base',
				secondaryPalette: 'base',
				primaryFontSize: 'medium',
				secondaryFontSize: 'medium',
				battery: false
			},
			theme: {
				name: 'Default Night Theme',
				face: {
					stroke: { lightness: '700', palette: 'base' },
					fill: { lightness: '900', palette: 'base' },
					strokeWidth: 0,
					shape: 'circle'
				},
				shadow: { fill: { lightness: '700', palette: 'base' } },
				pin: {
					stroke: { lightness: '700', palette: 'accent' },
					fill: { lightness: '900', palette: 'base' },
					strokeWidth: 0.5,
					size: 1
				},
				numerals: {
					style: 'none',
					fontFamily: 'Arsenal',
					fill: { lightness: '300', palette: 'base' }
				},
				ticks: {
					sm: { stroke: { lightness: '-1', palette: 'base' }, height: 0.5, width: 2 },
					md: { stroke: { lightness: '400', palette: 'base' }, height: 0.5, width: 3 },
					lg: { stroke: { lightness: '500', palette: 'base' }, height: 0.5, width: 5 }
				},
				hands: {
					hour: {
						stroke: { lightness: '700', palette: 'base' },
						strokeWidth: 0.5,
						length: 15,
						back: 3,
						linecap: 'square'
					},
					minute: {
						stroke: { lightness: '500', palette: 'base' },
						strokeWidth: 0.5,
						length: 21,
						back: 3,
						linecap: 'square'
					},
					second: {
						stroke: { lightness: '700', palette: 'accent' },
						strokeWidth: 0.5,
						length: 27,
						back: 6,
						linecap: 'square'
					}
				}
			},
			secondHandMovement: 'sweeping',
			timeFormat: 'h:mm A',
			timeFormatCustom: 'h:mm A',
			dateFormat: 'ddd, MMMM D',
			dateFormatCustom: 'ddd, MMMM D',
			datetimeFontWeight: '300'
		},
		worldclock: {
			displays: { primary: 'analog_digital', secondary: 'rows' },
			timezones: [
				{ name: '', zone: 'America/Los_Angeles' },
				{ name: '', zone: 'America/New_York' },
				{ name: 'GMT', zone: 'Europe/London' },
				{ name: '', zone: 'Asia/Colombo' },
				{ name: '', zone: 'Asia/Tokyo' }
			],
			theme: {
				name: 'Default Theme',
				face: {
					stroke: { lightness: '700', palette: 'base' },
					fill: { lightness: '100', palette: 'base' },
					strokeWidth: 0,
					shape: 'circle'
				},
				shadow: { fill: { lightness: '700', palette: 'base' } },
				pin: {
					stroke: { lightness: '700', palette: 'accent' },
					fill: { lightness: '100', palette: 'base' },
					strokeWidth: 0.5,
					size: 1
				},
				numerals: {
					style: 'none',
					fontFamily: 'Arsenal',
					fill: { lightness: '700', palette: 'base' }
				},
				ticks: {
					sm: { stroke: { lightness: '-1', palette: 'base' }, height: 0.5, width: 2 },
					md: { stroke: { lightness: '400', palette: 'base' }, height: 0.5, width: 3 },
					lg: { stroke: { lightness: '500', palette: 'base' }, height: 0.5, width: 5 }
				},
				hands: {
					hour: {
						stroke: { lightness: '700', palette: 'base' },
						strokeWidth: 0.5,
						length: 15,
						back: 3,
						linecap: 'square'
					},
					minute: {
						stroke: { lightness: '500', palette: 'base' },
						strokeWidth: 0.5,
						length: 21,
						back: 3,
						linecap: 'square'
					},
					second: {
						stroke: { lightness: '700', palette: 'accent' },
						strokeWidth: 0.5,
						length: 27,
						back: 6,
						linecap: 'square'
					}
				}
			},
			secondHandMovement: 'sweeping',
			timeFormat: null,
			timeFormatCustom: null,
			dateFormat: 'ddd, MMMM D',
			dateFormatCustom: 'ddd, MMMM D'
		},
		baseColorPalette: 'slate',
		accentColorPalette: 'red',
		darkMode: false,
		showDarkButton: true,
		showPrimaryButton: true,
		showSecondaryButton: false,
		showCastButton: false,
		showFullscreenButton: true,
		smallerMenu: false,
		alwaysCollapseMenu: false,
		hideTitlebarWhenIdle: false,
		secondsUntilIdle: 2,
		fontFamily: 'Bai Jamjuree',
		fontFamilyBody: 'Bitter',
		doubleclickFullscreen: false,
		keyboardShortcuts: true,
		locale: {
			datetime: 'en',
			language: 'en',
			timezone: 'America/Los_Angeles',
			automaticDatetime: true,
			automaticLanguage: true,
			automaticTimezone: true
		}
	};

	const incomingValue = {
		baseColorPalette: 'stone',
		accentColorPalette: 'indigo'
	};

	const expectedValue = {
		clock: {
			displays: {
				primary: 'analog',
				secondary: 'date',
				primaryPalette: 'base',
				secondaryPalette: 'base',
				primaryFontSize: 'medium',
				secondaryFontSize: 'medium',
				battery: false
			},
			theme: {
				name: 'Default Night Theme',
				face: {
					stroke: { lightness: '700', palette: 'base' },
					fill: { lightness: '900', palette: 'base' },
					strokeWidth: 0,
					shape: 'circle'
				},
				shadow: { fill: { lightness: '700', palette: 'base' } },
				pin: {
					stroke: { lightness: '700', palette: 'accent' },
					fill: { lightness: '900', palette: 'base' },
					strokeWidth: 0.5,
					size: 1
				},
				numerals: {
					style: 'none',
					fontFamily: 'Arsenal',
					fill: { lightness: '300', palette: 'base' }
				},
				ticks: {
					sm: { stroke: { lightness: '-1', palette: 'base' }, height: 0.5, width: 2 },
					md: { stroke: { lightness: '400', palette: 'base' }, height: 0.5, width: 3 },
					lg: { stroke: { lightness: '500', palette: 'base' }, height: 0.5, width: 5 }
				},
				hands: {
					hour: {
						stroke: { lightness: '700', palette: 'base' },
						strokeWidth: 0.5,
						length: 15,
						back: 3,
						linecap: 'square'
					},
					minute: {
						stroke: { lightness: '500', palette: 'base' },
						strokeWidth: 0.5,
						length: 21,
						back: 3,
						linecap: 'square'
					},
					second: {
						stroke: { lightness: '700', palette: 'accent' },
						strokeWidth: 0.5,
						length: 27,
						back: 6,
						linecap: 'square'
					}
				}
			},
			secondHandMovement: 'sweeping',
			timeFormat: 'h:mm A',
			timeFormatCustom: 'h:mm A',
			dateFormat: 'ddd, MMMM D',
			dateFormatCustom: 'ddd, MMMM D',
			datetimeFontWeight: '300'
		},
		worldclock: {
			displays: { primary: 'analog_digital', secondary: 'rows' },
			timezones: [
				{ name: '', zone: 'America/Los_Angeles' },
				{ name: '', zone: 'America/New_York' },
				{ name: 'GMT', zone: 'Europe/London' },
				{ name: '', zone: 'Asia/Colombo' },
				{ name: '', zone: 'Asia/Tokyo' }
			],
			theme: {
				name: 'Default Theme',
				face: {
					stroke: { lightness: '700', palette: 'base' },
					fill: { lightness: '100', palette: 'base' },
					strokeWidth: 0,
					shape: 'circle'
				},
				shadow: { fill: { lightness: '700', palette: 'base' } },
				pin: {
					stroke: { lightness: '700', palette: 'accent' },
					fill: { lightness: '100', palette: 'base' },
					strokeWidth: 0.5,
					size: 1
				},
				numerals: {
					style: 'none',
					fontFamily: 'Arsenal',
					fill: { lightness: '700', palette: 'base' }
				},
				ticks: {
					sm: { stroke: { lightness: '-1', palette: 'base' }, height: 0.5, width: 2 },
					md: { stroke: { lightness: '400', palette: 'base' }, height: 0.5, width: 3 },
					lg: { stroke: { lightness: '500', palette: 'base' }, height: 0.5, width: 5 }
				},
				hands: {
					hour: {
						stroke: { lightness: '700', palette: 'base' },
						strokeWidth: 0.5,
						length: 15,
						back: 3,
						linecap: 'square'
					},
					minute: {
						stroke: { lightness: '500', palette: 'base' },
						strokeWidth: 0.5,
						length: 21,
						back: 3,
						linecap: 'square'
					},
					second: {
						stroke: { lightness: '700', palette: 'accent' },
						strokeWidth: 0.5,
						length: 27,
						back: 6,
						linecap: 'square'
					}
				}
			},
			secondHandMovement: 'sweeping',
			timeFormat: null,
			timeFormatCustom: null,
			dateFormat: 'ddd, MMMM D',
			dateFormatCustom: 'ddd, MMMM D'
		},
		baseColorPalette: 'stone',
		accentColorPalette: 'indigo',
		darkMode: false,
		showDarkButton: true,
		showPrimaryButton: true,
		showSecondaryButton: false,
		showCastButton: false,
		showFullscreenButton: true,
		smallerMenu: false,
		alwaysCollapseMenu: false,
		hideTitlebarWhenIdle: false,
		secondsUntilIdle: 2,
		fontFamily: 'Bai Jamjuree',
		fontFamilyBody: 'Bitter',
		doubleclickFullscreen: false,
		keyboardShortcuts: true,
		locale: {
			datetime: 'en',
			language: 'en',
			timezone: 'America/Los_Angeles',
			automaticDatetime: true,
			automaticLanguage: true,
			automaticTimezone: true
		}
	};

	const settings = mergeDeep(deepClone(defaultValue), deepClone(incomingValue));
	console.log(settings);
	console.log(expectedValue);
	console.log(JSON.stringify(settings));
	console.log(JSON.stringify(expectedValue));
	console.log(JSON.stringify(settings) === JSON.stringify(expectedValue));
}

// simpleTest();
