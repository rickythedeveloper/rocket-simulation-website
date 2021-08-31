import React, { CSSProperties } from 'react';
import rocketImage from '../../assets/rocket.png';

interface Props {
	style?: CSSProperties;
}
interface State {}

export default class Rocket extends React.Component<Props, State> {
	render() {
		const rocketSize = 250;
		const rocketStyle: CSSProperties = {
			width: `${rocketSize}px`,
			height: `${rocketSize}px`,
			backgroundColor: '#f003',
			alignItems: 'center',
			justifyContent: 'center',
			display: 'flex',
			...this.props.style,
		};
		return (
			<div className={'rocket'} style={rocketStyle}>
				<img src={rocketImage}/>
			</div>
		);
	}
}
