import React, { CSSProperties } from 'react';
import rocketImage from '../../../assets/rocket.png';
import FlightInfoDisplay from './FlightInfoDisplay';
import VelocityIndicator from './VelocityIndicator';
import RocketModel from '../../../models/bodies/Rocket';
import Particles, { ParticlesConfig } from '../../generic/Particles';
import { EARTH_RADIUS } from '../../../models/bodies/constants';
import ThrustParticle from './ThrustParticle';
import Position from '../../../utils/Position';

interface Props {
	rocket: RocketModel;
	style?: CSSProperties;
}
interface State {}

function getHeight(rocket: RocketModel): number { return rocket.state.position.magnitude - EARTH_RADIUS; }

const THRUST_PARTICLE_DURATION = 250;
const THRUST_PARTICLE_SPEED = 0.6; // 'Pixels' per millisecond
const THRUST_PARTICLE_COUNT = 80;
const THRUST_WIDTH = 20;
const THRUST_MARGIN = 10;

const thrustParticleUpdatePosition = (pos: Position, dt: number) => {
	return { x: pos.x, y: pos.y + dt * THRUST_PARTICLE_SPEED };
};
const thrustParticlesCommonStyle = (thrustDirection: number): CSSProperties => {
	return {
		position: 'absolute',
		bottom: 0,
		width: THRUST_WIDTH,
		transform: `rotateZ(${-thrustDirection * 180 / Math.PI}deg)`,
	};
};
const thrustParticleExistenceFunction = (time: number) => {
	return (THRUST_PARTICLE_DURATION - time) / THRUST_PARTICLE_DURATION;
};
const getThrustParticle = (time: number) => (
	<ThrustParticle lifecycle={time / THRUST_PARTICLE_DURATION}/>
);
const thrustParticleInitialPosition = () => {
	return { x: Math.random() * THRUST_WIDTH, y: Math.random() * 10 };
};
const thrustParticlesConfig = (thrustStrength: number): ParticlesConfig => {
	return {
		numberOfParticles: thrustStrength * THRUST_PARTICLE_COUNT,
		particleDurationEstimate: THRUST_PARTICLE_DURATION,
		existenceFunction: thrustParticleExistenceFunction,
		generateParticleComponent: getThrustParticle,
		updatePosition: thrustParticleUpdatePosition,
		initialPosition: thrustParticleInitialPosition,
	};
};

export default class Rocket extends React.Component<Props, State> {
	render() {
		const rocketStyle: CSSProperties = {
			backgroundColor: '#f003',
			alignItems: 'center',
			justifyContent: 'center',
			display: 'flex',
			objectFit: 'contain',
			...this.props.style,
		};
		return (
			<div className={'rocket'} style={rocketStyle}>
				<img src={rocketImage} style={{
					maxWidth: '100%',
					maxHeight: '100%',
				}}/>
				{/* {this.props.children} */}
				<FlightInfoDisplay
					speed={Math.round(this.props.rocket.state.velocity.magnitude)}
					height={Math.round(getHeight(this.props.rocket))}
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
				<Particles style={{
					...thrustParticlesCommonStyle(this.props.rocket.thrustDirection),
					left: THRUST_MARGIN,
				}} config={thrustParticlesConfig(this.props.rocket.thrustStrength)}/>
				<Particles style={{
					...thrustParticlesCommonStyle(this.props.rocket.thrustDirection),
					right: THRUST_MARGIN,
				}} config={thrustParticlesConfig(this.props.rocket.thrustStrength)}/>
			</div>
		);
	}
}
