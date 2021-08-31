import './css/styles.css';
import React from 'react';
import KeyboardStates from './utils/KeyboardStates';
import SimulatorScreen from './components/SimulatorScreen';

function App() {
	const keyboardListener = new KeyboardStates();
	keyboardListener.addKey('ArrowUp', () => {}, () => {});

	return (
		<div className="App">
			<div id='content'>
				<SimulatorScreen/>
			</div>
		</div>
	);
}

export default App;
