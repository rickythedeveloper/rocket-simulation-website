import React, { CSSProperties } from 'react';

interface Props {
	cameraHeight: number;
	style?: CSSProperties;
}
interface State {}

const MAX_HEIGHT_COLOR = 20000;
export default class Background extends React.Component<Props, State> {
	render() {
		let lightStrength: number;
		if (this.props.cameraHeight < 0) lightStrength = 1;
		else if (this.props.cameraHeight > MAX_HEIGHT_COLOR) lightStrength = 0;
		else lightStrength = 1 - this.props.cameraHeight / MAX_HEIGHT_COLOR;

		const containerStyle: CSSProperties = {
			backgroundColor: `rgba(${lightStrength * 130}, ${lightStrength * 200}, ${lightStrength * 255}, 1.0)`,
			...this.props.style,
		};

		return (
			<div style={containerStyle}>
				hello
			</div>
		);
	}
}
