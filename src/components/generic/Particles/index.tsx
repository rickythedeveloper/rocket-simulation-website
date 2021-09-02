import React, { CSSProperties } from 'react';
import Position from '../../../utils/Position';
import { arrayWithRemovedIndices } from '../../../utils/index';

interface ParticleProps {
	style: CSSProperties;
}

export interface ParticlesConfig {
	numberOfParticles: number;
	particleDurationEstimate: number;
	generateParticleComponent: (time: number) => React.ReactElement<ParticleProps> | null;
	updatePosition: (position: Position, dt: number) => Position;
	initialPosition: () => Position;
}

interface Props {
	config: ParticlesConfig;
	style?: CSSProperties;
}

interface ParticleState {
	id: number;
	position: Position;
	time: number; // time passed for each particle
}
interface State {
	particleStates: ParticleState[];
	particles: JSX.Element[];
	missingIndices: number[];
}

const PARTICLE_UPDATE_INTERVAL = 10;

export default class Particles extends React.Component<Props, State> {
	particleInterval?: NodeJS.Timer;

	constructor(props: Props) {
		super(props);
		const initialPositions: Position[] = [];
		for (let i = 0; i < this.props.config.numberOfParticles; i++) {
			initialPositions.push({ x: 10 * i, y: 0 });
		}
		this.state = {
			particleStates: initialPositions.map(pos => {
				return {
					id: Math.random(),
					position: pos,
					time: 0,
				};
			}),
			particles: [],
			missingIndices: [],
		};
	}

	componentDidMount() {
		this.particleInterval = setInterval(this.rollForward.bind(this), PARTICLE_UPDATE_INTERVAL);
	}

	componentWillUnmount() {
		if (this.particleInterval) clearInterval(this.particleInterval);
	}

	rollForward() {
		this.cleanParticleStates();
		this.addParticlesStates();
		this.updateParticleStates();
		this.updateParticles();
	}

	/**
	 * Clear the particle states for the particles that weren't used in the last render,
	 */
	cleanParticleStates() {
		this.setState((prev) => {
			return {
				particleStates: arrayWithRemovedIndices(prev.particleStates, prev.missingIndices),
				missingIndices: [],
			};
		});
	}

	/**
	 * Add some (or all) of 'missing' particle states.
	 */
	addParticlesStates() {
		const target = this.props.config.numberOfParticles;
		const current = this.state.particles.length;
		const missingCount = target - current;
		const estimate =
			this.props.config.numberOfParticles
			* (PARTICLE_UPDATE_INTERVAL / 1000)
			/ this.props.config.particleDurationEstimate;

		const generationProb = missingCount / estimate;

		const additionalParticleStates: ParticleState[] = [];
		for (let i = 0; i < missingCount; i++) {
			if (Math.random() < generationProb) additionalParticleStates.push({
				id: Math.random(),
				position: this.props.config.initialPosition(),
				time: 0,
			});
		}
		if (additionalParticleStates.length > 0) {
			console.log('Added ', additionalParticleStates.length, 'particle states');
		}
		this.setState((prev) => {
			return {
				particleStates: prev.particleStates.concat(additionalParticleStates),
			};
		});
	}

	/**
	 * Update the particle states while keeping the id unchanged
	 */
	updateParticleStates() {
		this.setState(
			(prev) => {
				return {
					particleStates: prev.particleStates.map(particleState => {
						return {
							id: particleState.id,
							position: this.props.config.updatePosition(
								particleState.position,
								PARTICLE_UPDATE_INTERVAL / 1000,
							),
							time: particleState.time + PARTICLE_UPDATE_INTERVAL / 1000,
						};
					}),
				};
			},
		);
	}

	/**
	 * Given a list of particle states, regenerate the particles
	 * and save particles and missing indices.
	 */
	updateParticles(): void {
		const particles: JSX.Element[] = [];
		const missingIndices: number[] = [];
		this.state.particleStates.forEach((particleState, index) => {
			const particle = this.generateParticle(particleState);
			if (particle === null) missingIndices.push(index);
			else particles.push(particle);
		});

		this.setState({
			particles: particles,
			missingIndices: missingIndices,
		});
	}

	/**
	 * Given a particle state, generate particle component, add style and return it.
	 * @param position
	 * @param time
	 * @returns
	 */
	generateParticle(particleState: ParticleState): JSX.Element | null {
		const particle = this.props.config.generateParticleComponent(particleState.time);
		if (particle === null) return null;

		return (
			<div
				style={{
					position: 'absolute',
					left: particleState.position.x,
					top: particleState.position.y,
				}}
				key={particleState.id}
			>
				{particle}
			</div>
		);
	}

	render() {
		const containerStyle: CSSProperties = {
			...this.props.style,
		};

		return (
			<div style={containerStyle}>
				{this.state.particles}
			</div>
		);
	}
}
