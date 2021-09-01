enum KeyState {
	up,
	down,
}

export default class KeyboardStates {
	keyStates: { [key: string]: KeyState } = {};

	addKey(
		key: string, downCallback?: (event: KeyboardEvent) => void,
		upCallback?: (event: KeyboardEvent) => void,
		holdCallback?: (event: KeyboardEvent) => void,
	) {
		if (key in Object.keys(this.keyStates)) return;
		this.keyStates[key] = KeyState.up;

		document.addEventListener('keydown', (event: KeyboardEvent) => {
			if (event.key === key) {
				if (this.keyStates[key] !== KeyState.down) {
					this.keyStates[key] = KeyState.down;
					if (downCallback) downCallback(event);
				} else {
					if (holdCallback) holdCallback(event);
				}
			}
		});
		document.addEventListener('keyup', (event: KeyboardEvent) => {
			if (event.key === key) {
				if (this.keyStates[key] !== KeyState.up) {
					this.keyStates[key] = KeyState.up;
					if (upCallback) upCallback(event);
				}
			}
		});
	}
}
