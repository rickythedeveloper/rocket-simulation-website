import React, { CSSProperties } from 'react';

interface Props {
	lifecycle: number; // between 0 and 1
	style?: CSSProperties;
}

const MAX_SIZE = 13;

function getSize(lifecycle: number): number {
	return MAX_SIZE * (1 - lifecycle);
}

function getColor(lifecycle: number): string {
	const initialGB = 0;
	const gb = initialGB + (255 - initialGB) * lifecycle;
	return `rgba(255, ${gb}, ${gb})`;
}

export default class ThrustParticle extends React.Component<Props> {

	render() {
		const size = getSize(this.props.lifecycle);
		const backgroundColor = getColor(this.props.lifecycle);
		const containerStyle: CSSProperties = {
			width: size,
			height: size,
			borderRadius: size / 2,
			backgroundColor,
			...this.props.style,
		};
		return (
			<div style={containerStyle}/>
		);
	}
}
