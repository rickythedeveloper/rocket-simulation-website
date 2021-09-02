export function randomNumberBetween(a: number, b: number): number {
	return a + (b - a) * Math.random();
}

export function arrayWithRemovedIndex<T>(array: Array<T>, index: number): Array<T> {
	return array.slice(0, index).concat(array.slice(index + 1, array.length));
}

export function arrayWithRemovedIndices<T>(array: Array<T>, indices: number[]): Array<T> {
	indices.sort((lhs, rhs) => rhs - lhs);
	let newArray: Array<T> = array;
	indices.forEach(index => {
		newArray = arrayWithRemovedIndex(newArray, index);
	});
	return newArray;
}
