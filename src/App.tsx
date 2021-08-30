import './css/styles.css';
import React from 'react';
import SomeComponent from './components/SomeComponent';
import KeyboardStates from './utils/KeyboardStates';

function App() {
	const keyboardListener = new KeyboardStates();
	keyboardListener.addKey('ArrowUp', () => {}, () => {});

	return (
		<div className="App">
			<header className="App-header">
				<div>hello?</div>
				<SomeComponent/>
			</header>
		</div>
	);
}

export default App;
