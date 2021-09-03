import React, { CSSProperties } from 'react';
import Position from '../../utils/Position';
import { arrayWithRemovedIndices } from '../../utils/index';

export interface ParticlesConfig {
	numberOfParticles: number;
	particleDurationEstimate: number;
	existenceFunction: (time: number) => number;
	generateParticleComponent: (time: number) => React.ReactElement;
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

const PARTICLE_UPDATE_INTERVAL = 30; // in millis

export default class Particles extends React.Component<Props, State> {
	particleInterval?: NodeJS.Timer;

	constructor(props: Props) {
		super(props);
		this.state = {
			particleStates: [],
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
		this.updateMissingIndices();
		this.cleanParticleStates();
		this.addParticlesStates();
		this.updateParticleStates();
		this.updateParticles();
	}

	/**
	 * Update missing indices based on the existence function
	 */
	updateMissingIndices() {
		const missingIndices: number[] = [];
		this.state.particleStates.forEach((state, index) => {
			const currentProb = this.props.config.existenceFunction(state.time);
			const nextProb = this.props.config.existenceFunction(state.time + PARTICLE_UPDATE_INTERVAL);
			const deathProb = 1 - nextProb / currentProb;
			if (Math.random() < deathProb) {
				missingIndices.push(index);
			}
		});
		this.setState({
			missingIndices: missingIndices,
		});
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
			* (PARTICLE_UPDATE_INTERVAL / this.props.config.particleDurationEstimate);

		const additionalParticleStates: ParticleState[] = [];
		for (let i = 0; i < Math.min(missingCount, estimate); i++) {
			additionalParticleStates.push({
				id: Math.random(),
				position: this.props.config.initialPosition(),
				time: 0,
			});
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
								PARTICLE_UPDATE_INTERVAL,
							),
							time: particleState.time + PARTICLE_UPDATE_INTERVAL,
						};
					}),
				};
			},
		);
	}

	findIndexOfParticleState(id: number) {
		for (let i = 0; i < this.state.particleStates.length; i++) {
			if (this.state.particleStates[i].id === id) return i;
		}
		throw new Error(`Could not find particle state with id ${id}`);
	}

	/**
	 * Given a list of particle states, regenerate the particles
	 * and save particles and missing indices.
	 */
	updateParticles(): void {
		const particles: JSX.Element[] = this.state.particleStates.map(
			(particleState) => this.generateParticle(particleState),
		);

		this.setState({
			particles: particles,
		});
	}

	/**
	 * Given a particle state, generate particle component, add style and return it.
	 * @param position
	 * @param time
	 * @returns
	 */
	generateParticle(particleState: ParticleState): JSX.Element {
		const particle = this.props.config.generateParticleComponent(particleState.time);

		return (
			<div
				style={{
					position: 'absolute',
					left: particleState.position.x,
					top: particleState.position.y,
					transform: 'translate(-50%, -50%)',
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
