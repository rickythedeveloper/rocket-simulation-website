import React, { CSSProperties } from 'react';

interface Props {
	arrowInnerRadius: number;
	arrowOuterRadius: number;
	angularPosition: number;
	style?: CSSProperties;
}

const ARROW_MAX_WIDTH = 20;
export default class VelocityIndicator extends React.Component<Props> {
	render() {
		const containerStyle: CSSProperties = {
			width: `${this.props.arrowOuterRadius * 2}px`,
			height: `${ARROW_MAX_WIDTH}px`,
			transform: `rotateZ(${-this.props.angularPosition * 180 / Math.PI}deg)`,
			...this.props.style,
		};
		const arrowLength = this.props.arrowOuterRadius - this.props.arrowInnerRadius;
		const arrowStyle: CSSProperties = {
			width: `${arrowLength}px`,
			height: `${ARROW_MAX_WIDTH}px`,
			left: `${this.props.arrowOuterRadius + this.props.arrowInnerRadius}px`,
			position: 'absolute',
		};
		const arrowColor = '#fff'; // TODO #33 dynamically change color

		return (
			<div style={containerStyle}>
				{/* eslint-disable max-len */}
				<svg style={arrowStyle} viewBox="0 0 756 273" version="1.1" xmlns="http://www.w3.org/2000/svg">
					<title>arrow</title>
					<g id="arrow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
						<path d="M36.5,135.5 L719.5,135.5 M718.847561,135.5 L532.152439,243.5 M718.847561,135.5 L532.152439,28.5" id="Combined-Shape" stroke={arrowColor} strokeWidth="50"></path>
					</g>
				</svg>
				{/* eslint-enable max-len */}
			</div>
		);
	}
}
