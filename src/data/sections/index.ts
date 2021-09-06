import { EARTH_RADIUS } from '../../models/bodies/constants';
import Section from '../../models/Section';
import helloSection from './helloSection';

const sections: readonly Section[] = [
	{
		title: 'Hello',
		content: helloSection,
		position: { x: 0, y: EARTH_RADIUS + 5500 },
		radius: 5000,
	},
] as const;

export default sections;
