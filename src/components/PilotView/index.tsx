import React, { CSSProperties } from 'react';
import {
	EARTH_RADIUS,
	ROCKET_HALF_HEIGHT,
	ROCKET_HALF_WIDTH,
	ROCKET_HEIGHT,
	ROCKET_WIDTH,
} from '../../models/bodies/constants';
import RocketModel from '../../models/bodies/Rocket';
import RocketElement from './Rocket';
import Stars from './Stars';
import Vector2D from '../../models/Vector2D';
import FlightInfoDisplay from './FlightInfoDisplay';
import Position, { relativePosition, getDistanceBetween, angleOfPosition } from '../../utils/Position';
import SectionElement from './Section';
import SectionModel from '../../models/Section';
import { edgeCoordsWithAngle } from '../../utils';
import directionArrow from '../../assets/directionArrow.svg';

interface Props {
	rocket: RocketModel;
	sections: readonly SectionModel[];
	showSection: (section: SectionModel) => void;
	style?: CSSProperties;
}
interface State {
	rocketCenterHeight: number;
	rocketImageAngle: number; // angle by which we rotate the rocket in degrees. positive = clockwise.
	currentSection: SectionModel | null;
	viewWidth: number;
	viewHeight: number;
	scale: number;
}

const DEFAULT_STATE: State = {
	rocketCenterHeight: 0,
	rocketImageAngle: 0,
	currentSection: null,
	viewWidth: 0,
	viewHeight: 0,
	scale: 1,
};

const MAX_HEIGHT_COLOR = 20000;
const MAX_SCALE = 2;
const MIN_SCALE = 10 ** (-4);
const MIN_SCALE_WITHOUT_LIGHT_EFFECT = 0.01;

function getLightStrength(height: number, scale: number = 1): number {
	let strength: number;
	if (height < 0) strength = 1;
	if (height > MAX_HEIGHT_COLOR) strength = 0;
	strength = 1 - height / MAX_HEIGHT_COLOR;

	if (scale > MIN_SCALE_WITHOUT_LIGHT_EFFECT) return strength;
	return strength * (scale / MIN_SCALE_WITHOUT_LIGHT_EFFECT);
}

function heightOfPoint(point: Vector2D): number {
	return point.magnitude - EARTH_RADIUS;
}

function getRocketHeight(rocket: RocketModel): number {
	let minHeight: number = Infinity;
	rocket.testPoints.forEach(point => {
		const pointGlobalCoords = Vector2D.sum(rocket.state.position, point);
		const height = heightOfPoint(pointGlobalCoords);
		if (minHeight === undefined || height < minHeight) {
			minHeight = height;
		}
	});
	return minHeight;
}

function objectIsInsideView(relativePositionFromCenter: Position, viewHeight: number, viewWidth: number) {
	return Math.abs(relativePositionFromCenter.x) < viewWidth / 2
	&& Math.abs(relativePositionFromCenter.y) < viewHeight / 2;
}

