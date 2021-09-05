import { EARTH_RADIUS } from '../../models/bodies/constants';
import Section from '../../models/Section';
import helloSection from './helloSection';

const sections: readonly Section[] = [
	{
		title: 'Hello',
		content: helloSection,
		position: { x: 0, y: EARTH_RADIUS + 500 },
		radius: 100,
	},
] as const;

export default sections;
