import React, { CSSProperties } from 'react';
import Vector2D from '../models/Vector2D';
import PilotView from './PilotView';
import Simulator from '../models/Simulator';
import Earth from '../models/bodies/Earth';
import Rocket from '../models/bodies/Rocket';
import { EARTH_RADIUS } from '../models/bodies/constants';
import KeyboardStates from '../utils/KeyboardStates';
import GenericButton from './generic/GenericButton';
import Modal from './generic/Modal';
import SectionModel from '../models/Section';

interface Props {
	style?: CSSProperties;
}
interface State {
	rocketPosition: Vector2D;
	simulationIsRunning: boolean;
	modalIsShown: boolean;
	modalContent: JSX.Element;
}

const DEFAULT_STATE: State = {
	rocketPosition: new Vector2D(0, EARTH_RADIUS),
	simulationIsRunning: false,
	modalIsShown: false,
	modalContent: <div/>,
};
const SIMULATION_DT = 0.01;
const sections = [
	{
		title: 'Hello',
		content: <div style={{ backgroundColor: 'red' }}>Hello</div>,
		position: { x: 0, y: EARTH_RADIUS + 500 },
		radius: 100,
	},
	{
		title: 'Second sectio',
		content: <div>Broo</div>,
		position: { x: 500, y: EARTH_RADIUS + 200 },
		radius: 150,
	},
];

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
				this.rocket.state.velocity = Vector2D.zero();
			} else {
				this.rocket.canMove = false;
			}
		};

		this.addKeyboardListeners();
	}

	addKeyboardListeners() {
		const keyboardListener = new KeyboardStates();
		keyboardListener.addKey(
			'ArrowUp',
			() => { this.setFullThrust(); },
			() => { this.setNoThrust(); },
		);
		keyboardListener.addKey(
			'ArrowLeft',
			() => { this.setTorqueAnticlockwise(); },
			() => { this.setNoTorque(); },
		);
		keyboardListener.addKey(
			'ArrowRight',
			() => { this.setTorqueClockwise(); },
			() => { this.setNoTorque(); },
		);
	}

	setFullThrust() { this.rocket.thrustStrength = 1; }

	setNoThrust() { this.rocket.thrustStrength = 0; }

	setTorqueAnticlockwise() { this.rocket.thrustDirection = - Math.PI / 10; }

	setTorqueClockwise() { this.rocket.thrustDirection = Math.PI / 10; }

	setNoTorque() {this.rocket.thrustDirection = 0; }

	resetSimulation() {
		this.rocket = new Rocket();
		this.earth = new Earth();
		this.simulator.setBodies(this.rocket, this.earth);
	}

	pauseSimulation() {
		this.setState((prev) => {return { simulationIsRunning: !prev.simulationIsRunning };});
	}

	showModal(section: SectionModel) {
		this.setState({
			modalIsShown: true,
			modalContent: section.content,
		});
	}

	render() {
		const containerStyle: CSSProperties = {
			width: '100%',
			height: '100%',
		};
		const simulationCoreButtonsContainer: CSSProperties = {
			top: '10px',
			left: '10px',
		};
		const arrowButtonsContainer: CSSProperties = {
			bottom: '10px',
			right: '10px',
		};
		const buttonsContainer: CSSProperties = {
			position: 'absolute',
			display: 'flex',
			flexDirection: 'row',
			gap: '10px',
		};
		return (
			<div className={'simulator-screen'} style={containerStyle}>
				<PilotView
					rocket={this.rocket}
					sections={sections}
					showSection={(section) => {
						this.pauseSimulation();
						this.showModal(section);
					}}
				/>
				<div style={{ ...buttonsContainer, ...simulationCoreButtonsContainer }}>
					<GenericButton style={{
						top: 0,
						left: 0,
					}} onClick={() => { this.resetSimulation(); }}>
					Reset
					</GenericButton>
					<GenericButton style={{
						top: 0,
						left: 100,
					}} onClick={() => { this.pauseSimulation(); }}>
						{this.state.simulationIsRunning ? 'Pause' : 'Resume'}
					</GenericButton>
				</div>
				<div style={{ ...buttonsContainer, ...arrowButtonsContainer }}>
					<GenericButton
						onTouchStart={this.setTorqueAnticlockwise.bind(this)}
						onTouchEnd={this.setNoTorque.bind(this)}
					>
						Left
					</GenericButton>
					<GenericButton
						onTouchStart={this.setFullThrust.bind(this)}
						onTouchEnd={this.setNoThrust.bind(this)}
					>
						Thrust
					</GenericButton>
					<GenericButton
						onTouchStart={this.setTorqueClockwise.bind(this)}
						onTouchEnd={this.setNoTorque.bind(this)}
					>
						Right
					</GenericButton>
				</div>
				<Modal isShown={this.state.modalIsShown} didTouchOutside={() => {
					this.setState({ modalIsShown: false });
					this.pauseSimulation();
				}}>
					{this.state.modalContent}
				</Modal>
			</div>
		);
	}
}
