import React, { CSSProperties } from 'react';
import rocketImage from '../../assets/rocket.png';

interface Props {
	style?: CSSProperties;
}
interface State {}

export default class Rocket extends React.Component<Props, State> {
	render() {
		const rocketStyle: CSSProperties = {
			backgroundColor: '#f003',
			alignItems: 'center',
			justifyContent: 'center',
			display: 'flex',
			objectFit: 'contain',
			...this.props.style,
		};
		return (
			<div className={'rocket'} style={rocketStyle}>
				<img src={rocketImage} style={{
					maxWidth: '100%',
					maxHeight: '100%',
				}}/>
				{this.props.children}
			</div>
		);
	}
}
