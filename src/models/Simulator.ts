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
				const vectorToOtherBody = massiveBody.state.position.vectorTo(otherBody.state.position);
				const forceMagnitude =
				GRAVITATIONAL_CONSTANT * massiveBody.state.mass * otherBody.state.mass
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
			const newState = massiveBody.getNewState(
				dt,
				Vector2D.sum(forces[index], massiveBody.additionalForce),
				massiveBody.additionalTorque,
			);

			let willCollide = false;
			for (let i = 0; i < this.bodies.length; i++) {
				if (index === i ) continue;

				const otherBody = this.bodies[i];
				if (otherBody.boundaryFunction === undefined) continue;

				for (let j = 0; j < massiveBody.testPoints.length; j++) {
					const testPoint = Vector2D.sum(newState.position, massiveBody.testPoints[j]);
					const positionFromOtherBody = otherBody.state.position.vectorTo(testPoint);
					if (otherBody.boundaryFunction(positionFromOtherBody)) {
						willCollide = true;
						break;
					}
				}
			}

			if (willCollide) {
				if (massiveBody.collisionHandler) massiveBody.collisionHandler();
			} else {
				massiveBody.state = newState;
			}
		}
	}
}
