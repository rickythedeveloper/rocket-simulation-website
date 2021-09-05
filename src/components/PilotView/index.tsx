import React, { CSSProperties } from 'react';
import { EARTH_RADIUS, ROCKET_HEIGHT, ROCKET_WIDTH } from '../../models/bodies/constants';
import RocketModel from '../../models/bodies/Rocket';
import RocketElement from './Rocket';
import Stars from './Stars';
import Vector2D from '../../models/Vector2D';
import FlightInfoDisplay from './FlightInfoDisplay';

interface Props {
	rocket: RocketModel;
	style?: CSSProperties;
}
interface State {
	rocketCenterHeight: number;
	rocketImageAngle: number; // angle by which we rotate the rocket in degrees. positive = clockwise.
}

const DEFAULT_STATE: State = {
	rocketCenterHeight: 0,
	rocketImageAngle: 0,
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
		return (
			<div className={'pilot-view'} style={containerStyle}>
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
			</div>
		);
	}
}
