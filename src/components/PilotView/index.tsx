import React, { CSSProperties } from 'react';
import Background from './Background';
import { EARTH_RADIUS } from '../../models/bodies/constants';
import RocketModel from '../../models/bodies/Rocket';
import RocketElement from './Rocket';
import FlightInfoDisplay from './FlightInfoDisplay';

interface Props {
	rocket: RocketModel;
	style?: CSSProperties;
}
interface State {
	height: number;
}

const DEFAULT_STATE: State = {
	height: 0,
};

const ROCKET_SIZE = 100;
const ROCKET_BOTTOM_FROM_VIEW_TOP = 500;

export default class PilotView extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = DEFAULT_STATE;
	}

	static getDerivedStateFromProps(props: Props) {
		const height = props.rocket.position.magnitude - EARTH_RADIUS;
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
				<RocketElement style={{
					position: 'absolute',
					width: `${ROCKET_SIZE}px`,
					height: `${ROCKET_SIZE}px`,
					top: `${ROCKET_BOTTOM_FROM_VIEW_TOP - ROCKET_SIZE}px`,
					left: `${50}%`,
					transform: 'translate(-50%, 0)',
				}}>
					<FlightInfoDisplay
						speed={Math.round(this.props.rocket.speed.magnitude)}
						height={Math.round(this.state.height)}
						style={{
							position: 'absolute',
							width: '80px',
							top: '50%',
							left: '100%',
							transform: 'translate(10px, -50%)',
						}}
					/>
				</RocketElement>

			</div>
		);
	}
}
