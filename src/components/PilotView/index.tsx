import React, { CSSProperties } from 'react';
import Background from './Background';
import { EARTH_RADIUS } from '../../models/bodies/constants';
import RocketModel from '../../models/bodies/Rocket';
import RocketElement from './Rocket';
import FlightInfoDisplay from './FlightInfoDisplay';
import VelocityIndicator from './VelocityIndicator';
import Particles from '../generic/Particles';
import Position from '../../utils/Position';

interface Props {
	rocket: RocketModel;
	style?: CSSProperties;
}
interface State {
	height: number;
	rocketImageAngle: number;
}

const DEFAULT_STATE: State = {
	height: 0,
	rocketImageAngle: 0,
};

const ROCKET_SIZE = 100;
const ROCKET_BOTTOM_FROM_VIEW_TOP = 500;
const ROCKET_FUEL_DURATION = 1500;

export default class PilotView extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = DEFAULT_STATE;
	}

	static getDerivedStateFromProps(props: Props) {
		const height = props.rocket.state.position.magnitude - EARTH_RADIUS;
		const rocketAngularPositionDegrees = props.rocket.state.angularPosition * 180 / Math.PI;
		return {
			height: height,
			rocketImageAngle: 90 - rocketAngularPositionDegrees,
		};
	}

	render() {
		return (
			<div className={'pilot-view'}>
				<Background
					style={{
						position: 'absolute',
						height: '100%',
						width: '100%',
					}}
					cameraHeight={this.state.height}
					rocketBottomY={ROCKET_BOTTOM_FROM_VIEW_TOP}
				/>
				<RocketElement style={{
					position: 'absolute',
					width: `${ROCKET_SIZE}px`,
					height: `${ROCKET_SIZE}px`,
					top: `${ROCKET_BOTTOM_FROM_VIEW_TOP - ROCKET_SIZE}px`,
					left: `${50}%`,
					transform: `
						translate(-50%, 0) 
						rotateZ(${this.state.rocketImageAngle}deg)
					`,
				}}>
					<FlightInfoDisplay
						speed={Math.round(this.props.rocket.state.velocity.magnitude)}
						height={Math.round(this.state.height)}
						rocketPosition={this.props.rocket.state.position}
						style={{
							position: 'absolute',
							width: '120px',
							top: '50%',
							left: '100%',
							transform: 'translate(10px, -50%)',
						}}
					/>
					<VelocityIndicator
						arrowInnerRadius={80}
						arrowOuterRadius={130}
						angularPosition={
							this.props.rocket.state.velocity.angle
							- this.props.rocket.state.angularPosition
							+ Math.PI / 2
						}
						style={{
							position: 'absolute',
						}}
					/>
					<Particles style={{ position: 'absolute', bottom: 0, left: 0 }} config={{
						numberOfParticles: this.props.rocket.thrustStrength * 200,
						particleDurationEstimate: ROCKET_FUEL_DURATION,
						existenceFunction: (time: number) => {
 							return (ROCKET_FUEL_DURATION - time) / ROCKET_FUEL_DURATION;
						},
						generateParticleComponent: (time: number) => (
							<div style={{ opacity: 1 - time / ROCKET_FUEL_DURATION }}>A</div>
						),
						updatePosition: (pos: Position, dt: number) => {return { x: pos.x, y: pos.y + dt * 0.1 };},
						initialPosition: () => {return { x: Math.random() * ROCKET_SIZE, y: Math.random() * 10 };},
					}}/>
				</RocketElement>

			</div>
		);
	}
}
