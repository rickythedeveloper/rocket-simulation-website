import React, { CSSProperties } from 'react';
import { EARTH_RADIUS, ROCKET_HEIGHT, ROCKET_WIDTH } from '../../models/bodies/constants';
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
}

const DEFAULT_STATE: State = {
	rocketCenterHeight: 0,
	rocketImageAngle: 0,
	currentSection: null,
	viewWidth: 0,
	viewHeight: 0,
};

const MAX_HEIGHT_COLOR = 20000;

function getLightStrength(height: number): number {
	if (height < 0) return 1;
	if (height > MAX_HEIGHT_COLOR) return 0;
	return 1 - height / MAX_HEIGHT_COLOR;
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
		const lightStrength = getLightStrength(this.state.rocketCenterHeight);
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
			top: '50%',
			width: '100%',
			height: '100%',
			transform: `translate(0, ${this.state.rocketCenterHeight}px)`,
			borderTop: '5px solid black',
		};
		const rocketStyle: CSSProperties = {
			position: 'absolute',
			height: ROCKET_HEIGHT,
			width: ROCKET_WIDTH,
			top: '50%',
			left: '50%',
			transform: `
				translate(-50%, -50%)
				rotateZ(${this.state.rocketImageAngle}deg)
			`,
		};
		const sections = this.props.sections.map(sec => {
			const relativePositionToSection = relativePosition(this.props.rocket.state.position, sec.position);
			return (
				<SectionElement key={sec.title} title={sec.title} radius={sec.radius} style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: `translate(
					calc(-50% + ${relativePositionToSection.x}px), 
					calc(-50% - ${relativePositionToSection.y}px)
				)`,
				}}/>
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
			<div className={'pilot-view'} style={containerStyle} ref={el => {
				if (el) {
					if (el.clientHeight !== this.state.viewHeight || el.clientWidth !== this.state.viewWidth) {
						this.setState({ viewHeight: el.clientHeight, viewWidth: el.clientWidth });
					}
				}
			}}>
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
