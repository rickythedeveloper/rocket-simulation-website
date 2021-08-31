import React, { CSSProperties } from 'react';
import Position, { angleOfPosition, getDistanceBetween } from '../utils/Position';
import { randomNumberBetween } from '../utils';

interface Size {
	height: number;
	width: number;
}

interface Props {
	parentSize: Size;
}

interface State {
	canvasScale: number;
	canvasRotation: number;
	canvasLeft: number;
	canvasTop: number;
	rocketPosition: Position;
}

const CANVAS_SIZE: Size = { height: 4000, width: 2000 };
const CANVAS_CENTER_POINT: Position = { x: CANVAS_SIZE.width / 2, y: CANVAS_SIZE.height / 2 };
const CANVAS_DEFAULT_STATE: State = {
	canvasScale: 100 / CANVAS_SIZE.height,
	canvasRotation: 0,
	canvasLeft: -CANVAS_CENTER_POINT.x,
	canvasTop: -CANVAS_CENTER_POINT.y,
	rocketPosition: { x:0, y:0 },
};

export default class SimulatorCanvas extends React.Component<Props, State> {

	componentDidMount() {
		setInterval(() => {
			this.setRocketPosition({
				x: randomNumberBetween(-CANVAS_SIZE.width / 2, CANVAS_SIZE.width / 2),
				y: randomNumberBetween(-CANVAS_SIZE.height / 2, CANVAS_SIZE.height / 2),
			});
		}, 2000);
	}

	constructor(props: Props) {
		super(props);
		this.state = CANVAS_DEFAULT_STATE;
	}

	setRocketPosition(position: Position) {
		const distanceToCenter = getDistanceBetween(position, { x: 0, y: 0 });
		const canvasRotation = angleOfPosition(position) * 180 / Math.PI - 90;
		const canvasScale = 100 / CANVAS_SIZE.height; // TODO set scale based on speed
		const top = - CANVAS_CENTER_POINT.y + canvasScale * distanceToCenter + this.props.parentSize.height / 2;
		const left = - CANVAS_CENTER_POINT.x + this.props.parentSize.width / 2;

		this.setState({
			rocketPosition: position,
			canvasLeft: left,
			canvasTop: top,
			canvasRotation: canvasRotation,
			canvasScale: canvasScale,
		});
	}

	render() {
		const canvasTransform = `
		scale(${this.state.canvasScale}, ${this.state.canvasScale}) 
		rotateZ(${this.state.canvasRotation}deg)`;

		const canvasStyle: CSSProperties = {
			position: 'absolute',
			transform: canvasTransform,
			height: `${CANVAS_SIZE.height}px`,
			width: `${CANVAS_SIZE.width}px`,
			top: `${this.state.canvasTop}px`,
			left: `${this.state.canvasLeft}px`,
			backgroundColor:'red',
		};

		const blobSize = CANVAS_SIZE.height / 10;

		const rocketStyle: CSSProperties = {
			position: 'absolute',
			height: `${blobSize}px`,
			width: `${blobSize}px`,
			left: `${CANVAS_CENTER_POINT.x + this.state.rocketPosition.x - blobSize / 2}px`,
			bottom: `${CANVAS_CENTER_POINT.y + this.state.rocketPosition.y - blobSize / 2}px`,
			backgroundColor: 'black',
		};

		const centerStyle: CSSProperties = {
			position: 'absolute',
			height: `${blobSize}px`,
			width: `${blobSize}px`,
			left: `${CANVAS_SIZE.width / 2 - blobSize / 2}px`,
			top: `${CANVAS_SIZE.height / 2 - blobSize / 2}px`,
			backgroundColor: 'blue',
		};

		const topLeftIndicatorStyle: CSSProperties = {
			position: 'absolute',
			height: `${blobSize}px`,
			width: `${blobSize}px`,
			top: 0,
			left: 0,
			backgroundColor: 'brown',
		};

		return (
			<div className={'simulatorCanvas'} style={canvasStyle}>
				{/* Rocket */}
				<div style={rocketStyle}/>
				{/* Center-ish point */}
				<div style={centerStyle}/>
				{/* Top left corner indicator */}
				<div style={topLeftIndicatorStyle}/>
			</div>
		);
	}
}
