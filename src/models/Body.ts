import Vector2D from './Vector2D';

export default class Body {
	mass: number = 1000;

	anglularMomentInertia: number = 1000;

	position: Vector2D = Vector2D.zero();

	speed: Vector2D = Vector2D.zero();

	angularVelocity: number = 0;

	boundaryFunction?: (offsetFromBodyPosition: Vector2D) => boolean; // true if inside, false if outside

	canMove: boolean = true;

	testPoints: Vector2D[] = [];

	unnaturalForce?: Vector2D;

	unnaturalTorque: number = 0;

	collisionHandler?: () => void;

	direction: number = 0; // right = 0, top = pi/2, left = pi, bottom = -pi/2 or 3pi/2

	calculateDelta(
		dt: number,
		force: Vector2D,
		torque: number,
	): { positionDelta: Vector2D; speedDelta: Vector2D; directionDelta: number; angularVelocityDelta: number } | null {
		if (!this.canMove) return null;
		const unnaturalForce = this.unnaturalForce ? this.unnaturalForce : Vector2D.zero();
		const linearAcceleration = Vector2D.sum(force, unnaturalForce).scaled(1 / this.mass);
		const angularAcceleration = (torque + this.unnaturalTorque) / this.anglularMomentInertia;
		const positionDelta = Vector2D.sum(this.speed.scaled(dt), linearAcceleration.scaled(0.5 * dt ** 2));
		const speedDelta = linearAcceleration.scaled(dt);
		const directionDelta = this.angularVelocity * dt + 0.5 * angularAcceleration * dt ** 2;
		const angularVelocityDelta = angularAcceleration * dt;
		return { positionDelta, speedDelta, directionDelta, angularVelocityDelta };
	}
}
