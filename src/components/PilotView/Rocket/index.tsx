import React, { CSSProperties } from 'react';
import rocketImage from '../../../assets/rocket.svg';
import VelocityIndicator from './VelocityIndicator';
import RocketModel from '../../../models/bodies/Rocket';
import Particles, { ParticlesConfig } from '../../generic/Particles';
import ThrustParticle from './ThrustParticle';
import Position from '../../../utils/Position';

interface Props {
	rocket: RocketModel;
	style?: CSSProperties;
}
interface State {}

const THRUST_PARTICLE_DURATION = 250;
const THRUST_PARTICLE_SPEED = 0.6; // 'Pixels' per millisecond
const THRUST_PARTICLE_COUNT = 60;
const THRUST_WIDTH = 10;
const THRUST_MARGIN = '15%';

const thrustParticleUpdatePosition = (pos: Position, dt: number) => {
	return { x: pos.x, y: pos.y + dt * THRUST_PARTICLE_SPEED };
};
const thrustParticlesCommonStyle = (thrustDirection: number): CSSProperties => {
	return {
		position: 'absolute',
		bottom: 12,
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
	return { x: Math.random() * THRUST_WIDTH, y: Math.random() * 20 };
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
				<VelocityIndicator
					arrowInnerRadius={180}
					arrowOuterRadius={280}
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
