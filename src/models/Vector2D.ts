import Position, { angleOfPosition, getDistanceBetween } from '../utils/Position';

export default class Vector2D implements Position {
	get magnitude() {return getDistanceBetween({ x:0, y:0 }, this);}

	get normalised() {
		const magnitude = this.magnitude;
		return new Vector2D(this.x / magnitude, this.y / magnitude);
	}

	get angle(): number { return angleOfPosition(this); }

	constructor(public x: number, public y: number) {}

	static sum(...vectors: Vector2D[]): Vector2D {
		const total = { x: 0, y: 0 };
		for (const vector of vectors) {
			total.x += vector.x;
			total.y += vector.y;
		}
		return new Vector2D(total.x, total.y);
	}

	static zero(): Vector2D { return new Vector2D(0, 0); }

	static distanceBetween(a: Vector2D, b: Vector2D): number { return getDistanceBetween(a, b); }

	vectorTo(vector: Vector2D): Vector2D { return new Vector2D(vector.x - this.x, vector.y - this.y); }

	scaled(scale: number): Vector2D { return new Vector2D(this.x * scale, this.y * scale); }

	withMagnitude(magnitude: number): Vector2D { return this.normalised.scaled(magnitude); }
}
