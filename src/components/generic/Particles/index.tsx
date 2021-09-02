import React, { CSSProperties } from 'react';
import Position from '../../../utils/Position';

interface ParticleProps {
	style: CSSProperties;
}

export interface ParticlesConfig {
	numberOfParticles: number;
	particleDuration: number;
	generateParticleComponent: () => React.ReactElement<ParticleProps>;
	updatePosition: (position: Position, dt: number) => Position;
}

interface Props {
	config: ParticlesConfig;
	style?: CSSProperties;
}
interface State {
	positions: Position[];
}
const DEFAULT_STATE: State = {
	positions: [],
};
const PARTICLE_UPDATE_INTERVAL = 10;

export default class Particles extends React.Component<Props, State> {
	particleInterval?: NodeJS.Timer;

	constructor(props: Props) {
		super(props);
		const initialPositions: Position[] = [];
		for (let i = 0; i < this.props.config.numberOfParticles; i++) {
			initialPositions.push({ x: 10 * i, y: 0 });
		}
		this.state = { positions: initialPositions };
	}

	componentDidMount() {
		this.particleInterval = setInterval(() => {
			this.setState(
				(prev) => {
					return {
						positions: prev.positions.map(pos =>
							this.props.config.updatePosition(pos, PARTICLE_UPDATE_INTERVAL / 1000)),
					};
				});
		}, PARTICLE_UPDATE_INTERVAL);
	}

	componentWillUnmount() {
		if (this.particleInterval) clearInterval(this.particleInterval);
	}

	generateParticle(position: Position) {
		return (
			<div style={{ position: 'absolute', left: position.x, top: position.y }}>
				{this.props.config.generateParticleComponent()}
			</div>
		);
	}

	render() {
		const containerStyle: CSSProperties = {
			...this.props.style,
		};
		return (
			<div style={containerStyle}>
				{this.state.positions.map(pos => this.generateParticle(pos))}
			</div>
		);
	}
}
