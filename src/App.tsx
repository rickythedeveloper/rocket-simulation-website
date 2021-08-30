import './css/styles.css';
import React from 'react';
import SimulatorCanvas from './components/SimulationCanvas';
import KeyboardStates from './utils/KeyboardStates';

function App() {
	const keyboardListener = new KeyboardStates();
	keyboardListener.addKey('ArrowUp', () => {}, () => {});

	return (
		<div className="App">
			<header className="App-header">
				<div>before canvas</div>
				<SimulatorCanvas/>
				<div>after canvas</div>
			</header>
		</div>
	);
}

export default App;
