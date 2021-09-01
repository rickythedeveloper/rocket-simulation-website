import Body from '../Body';
import Vector2D from '../Vector2D';
import { EARTH_MASS, EARTH_RADIUS } from './constants';

export default class Earth extends Body {
	constructor() {
		super();
		this.state.mass = EARTH_MASS;

		this.boundaryFunction = (offset: Vector2D) => offset.magnitude < EARTH_RADIUS;
		this.canMove = false;
	}
}
