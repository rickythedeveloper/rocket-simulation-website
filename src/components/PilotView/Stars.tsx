import React, { CSSProperties } from 'react';
import { randomNumberBetween } from '../../utils';

interface Props {
	density: number;
	minSize: number;
	maxSize: number;
	style?: CSSProperties;
}

interface State {
	stars: JSX.Element[] | null;
}

export default class Stars extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);

		this.state = {
			stars: null,
		};
	}

	render() {
		const containerStyle: CSSProperties = {
			...this.props.style,
		};
		return (
			<div style={containerStyle} ref={(el) => {
				if (el && this.state.stars === null) {
					const width = el.clientWidth, height = el.clientHeight;
					const stars: JSX.Element[] = [];
					const numStars = this.props.density * width * height / 10000;
					for (let i = 0; i < numStars; i++) {
						const size = randomNumberBetween(this.props.minSize, this.props.maxSize);
						stars.push(
							<div
								key={i}
								style={{
									position: 'absolute',
									top: Math.random() * height,
									left: Math.random() * width,
									width: size,
									height: size,
									borderRadius: size / 2,
									backgroundColor: `rgba(255, 255, 255, ${randomNumberBetween(0.3, 0.7)})`,
								}}
							/>,
						);
					}
					this.setState({
						stars: stars,
					});
				}
			}}>
				{this.state.stars}
			</div>
		);
	}
}