export default class PilotView extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = DEFAULT_STATE;
	}

	static getDerivedStateFromProps(props: Props): Partial<State> {
		const rocketCenterHeight = props.rocket.state.position.magnitude - EARTH_RADIUS;
		const rocketImageAngle =
			(- props.rocket.state.angularPosition + props.rocket.state.position.angle)
			* 180 / Math.PI;
		return {
			rocketCenterHeight: rocketCenterHeight,
			rocketImageAngle: rocketImageAngle,
		};
	}

	componentDidUpdate() {
		let newCurrentSection: SectionModel | null = null;
		this.props.sections.forEach(section => {
			const distance = getDistanceBetween(section.position, this.props.rocket.state.position);
			if (distance < section.radius) newCurrentSection = section;
		});

		if (this.state.currentSection !== newCurrentSection) {
			if (newCurrentSection !== null) this.props.showSection(newCurrentSection);
			this.setState({ currentSection: newCurrentSection });
		}
	}

	render() {
		const lightStrength = getLightStrength(this.state.rocketCenterHeight, this.state.scale);
		const containerStyle: CSSProperties = {
			backgroundColor: `rgba(
				${lightStrength * 130},
				${lightStrength * 200},
				${lightStrength * 255},
				1.0)
			`,
			width: '100%',
			height: '100%',
		};
		const landStyle: CSSProperties = {
			position: 'absolute',
			backgroundColor: '#940',
			width: EARTH_RADIUS * 2,
			height: EARTH_RADIUS * 2,
			borderRadius: EARTH_RADIUS,
			top: `calc(50% + ${this.state.rocketCenterHeight}px)`,
			left: `calc(50% - ${EARTH_RADIUS}px)`,
			border: '1000px solid #940',
			transformOrigin: `${EARTH_RADIUS}px ${-this.state.rocketCenterHeight}px`,
			transform: `scale(${this.state.scale}, ${this.state.scale})`,
		};
		const rocketStyle: CSSProperties = {
			position: 'absolute',
			height: ROCKET_HEIGHT,
			width: ROCKET_WIDTH,
			top: `calc(50% - ${ROCKET_HALF_HEIGHT}px)`,
			left: `calc(50% - ${ROCKET_HALF_WIDTH}px)`,
			transformOrigin: 'center',
			transform: `
				rotateZ(${this.state.rocketImageAngle}deg)
				scale(${this.state.scale}, ${this.state.scale})
			`,
		};
		const sections = this.props.sections.map(sec => {
			const relativePositionToSection = relativePosition(this.props.rocket.state.position, sec.position);
			return (
				<SectionElement
					key={sec.title}
					title={sec.title}
					radius={sec.radius}
					contentScale={1 / this.state.scale}
					style={{
						position: 'absolute',
						top: `calc(50% - ${sec.radius}px - ${relativePositionToSection.y}px)`,
						left: `calc(50% - ${sec.radius}px + ${relativePositionToSection.x}px)`,
						transformOrigin: `
							${sec.radius - relativePositionToSection.x}px 
							${sec.radius + relativePositionToSection.y}px
						`,
						transform: `scale(${this.state.scale}, ${this.state.scale})`,
					}}
				/>
			);
		});

		const sectionIndicators: (JSX.Element | null)[] = this.props.sections.map(sec => {
			const distance = getDistanceBetween(this.props.rocket.state.position, sec.position);
			const relativePositionToSection = relativePosition(this.props.rocket.state.position, sec.position);
			if (objectIsInsideView(relativePositionToSection, this.state.viewHeight, this.state.viewWidth)) {
				return null;
			} else {
				const angle = angleOfPosition(relativePositionToSection);
				const { x, y } = edgeCoordsWithAngle(angle, this.state.viewWidth, this.state.viewHeight, 100);
				const size = Math.max(20, (50000) / distance);
				const element = <img
					src={directionArrow}
					style={{
						position: 'absolute',
						top: y - size / 2,
						left: x - size / 2,
						height: size,
						width: size,
						transform: `rotateZ(${-angle * 180 / Math.PI}deg)`,
					}}
					key={sec.title}
				/>;
				return element;
			}
		});

		return (
			<div
				className={'pilot-view'}
				style={containerStyle}
				ref={el => {
					if (el) {
						if (el.clientHeight !== this.state.viewHeight || el.clientWidth !== this.state.viewWidth) {
							this.setState({ viewHeight: el.clientHeight, viewWidth: el.clientWidth });
						}
					}
				}}
				onWheel={(e) => {
					this.setState(prev => {
						const newScale = prev.scale * (1 - e.deltaY / 1000);
						return { scale: Math.min(MAX_SCALE, Math.max(newScale, MIN_SCALE)) };
					});
				}}
			>
				<Stars density={0.5} minSize={1} maxSize={10} style={{ height: '100%', width: '100%' }}/>
				<div className={'land'} style={landStyle}/>
				<RocketElement rocket={this.props.rocket} style={rocketStyle} />
				<FlightInfoDisplay
					speed={Math.round(this.props.rocket.state.velocity.magnitude)}
					height={Math.round(getRocketHeight(this.props.rocket))}
					rocketPosition={this.props.rocket.state.position}
					style={{
						position: 'absolute',
						top: 10,
						right: 10,
					}}
				/>
				{sections}
				{sectionIndicators}
			</div>
		);
	}
}
