import React from 'react';

interface Props {

}

interface Position {
	x: number;
	y: number;
}

interface Size {
	height: number;
	width: number;
}

interface State {
	canvasScale: number;
	canvasRotation: number;
	canvasSize: Size;
	labelPosition: Position;
}

export default class SimulatorCanvas extends React.Component<Props, State> {
	readonly defaultState = { 
		canvasScale: 1, 
		canvasRotation: 0, 
		canvasSize: { height: 500, width: 500 },
		labelPosition: { x: 0, y: 0 }, 
	};

	constructor(props: Props) {
		super(props);

		this.state = this.defaultState;
		setInterval(() => {
			this.setState({
				labelPosition: { x: this.state.labelPosition.x + 1, y:this.state.labelPosition.y + 1 },
				canvasRotation: this.state.canvasRotation + 1,
				canvasScale: this.state.canvasScale * 0.99,
				canvasSize: { 
					height: this.state.canvasSize.height * 1.01, 
					width: this.state.canvasSize.width * 1.01, 
				},
			});
		}, 50);

		setInterval(() => {
			this.setState(this.defaultState);
		}, 5000);
	}

	moveLabel(x: number, y: number) {
		this.setState({ labelPosition: { x: x, y: y } });
	}

	render() {
		const canvasTransform = `
		scale(${this.state.canvasScale}, ${this.state.canvasScale}) 
		rotateZ(${this.state.canvasRotation}deg)`;
		
		return (
			<div className={'simulatorCanvas'} style={{
				transform: canvasTransform,
				height: `${this.state.canvasSize.height}px`,
				width: `${this.state.canvasSize.width}px`,
				backgroundColor:'red',
			}}>
				<h3 style={{ 
					position: 'absolute', 
					top: this.state.labelPosition.y, 
					left: this.state.labelPosition.x, 
				}}>HELLO</h3>
			</div>
		);
	}
}
