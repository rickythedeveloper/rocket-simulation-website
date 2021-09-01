import Body from '../Body';
import Vector2D from '../Vector2D';
import { EARTH_RADIUS } from '../bodies/constants';
import { ROCKET_MASS, ROCKET_SIZE } from '../bodies/constants';

export default class Rocket extends Body {
	constructor() {
		super();
		this.mass = ROCKET_MASS;
		this.anglularMomentInertia = 10 ** 8;
		this.position = new Vector2D(0, EARTH_RADIUS + 500);
		this.speed = Vector2D.zero();
		this.direction = Math.PI / 2;

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
