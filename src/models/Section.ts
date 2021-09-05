
import Position from '../utils/Position';

export default interface Section {
	title: string;
	content: JSX.Element;
	position: Position;
	radius: number;
}
