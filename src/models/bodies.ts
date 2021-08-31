import Body from './Body';
import Vector2D from './Vector2D';

const EARTH_RADIUS = 6371000;
const EARTH_MASS = 6 * 10 ** 24;
const earth = new Body(EARTH_MASS);
earth.boundaryFunction = (offset: Vector2D) => offset.magnitude < EARTH_RADIUS;
earth.canMove = false;

const ROCKET_MASS = 1000;
const ROCKET_SIZE = 10;
const rocket = new Body(ROCKET_MASS, new Vector2D(0, EARTH_RADIUS + 500));
rocket.boundaryFunction = (offset: Vector2D) => {
	return offset.x > -ROCKET_SIZE / 2 && offset.x < ROCKET_SIZE / 2
	&& offset.y > -ROCKET_SIZE / 2 && offset.y < ROCKET_SIZE / 2;
};
rocket.testPoints = [
	new Vector2D(-ROCKET_SIZE / 2, -ROCKET_SIZE / 2),
	new Vector2D(-ROCKET_SIZE / 2, ROCKET_SIZE / 2),
	new Vector2D(ROCKET_SIZE / 2, ROCKET_SIZE / 2),
	new Vector2D(ROCKET_SIZE / 2, -ROCKET_SIZE / 2),
];

export { earth, rocket };
export { EARTH_RADIUS };
export { ROCKET_MASS };
