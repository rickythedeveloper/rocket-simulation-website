import './css/styles.css';
import React from 'react';
import SimulatorCanvas from './components/SimulationCanvas';
import KeyboardStates from './utils/KeyboardStates';

function App() {
	const keyboardListener = new KeyboardStates();
	keyboardListener.addKey('ArrowUp', () => {}, () => {});

	return (
		<div className="App">
			<div id='content'>
				<div className='simulatorScreen' style={{
					height: '200px',
					width: '200px',
				}}>
					<SimulatorCanvas parentSize={{ height: 200, width: 200 }}/>
				</div>
			</div>
		</div>
	);
}

export default App;
