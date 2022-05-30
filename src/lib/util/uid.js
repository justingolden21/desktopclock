// https://dev.to/roblevintennis/comment/1ol48
const uid = () => String(Date.now().toString(32) + Math.random().toString(16)).replace(/\./g, '');

const test = () => {
	const size = 1_000_000;
	const set = new Set(new Array(size).fill(0).map(() => uid()));

	console.log(size === set.size ? 'all ids are unique' : `not unique records ${size - set.size}`);
};

export default uid;
