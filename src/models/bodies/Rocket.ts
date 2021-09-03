import Body from '../Body';
import Vector2D from '../Vector2D';
import { EARTH_RADIUS, ROCKET_MAX_THRUST } from '../bodies/constants';
import { ROCKET_MASS, ROCKET_SIZE } from '../bodies/constants';

export default class Rocket extends Body {

	get additionalForce() { return this.thrust; }

	get thrust(): Vector2D { return this.rocketDirection.scaled(this.thrustStrength * ROCKET_MAX_THRUST); }

	_thrustStrength: number = 0;

	get thrustStrength(): number { return this._thrustStrength; }

	set thrustStrength(value: number) {
		if (value < 0) throw new Error('thrustStrength cannot be less than 0');
		if (value > 1) throw new Error('thrustStrength cannot be greater than 1');
		this._thrustStrength = value;
	}

	get additionalTorque() {
		return this.thrust.magnitude * 20 * (-Math.sin(this.thrustDirection));
	}

	_thrustDirection: number = 0;

	get thrustDirection(): number { return this._thrustDirection; }

	set thrustDirection(value: number) {
		if (value < -Math.PI / 2) throw new Error('torqueStrength cannot be less than -pi/2');
		if (value > Math.PI / 2) throw new Error('torqueStrength cannot be greater than pi/2');
		this._thrustDirection = value;
	}

	get rocketDirection(): Vector2D {
		const x = Math.cos(this.state.angularPosition);
		const y = Math.sin(this.state.angularPosition);
		return new Vector2D(x, y);
	}

	constructor() {
		super();
		this.state.mass = ROCKET_MASS;
		this.state.angularMomentOfInertia = 10 ** 6;
		this.state.position = new Vector2D(0, EARTH_RADIUS + 500);
		this.state.velocity = Vector2D.zero();
		this.state.angularPosition = Math.PI / 2;

		this.boundaryFunction = (offset: Vector2D) => {
			return offset.x > -ROCKET_SIZE / 2 && offset.x < ROCKET_SIZE / 2
			&& offset.y > -ROCKET_SIZE / 2 && offset.y < ROCKET_SIZE / 2;
		};
		this.testPoints = [
			new Vector2D(-ROCKET_SIZE / 2, -ROCKET_SIZE / 2),
			new Vector2D(-ROCKET_SIZE / 2, ROCKET_SIZE / 2),
			new Vector2D(ROCKET_SIZE / 2, ROCKET_SIZE / 2),
			new Vector2D(ROCKET_SIZE / 2, -ROCKET_SIZE / 2),
		];
	}
}
