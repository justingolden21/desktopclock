export const splitStringThree = (str, idx0, idx1, idx2) => [
	str.substring(idx0, idx1),
	str.substring(idx1, idx2),
	str.substring(idx2)
];

export const removeBold = (str) => str?.replace(/<(strong)>/g, '').replace(/<\/(strong)>/g, '');
