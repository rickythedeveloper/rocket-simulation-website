import React, { CSSProperties } from 'react';
import themeColors from '../../constants/colors';

interface Props {
	onClick?: () => void;
	onTouchStart?: () => void;
	onTouchEnd?: () => void;
	style?: CSSProperties;
}
interface State {
	isTouched: boolean;
}
const BACKGROUND_COLOR_DEFAULT = themeColors.blue.light;
const BACKGROUND_COLOR_SELECTED = themeColors.blue.medium;
const DEFAULT_STATE: State = {
	isTouched: false,
};

export default class GenericButton extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = DEFAULT_STATE;
	}

	render() {
		const containerStyle: CSSProperties = {
			borderRadius: 10,
			padding: 10,
			backgroundColor: this.state.isTouched ? BACKGROUND_COLOR_SELECTED : BACKGROUND_COLOR_DEFAULT,
			margin: 'auto',
			color: 'white',
			...this.props.style,
		};
		return (
			<div
				style={containerStyle}
				onClick={this.props.onClick}
				onTouchStart={() => {
					if (this.props.onTouchStart) this.props.onTouchStart();
					this.setState({ isTouched: true });
				}}
				onTouchEnd={() => {
					if (this.props.onTouchEnd) this.props.onTouchEnd();
					this.setState({ isTouched: false });
				}}
			>
				{this.props.children}
			</div>
		);
	}
}
