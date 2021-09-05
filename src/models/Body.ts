import Vector2D from './Vector2D';

interface BodyState {
	mass: number;
	angularMomentOfInertia: number;
	position: Vector2D;
	velocity: Vector2D;
	angularPosition: number;
	angularVelocity: number;
}

export default abstract class Body {
	state: BodyState = {
		mass: 1000,
		angularMomentOfInertia: 1000,
		position: Vector2D.zero(),
		velocity: Vector2D.zero(),
		angularPosition: 0, // right = 0, top = pi/2, left = pi, bottom = -pi/2 or 3pi/2
		angularVelocity: 0, // positive anti-clockwise
	};

	canMove: boolean = true;

	abstract get testPoints(): Vector2D[];

	abstract get additionalForce(): Vector2D;

	abstract get additionalTorque(): number;

	collisionHandler?: () => void;

	boundaryFunction?: (offsetFromBodyPosition: Vector2D) => boolean; // true if inside, false if outside

	getNewState(dt: number, force: Vector2D, torque: number): BodyState {
		const acceleration = force.scaled(1 / this.state.mass);
		const angularAcceleration = torque / this.state.angularMomentOfInertia;

		const positionDelta = Vector2D.sum(this.state.velocity.scaled(dt), acceleration.scaled(0.5 * dt ** 2));
		const velocityDelta = acceleration.scaled(dt);
		const angularPositionDelta = this.state.angularVelocity * dt + 0.5 * angularAcceleration * dt ** 2;
		const angularVelocityDelta = angularAcceleration * dt;

		return {
			mass: this.state.mass,
			angularMomentOfInertia: this.state.angularMomentOfInertia,
			position: Vector2D.sum(this.state.position, positionDelta),
			velocity: Vector2D.sum(this.state.velocity, velocityDelta),
			angularPosition: this.state.angularPosition + angularPositionDelta,
			angularVelocity: this.state.angularVelocity + angularVelocityDelta,
		};
	}
}
