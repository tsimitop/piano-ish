// Check for AudioContext availability and use the correct constructor
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create an oscillator to generate a tone
const oscillator = audioContext.createOscillator();

// Set the frequency (in Hertz)
oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4

// Choose waveform type
oscillator.type = 'sine'; // Options: sine, square, sawtooth, triangle

// Connect the oscillator to the audio output (speakers)
oscillator.connect(audioContext.destination);

// Start and stop the sound
oscillator.start();
oscillator.stop(audioContext.currentTime + 2); // Play for 2 seconds

