class AudioHandler {
    constructor(audioContext) {
        this.audioContext = audioContext;
        this.oscillators = {};
    }

    startTone(key, frequency) {
        if (!this.oscillators[key]) {
            const oscillator = this.audioContext.createOscillator();
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            oscillator.type = 'sine';
            oscillator.connect(this.audioContext.destination);
            oscillator.start();

            this.oscillators[key] = oscillator;
        }
    }

    stopTone(key) {
        if (this.oscillators[key]) {
            this.oscillators[key].stop(this.audioContext.currentTime);
            delete this.oscillators[key];
        }
    }
}

// Initializing audio context and handler
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const audioHandler = new AudioHandler(audioContext);

const keyFrequencies = {
	// z: 130.8128,	// C4 lower C
	// s: 138.5913,	// C#4/Db4
	// x: 146.8324,	// D4
	// d: 155.5635,	// D#4/Eb4
	// c: 164.8138,	// E4
	// v: 174.6141,	// F5
	// g: 184.9972,	// F#4/Gb4
	// b: 195.9977,	// G4
	// h: 207.6523,	// G#4/Ab4
    // n: 220.00,	// A4
    // j: 233.08,	// A4#/Bb4
    // m: 246.94,	// B4
	// ',': 261.63,	// C4 middle C


// ----------------------------------
// t: 261.6255,	// C4 middle C
// 6: 277.1826,	// C#4/Db4
// y: 293.6647,	// D4
// 7: 311.1269,	// D#4/Eb4
// u: 329.6275,	// E4
// i: 349.2282,	// F5
// 9: 369.9944,	// F#4/Gb4
// o: 391.9954,	// G4
// 0: 415.3046,	// G#4/Ab4
// p: 440.0000,	// A4
// '-': 466.1637,	// A4#/Bb4
// '[': 493.8833,	// B4
// ']': 523.2511	// C5 high
// ----------------------------------
z: 261.63,	// C4 lower C
s: 277.18,	// C#4/Db4
x: 293.66,	// D4
d: 311.13,	// D#4/Eb4
c: 329.63,	// E4
v: 349.23,	// F5
g: 369.99,	// F#4/Gb4
b: 392.00,	// G4
h: 415.30,	// G#4/Ab4
n: 440.00,	// A4
j: 466.16,	// A4#/Bb4
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

    // 110,000000000000
    // 116,540940379522
    // 123,470825314031
    // 130,812782650299
    // 138,591315488436
    // 146,832383958704
    // 155,563491861040
    // 164,813778456435
    // 174,614115716502
    // 184,997211355817
    // 195,997717990875
    // 207,652348789973
    // 220,000000000000
    // 233,081880759045
    // 246,941650628062
    // 261,625565300599 C4 middle C
    // 277,182630976872
    // 293,664767917408
    // 311,126983722081
    // 329,627556912870
    // 349,228231433004
    // 369,994422711635
    // 391,995435981749
    // 415,304697579945
    // 440,000000000000
    // 466,163761518090
    // 493,883301256124
    // 523,251130601197 C5 High C
    // 554,365261953744
    // 587,329535834815
    // 622,253967444162
    // 659,255113825740
    // 698,456462866008
    // 739,988845423269
    // 783,990871963499
    // 830,609395159891
    // 880,000000000000

	// 6: 277.18,	// C#4/Db4
	// y: 293.66,	// D4
	// 7: 311.13,	// D#4/Eb4
	// u: 329.63,	// E4
	// i: 349.23,	// F5
	// 9: 369.99,	// F#4/Gb4
	// o: 392.00,	// G4
	// 0: 415.30,	// G#4/Ab4
    // p: 440.00,	// A4
    // '-': 466.16,	// A4#/Bb4
    // '[': 493.883,	// B4
	// ']': 523.25	// C5 high
};

// t = do psilo-deksi heri
// z = do hamilo-aristero heri
// , = ] = mesaio do
// Event listeners
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
});
