import React, { CSSProperties } from 'react';

interface Props {
	time: number;
	lifetime: number;
	style?: CSSProperties;
}
interface State {
	lifecycle: number; // between 0 and 1
}
const DEFAULT_STATE: State = {
	lifecycle: 0,
};

function getSize(lifecycle: number): number {
	const maxSize = 10;
	return maxSize * (1 - lifecycle);
}

function getColor(lifecycle: number): string {
	const initialGB = 0;
	const gb = initialGB + (255 - initialGB) * lifecycle;
	return `rgba(255, ${gb}, ${gb})`;
}

export default class ThrustParticle extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = DEFAULT_STATE;
	}

	static getDerivedStateFromProps(newProps: Props): Partial<State> {
		return { lifecycle: newProps.time / newProps.lifetime };
	}

	render() {
		const size = getSize(this.state.lifecycle);
		const backgroundColor = getColor(this.state.lifecycle);
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
