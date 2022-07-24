// Returns a uid nearly guaranteed to be unique

// https://stackoverflow.com/a/44078785
const uid = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

const test = () => {
	const size = 1_000_000;
	const set = new Set(new Array(size).fill(0).map(() => uid()));

	console.log(size === set.size ? 'all ids are unique' : `not unique records ${size - set.size}`);
};

export default uid;
