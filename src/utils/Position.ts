export default interface Position {
	x: number;
	y: number;
}

export function getDistanceBetween(a: Position, b: Position): number {
	return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

export function angleOfPosition(position: Position): number {
	if (position.x === 0) {
		return position.y > 0 ? Math.PI / 2 : -Math.PI / 2;
	}
	const angleRadians = Math.atan(position.y / position.x);
	if (position.x > 0) return angleRadians;
	return angleRadians + (position.y > 0 ? 1 : -1) * Math.PI;
}
