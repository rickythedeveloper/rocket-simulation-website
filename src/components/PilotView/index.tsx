import React, { CSSProperties } from 'react';
import Rocket from './Rocket';
import Background from './Background';
import { EARTH_RADIUS } from '../../models/bodies';
import Vector2D from '../../models/Vector2D';

interface Props {
	rocketPosition: Vector2D;
	style?: CSSProperties;
}
interface State {
	height: number;
}

const DEFAULT_STATE: State = {
	height: 0,
};

const ROCKET_SIZE = 250;
const ROCKET_BOTTOM_FROM_VIEW_TOP = 500;

export default class PilotView extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = DEFAULT_STATE;
	}

	static getDerivedStateFromProps(props: Props) {
		const height = props.rocketPosition.magnitude - EARTH_RADIUS;
		return {
			height: height,
		};
	}

	render() {
		return (
			<div className={'pilot-view'}>
				<Background
					style={{
						position: 'absolute',
						height: '100%',
						width: '100%',
					}}
					cameraHeight={this.state.height}
					rocketBottomY={ROCKET_BOTTOM_FROM_VIEW_TOP}
				/>
				<Rocket style={{
					position: 'absolute',
					width: `${ROCKET_SIZE}px`,
					height: `${ROCKET_SIZE}px`,
					top: `${ROCKET_BOTTOM_FROM_VIEW_TOP - ROCKET_SIZE}px`,
				}}/>
			</div>
		);
	}
}
