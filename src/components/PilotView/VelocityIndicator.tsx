import React, { CSSProperties } from 'react';
import rightArrowImage from '../../assets/rightArrow.png';

interface Props {
	arrowInnerRadius: number;
	arrowOuterRadius: number;
	angularPosition: number;
	style?: CSSProperties;
}

const INDICATOR_WIDTH = 10;
export default class VelocityIndicator extends React.Component<Props> {
	render() {
		const containerStyle: CSSProperties = {
			width: `${this.props.arrowOuterRadius * 2}px`,
			height: `${INDICATOR_WIDTH}px`,
			transform: `rotateZ(${-this.props.angularPosition * 180 / Math.PI}deg)`,
			...this.props.style,
		};
		const arrowStyle: CSSProperties = {
			width: `${this.props.arrowOuterRadius - this.props.arrowInnerRadius}px`,
			height: `${INDICATOR_WIDTH}px`,
			left: `${this.props.arrowOuterRadius + this.props.arrowInnerRadius}px`,
			position: 'absolute',
		};
		return (
			<div style={containerStyle}>
				<img src={rightArrowImage} style={arrowStyle}/>
			</div>
		);
	}
}
