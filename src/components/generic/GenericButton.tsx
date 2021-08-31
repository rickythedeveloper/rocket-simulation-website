import React, { CSSProperties } from 'react';

interface Props {
	onPress: () => void;
	style?: CSSProperties;
}
interface State {}
const DEFAULT_STATE = {};

export default class GenericButton extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = DEFAULT_STATE;
	}

	render() {
		const containerStyle: CSSProperties = {
			borderRadius: 10,
			padding: 10,
			backgroundColor: 'red',
			margin: 'auto',
			position: 'absolute',
			top: 0,
			left: 0,
			...this.props.style,
		};
		return (
			<div style={containerStyle} onClick={this.props.onPress}>{this.props.children}</div>
		);
	}
}
