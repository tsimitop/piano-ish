class AudioHandler {

	audioContext: AudioContext;
	oscillators: { [key: string]: { oscillator: OscillatorNode; gainNode: GainNode}};

	constructor(audioContext: AudioContext) {
		this.audioContext = audioContext;
		this.oscillators = {};
	}

	startTone(key: string, frequency: number) {
		if (!this.oscillators[key]) {
			const oscillator = this.audioContext.createOscillator();
			const gainNode = this.audioContext.createGain();
			gainNode.gain.setValueAtTime(0, audioContext.currentTime);
			oscillator.connect(gainNode);
			gainNode.connect(this.audioContext.destination);
			oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
			oscillator.type = 'triangle';
			gainNode.gain.linearRampToValueAtTime(1, this.audioContext.currentTime + 0.12);
			oscillator.start();
			this.oscillators[key] = { oscillator, gainNode};
		}
	}

	stopTone(key: string) {
		if (this.oscillators[key]) {
			const { oscillator, gainNode } = this.oscillators[key];
			gainNode.gain.cancelScheduledValues(this.audioContext.currentTime);
			gainNode.gain.setValueAtTime(gainNode.gain.value, this.audioContext.currentTime);
			gainNode.gain.linearRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
			oscillator.stop(this.audioContext.currentTime + 0.2);
			delete this.oscillators[key];
		}
	}
}

const audioContext = new (window.AudioContext);
const audioHandler = new AudioHandler(audioContext);


document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (keyFrequencies[key]) {
        audioHandler.startTone(key, keyFrequencies[key]);
    }
});

document.addEventListener('keyup', (event) => {
	const key = event.key.toLowerCase();
	if (keyFrequencies[key]) {
		audioHandler.stopTone(key);
	}
})

const keyFrequencies: { [key: string]: number} = {
z: 261.6255,	// C4 lower C
s: 277.1826,	// C#4/Db4
x: 293.6647,	// D4
d: 311.1269,	// D#4/Eb4
c: 329.6275,	// E4
v: 349.2282,	// F5
g: 369.9944,	// F#4/Gb4
b: 391.9954,	// G4
h: 415.3046,	// G#4/Ab4
n: 440.0000,	// A4
j: 466.1637,	// A4#/Bb4
m: 493.8833,	// B4
',': 523.2511,	// C4 middle C
// ----------------------------------
t: 523.2511,	// C5 middle C
6: 554.3652,	// C#5/Db5
y: 587.3295,	// D5
7: 622.2539,	// D#5/Eb5
u: 659.2551,	// E5
i: 698.4564,	// F5
9: 739.9888,	// F#5/Gb5
o: 783.9908,	// G5
0: 830.6093,	// G#5/Ab5
p: 880.0000,	// A5
'-': 932.3275,	// A5#/Bb5
'[': 987.7666,	// B5
']': 1046.5023	// C6 high
};
