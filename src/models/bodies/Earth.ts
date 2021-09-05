import Body from '../Body';
import Vector2D from '../Vector2D';
import { EARTH_MASS, EARTH_RADIUS } from './constants';

export default class Earth extends Body {
	get additionalForce() { return Vector2D.zero(); }

	get additionalTorque() { return 0; }

	get testPoints(): Vector2D[] { return []; }

	constructor() {
		super();
		this.state.mass = EARTH_MASS;

		this.boundaryFunction = (offset: Vector2D) => offset.magnitude < EARTH_RADIUS;
		this.canMove = false;
	}
}
