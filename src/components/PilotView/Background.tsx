import React, { CSSProperties } from 'react';

interface Props {
	cameraHeight: number;
	rocketBottomY: number;
	style?: CSSProperties;
}
interface State {
	lightStrength: number;
}

const DEFAULT_STATE: State = {
	lightStrength: 1,
};

const MAX_HEIGHT_COLOR = 20000;
export default class Background extends React.Component<Props, State> {

	static getDerivedStateFromProps(props: Props) {
		let lightStrength: number;
		if (props.cameraHeight < 0) lightStrength = 1;
		else if (props.cameraHeight > MAX_HEIGHT_COLOR) lightStrength = 0;
		else lightStrength = 1 - props.cameraHeight / MAX_HEIGHT_COLOR;
		return {
			lightStrength: lightStrength,
		};
	}

	constructor(props: Props) {
		super(props);
		this.state = DEFAULT_STATE;
	}

	render() {
		const containerStyle: CSSProperties = {
			backgroundColor: `rgba(
				${this.state.lightStrength * 130}, 
				${this.state.lightStrength * 200}, 
				${this.state.lightStrength * 255}, 
				1.0)
			`,
			...this.props.style,
		};

		const landTop = this.props.rocketBottomY + this.props.cameraHeight;
		const landStyle: CSSProperties = {
			position: 'absolute',
			backgroundColor: '#3f3',
			top: `${landTop}px`,
			width: '100%',
			height: '100%',
			borderTop: '5px solid black',
		};

		return (
			<div style={containerStyle}>
				<div style={landStyle}></div>
			</div>
		);
	}
}
