import React, { CSSProperties } from 'react';

interface Props {
	isShown: boolean;
	didTouchOutside?: () => void;
	didHideModal?: () => void;
	style?: CSSProperties;
}

export default class Modal extends React.Component<Props> {
	render() {
		const containerStyle: CSSProperties = {
			display: this.props.isShown ? 'flex' : 'none',
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			backgroundColor: '#f001',
			justifyContent: 'center',
			alignItems: 'center',
			...this.props.style,
		};
		const contentContainerStyle: CSSProperties = {
			borderRadius: 10,
			backgroundColor: '#fffc',
			padding: 10,
		};
		return (
			<div style={containerStyle} onClick={this.props.didTouchOutside}>
				<div style={contentContainerStyle} onClick={(e) => e.stopPropagation()}>
					{this.props.children}
				</div>
			</div>
		);
	}
}
