import React, { CSSProperties } from 'react';
import Vector2D from '../../models/Vector2D';

interface Props {
	speed: number;
	height: number;
	rocketPosition: Vector2D;
	style?: CSSProperties;
}
interface State {}
const DEFAULT_STATE = {};

export default class FlightInfoDisplay extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = DEFAULT_STATE;
	}

	render() {
		const containerStyle: CSSProperties = {
			backgroundColor: '#7774',
			borderRadius: 10,
			padding: 10,
			...this.props.style,
		};
		return (
			<div style={containerStyle}>
				<div>{`Speed: ${this.props.speed}`}</div>
				<div>{`Height: ${this.props.height}`}</div>
				<div>{`x: ${Math.round(this.props.rocketPosition.x)}`}</div>
				<div>{`y: ${Math.round(this.props.rocketPosition.y)}`}</div>
			</div>
		);
	}
}
