import React, { CSSProperties } from 'react';

interface Props {
	speed: number;
	height: number;
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
		const infoString = `Speed: ${this.props.speed}\nheight: ${this.props.height}`;
		return (
			<div style={containerStyle}>{infoString}</div>
		);
	}
}
