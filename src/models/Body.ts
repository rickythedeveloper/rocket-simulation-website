import Vector2D from './Vector2D';

export default class Body {
	boundaryFunction?: (offsetFromBodyPosition: Vector2D) => boolean; // true if inside, false if outside

	canMove: boolean = true;

	testPoints: Vector2D[] = [];

	unnaturalForce?: Vector2D;

	collisionHandler?: () => void;

	constructor(
		public mass: number,
		public position: Vector2D = Vector2D.zero(),
		public speed: Vector2D = Vector2D.zero(),
	) {}

	calculateDelta(dt: number, force: Vector2D): { positionDelta: Vector2D; speedDelta: Vector2D } | null {
		if (!this.canMove) return null;
		const unnaturalForce = this.unnaturalForce ? this.unnaturalForce : Vector2D.zero();
		const acceleration = Vector2D.sum(force, unnaturalForce).scaled(1 / this.mass);
		const positionDelta = Vector2D.sum(this.speed.scaled(dt), acceleration.scaled(0.5 * dt ** 2));
		const speedDelta = acceleration.scaled(dt);
		return { positionDelta, speedDelta };
	}
}
