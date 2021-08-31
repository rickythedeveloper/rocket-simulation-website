import Body from './Body';
import Vector2D from './Vector2D';

const GRAVITATIONAL_CONSTANT = 6.67408 * 10 ** (-11);

export default class Simulator {
	bodies: Body[] = [];

	setBodies(...bodies: Body[]) {
		this.bodies = bodies;
	}

	calculateForces() {
		const forces: Vector2D[] = this.bodies.map((massiveBody, index) => {
			let force: Vector2D = new Vector2D(0, 0);

			for (let i = 0; i < this.bodies.length; i++) {
				if (index === i) continue;
				const otherBody = this.bodies[i];
				const vectorToOtherBody = massiveBody.position.vectorTo(otherBody.position);
				const forceMagnitude =
				GRAVITATIONAL_CONSTANT * massiveBody.mass * otherBody.mass
				/ vectorToOtherBody.magnitude ** 2;

				const additionalForce = vectorToOtherBody.withMagnitude(forceMagnitude);
				force = Vector2D.sum(force, additionalForce);
			}
			return force;
		});
		return forces;
	}

	rollForward(dt: number) {
		const forces = this.calculateForces();
		for (let index = 0; index < this.bodies.length; index++) {
			const massiveBody = this.bodies[index];
			const deltas = massiveBody.calculateDelta(dt, forces[index]);
			if (deltas === null) continue;

			const { positionDelta, speedDelta } = deltas;
			const newPosition = Vector2D.sum(massiveBody.position, positionDelta);
			const newSpeed = Vector2D.sum(massiveBody.speed, speedDelta);

			let willCollide = false;
			for (let i = 0; i < this.bodies.length; i++) {
				if (index === i ) continue;

				const otherBody = this.bodies[i];
				if (otherBody.boundaryFunction === undefined) continue;

				for (let j = 0; j < massiveBody.testPoints.length; j++) {
					const testPoint = Vector2D.sum(newPosition, massiveBody.testPoints[j]);
					const positionFromOtherBody = otherBody.position.vectorTo(testPoint);
					if (otherBody.boundaryFunction(positionFromOtherBody)) {
						willCollide = true;
						break;
					}
				}
			}

			if (willCollide) {
				if (massiveBody.collisionHandler) massiveBody.collisionHandler();
			} else {
				massiveBody.position = newPosition;
				massiveBody.speed = newSpeed;
			}
		}
	}
}
