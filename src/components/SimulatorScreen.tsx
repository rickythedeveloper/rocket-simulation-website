import React, { CSSProperties } from 'react';
import Vector2D from '../models/Vector2D';
import PilotView from './PilotView';
import Simulator from '../models/Simulator';
import Earth from '../models/bodies/Earth';
import Rocket from '../models/bodies/Rocket';
import { EARTH_RADIUS, ROCKET_MASS } from '../models/bodies/constants';
import KeyboardStates from '../utils/KeyboardStates';
import GenericButton from './generic/GenericButton';

interface Props {
	style?: CSSProperties;
}
interface State {
	rocketPosition: Vector2D;
	simulationIsRunning: boolean;
}

const DEFAULT_STATE: State = {
	rocketPosition: new Vector2D(0, EARTH_RADIUS),
	simulationIsRunning: false,
};
const SIMULATION_DT = 0.01;

export default class SimulatorScreen extends React.Component<Props, State> {

	simulator: Simulator;

	simulatorInterval?: NodeJS.Timer;

	earth: Earth = new Earth();

	rocket: Rocket = new Rocket();

	componentDidMount() {
		this.setState({ simulationIsRunning: true });

		this.simulatorInterval = setInterval(() => {
			if (!this.state.simulationIsRunning) return;
			this.simulator.rollForward(SIMULATION_DT);
			this.setState({
				rocketPosition: this.rocket.state.position,
			});
		}, SIMULATION_DT * 1000);
	}

	componentWillUnmount() {
		if (this.simulatorInterval) clearInterval(this.simulatorInterval);
	}

	constructor(props: Props) {
		super(props);
		this.simulator = new Simulator();
		this.simulator.setBodies(this.rocket, this.earth);
		this.state = DEFAULT_STATE;
		this.rocket.collisionHandler = () => {
			if (this.rocket.state.velocity.magnitude < 10) {
				console.log('LANDED');
				this.rocket.state.velocity = Vector2D.zero();
			} else {
				console.log('EXPLODED');
				this.rocket.canMove = false;
			}
		};

		this.addKeyboardListeners();
	}

	addKeyboardListeners() {
		const keyboardListener = new KeyboardStates();
		keyboardListener.addKey(
			'ArrowUp',
			() => { this.rocket.additionalForce = new Vector2D(0, ROCKET_MASS * 15); },
			() => { this.rocket.additionalForce = Vector2D.zero(); },
		);
		keyboardListener.addKey(
			'ArrowLeft',
			() => { this.rocket.additionalTorque = 10 ** 7; },
			() => { this.rocket.additionalTorque = 0; },
		);
		keyboardListener.addKey(
			'ArrowRight',
			() => { this.rocket.additionalTorque = - (10 ** 7); },
			() => { this.rocket.additionalTorque = 0; },
		);
	}

	resetSimulation() {
		this.rocket = new Rocket();
		this.earth = new Earth();
		this.simulator.setBodies(this.rocket, this.earth);
	}

	pauseSimulation() {
		this.setState((prev) => {return { simulationIsRunning: !prev.simulationIsRunning };});
	}

	render() {
		return (
			<div>
				<PilotView rocket={this.rocket}/>
				<GenericButton style={{
					top: 0,
					left: 0,
				}} onPress={() => { this.resetSimulation(); }}>
					Reset
				</GenericButton>
				<GenericButton style={{
					top: 0,
					left: 100,
				}} onPress={() => { this.pauseSimulation(); }}>
					{this.state.simulationIsRunning ? 'Pause' : 'Resume'}
				</GenericButton>
			</div>
		);
	}
}
