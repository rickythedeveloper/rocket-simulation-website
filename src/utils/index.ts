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

export function edgeCoordsWithAngle(
	angle: number,
	elementWidth: number,
	elementHeight: number,
	padding: number,
): { x: number; y: number } {
	const availableHeight = elementHeight - padding * 2, availableWidth = elementWidth - padding * 2;
	const halfAvailableHeight = availableHeight / 2, halfAvailableWidth = availableWidth / 2;
	const cornerAngle = Math.atan(availableHeight / availableWidth);
	if (angle <= -Math.PI) return edgeCoordsWithAngle(angle + 2 * Math.PI, elementWidth, elementHeight, padding);
	if (angle <= -Math.PI + cornerAngle) {
		return {
			x: padding,
			y: padding + halfAvailableHeight + halfAvailableWidth * Math.tan(angle),
		};
	}
	if (angle <= -cornerAngle) {
		return {
			x: padding + halfAvailableWidth - halfAvailableHeight / Math.tan(angle),
			y: elementHeight - padding,
		};
	}
	if (angle <= cornerAngle) {
		return {
			x: elementWidth - padding,
			y: padding + halfAvailableHeight - halfAvailableWidth * Math.tan(angle),
		};
	}
	if (angle <= Math.PI - cornerAngle) {
		return {
			x: padding + halfAvailableHeight / Math.tan(angle) + halfAvailableWidth,
			y: padding,
		};
	}
	if (angle <= Math.PI) {
		return {
			x: padding,
			y: padding + halfAvailableHeight + halfAvailableWidth * Math.tan(angle),
		};
	}
	return edgeCoordsWithAngle(angle - 2 * Math.PI, elementWidth, elementHeight, padding);
}
