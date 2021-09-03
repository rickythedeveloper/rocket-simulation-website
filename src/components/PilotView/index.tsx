import React, { CSSProperties } from 'react';
import { EARTH_RADIUS } from '../../models/bodies/constants';
import RocketModel from '../../models/bodies/Rocket';
import RocketElement from './Rocket';

interface Props {
	rocket: RocketModel;
	style?: CSSProperties;
}
interface State {
	height: number;
	rocketImageAngle: number; // angle by which we rotate the rocket in degrees. positive = clockwise.
}

const DEFAULT_STATE: State = {
	height: 0,
	rocketImageAngle: 0,
};

const ROCKET_SIZE = 100;
const MAX_HEIGHT_COLOR = 20000;

function getLightStrength(height: number): number {
	if (height < 0) return 1;
	if (height > MAX_HEIGHT_COLOR) return 0;
	return 1 - height / MAX_HEIGHT_COLOR;
}

export default class PilotView extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = DEFAULT_STATE;
	}

	static getDerivedStateFromProps(props: Props) {
		const height = props.rocket.state.position.magnitude - EARTH_RADIUS;
		const rocketImageAngle =
			(- props.rocket.state.angularPosition + props.rocket.state.position.angle)
			* 180 / Math.PI;
		return {
			height: height,
			rocketImageAngle: rocketImageAngle,
		};
	}

	render() {
		const lightStrength = getLightStrength(this.state.height);
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
			transform: `translate(0, ${ROCKET_SIZE / 2 + this.state.height}px)`,
			borderTop: '5px solid black',
		};
		const rocketStyle: CSSProperties = {
			position: 'absolute',
			width: `${ROCKET_SIZE}px`,
			height: `${ROCKET_SIZE}px`,
			top: '50%',
			left: '50%',
			transform: `
				translate(-50%, -50%) 
				rotateZ(${this.state.rocketImageAngle}deg)
			`,
		};
		return (
			<div className={'pilot-view'} style={containerStyle}>
				<div className={'land'} style={landStyle}/>
				<RocketElement rocket={this.props.rocket} style={rocketStyle} />
			</div>
		);
	}
}
