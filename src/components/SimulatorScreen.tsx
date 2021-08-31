import React, { CSSProperties } from 'react';
import { EARTH_RADIUS } from '../models/bodies';
import Vector2D from '../models/Vector2D';
import PilotView from './PilotView';

interface Props {
	style?: CSSProperties;
}
interface State {
	rocketPosition: Vector2D;
}

const DEFAULT_STATE: State = {
	rocketPosition: new Vector2D(0, EARTH_RADIUS),
};

export default class SimulatorScreen extends React.Component<Props, State> {

	componentDidMount() {
		// setInterval(() => {
		// 	this.setState((prev) => {
		// 		return {
		// 			rocketPosition: new Vector2D(prev.rocketPosition.x, prev.rocketPosition.y + 10),
		// 		};
		// 	});
		// }, 10);
	}

	constructor(props: Props) {
		super(props);
		this.state = DEFAULT_STATE;
	}

	render() {
		return (
			<div>
				<PilotView rocketPosition={this.state.rocketPosition}/>
			</div>
		);
	}
}
