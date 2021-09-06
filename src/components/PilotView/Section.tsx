import React, { CSSProperties } from 'react';

interface Props {
	title: string;
	radius: number;
	contentScale: number;
	style?: CSSProperties;
}

export default class Section extends React.Component<Props> {

	render() {
		const containerStyle: CSSProperties = {
			width: this.props.radius * 2,
			height: this.props.radius * 2,
			borderRadius: this.props.radius,
			border: '5px solid #f00',
			backgroundColor: '#f003',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			...this.props.style,
		};
		const titleStyle: CSSProperties = {
			color: 'white',
			transform: `scale(${this.props.contentScale}, ${this.props.contentScale})`,
		};
		return (
			<div style={containerStyle}>
				<div style={titleStyle}>{this.props.title}</div>
			</div>
		);
	}
}
