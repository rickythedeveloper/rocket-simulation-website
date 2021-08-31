import React, { CSSProperties } from 'react';
import { EARTH_RADIUS, ROCKET_MASS } from '../models/bodies';
import Vector2D from '../models/Vector2D';
import PilotView from './PilotView';
import Simulator from '../models/Simulator';
import { earth, rocket } from '../models/bodies';
import KeyboardStates from '../utils/KeyboardStates';

interface Props {
	style?: CSSProperties;
}
interface State {
	rocketPosition: Vector2D;
}

const DEFAULT_STATE: State = {
	rocketPosition: new Vector2D(0, EARTH_RADIUS),
};
const SIMULATION_DT = 1;

export default class SimulatorScreen extends React.Component<Props, State> {

	simulator: Simulator;

	simulatorInterval?: NodeJS.Timer;

	componentDidMount() {
		this.simulatorInterval = setInterval(() => {
			this.simulator.rollForward(SIMULATION_DT);
			this.setState({
				rocketPosition: rocket.position,
			});
		}, SIMULATION_DT * 1000);
	}

	componentWillUnmount() {
		if (this.simulatorInterval) clearInterval(this.simulatorInterval);
	}

	constructor(props: Props) {
		super(props);
		this.simulator = new Simulator();
		this.simulator.addBodies(earth, rocket);
		this.state = DEFAULT_STATE;

		const keyboardListener = new KeyboardStates();
		keyboardListener.addKey('ArrowUp', () => {
			rocket.unnaturalForce = new Vector2D(0, ROCKET_MASS * 10);
		}, () => {
			rocket.unnaturalForce = undefined;
		});
	}

	render() {
		return (
			<div>
				<PilotView rocketPosition={this.state.rocketPosition}/>
			</div>
		);
	}
}
