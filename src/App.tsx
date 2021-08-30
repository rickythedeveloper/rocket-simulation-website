import './css/styles.css';
import React from 'react';
import SimulatorCanvas from './components/SimulationCanvas';

function App() {
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
