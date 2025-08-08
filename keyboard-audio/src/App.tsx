import { useEffect, useState } from 'react'
import './App.css'

const leftHandKeys = ['z', 's', 'x', 'd', 'c', 'v', 'g', 'b', 'h', 'n', 'j', 'm', ','];
const rightHandKeys = ['t', '6', 'y', '7', 'u', 'i', '9', 'o', '0', 'p', '-', '[', ']'];

const allKeys = [...leftHandKeys, ...rightHandKeys];

// const blackKeys = ['s', 'd', 'g', 'h', 'j', '6', '7', '9', '0', '-'];
// const whiteKeys = ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'];

const keyMapLeft = [
  { key: 'z', isBlack: false },
  { key: 's', isBlack: true },
  { key: 'x', isBlack: false },
  { key: 'd', isBlack: true },
  { key: 'c', isBlack: false },
  { key: 'v', isBlack: false },
  { key: 'g', isBlack: true },
  { key: 'b', isBlack: false },
  { key: 'h', isBlack: true },
  { key: 'n', isBlack: false },
  { key: 'j', isBlack: true },
  { key: 'm', isBlack: false },
  { key: ',', isBlack: false },
];

const keyMapRight = [
  { key: 't', isBlack: false },
  { key: '6', isBlack: true },
  { key: 'y', isBlack: false },
  { key: '7', isBlack: true },
  { key: 'u', isBlack: false },
  { key: 'i', isBlack: false },
  { key: '9', isBlack: true },
  { key: 'o', isBlack: false },
  { key: '0', isBlack: true },
  { key: 'p', isBlack: false },
  { key: '-', isBlack: true },
  { key: '[', isBlack: false },
  { key: ']', isBlack: false },
];

function App() {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
	const handleKeyDown = (e: KeyboardEvent) => {
		if (allKeys.includes(e.key)) {
			setPressedKeys((prev) => new Set(prev).add(e.key));
		}
	};

	const handleKeyUp = (e: KeyboardEvent) => {
		if (allKeys.includes(e.key)) {
			setPressedKeys((prev) => {
				const newSet = new Set(prev);
				newSet.delete(e.key);
				return newSet;
			})
		}
	};

	window.addEventListener('keydown', handleKeyDown);
	window.addEventListener('keyup', handleKeyUp);
	return () => {
		window.removeEventListener('keydown', handleKeyDown);
		window.removeEventListener('keyup', handleKeyUp);
	};
  }, [])

  return (
    <div className='piano-container'>
      <h1>Piano-ish</h1>
      <p>Press and hold the keys to play</p>

		<div className='keyboard-section'>
		  <h2>Right hand</h2>
        <div className='keyboard'>
          {keyMapRight.map((note, index) => {
            const isNextBlack =
              keyMapRight[index + 1] && keyMapRight[index + 1].isBlack ? keyMapRight[index + 1] : null;
  
            return (
              !note.isBlack && (
                <div key={note.key} className='white-key-container'>
                  <div
                    className={`piano-key-white ${
                      pressedKeys.has(note.key) ? 'pressed' : ''
                    }`}
                  >
                    {note.key}
                  </div>
  
                  {isNextBlack && (
                    <div
                      className={`piano-key-black ${
                        pressedKeys.has(isNextBlack.key) ? 'pressed' : ''
                      }`}
                      style={{ left: '40px' }}
                    >
                      {isNextBlack.key}
                    </div>
                  )}
                </div>
              )
            );
          })}
        </div>
      </div>


		<div className='keyboard-section'>
		  <h2>Left hand</h2>
        <div className='keyboard'>
          {keyMapLeft.map((note, index) => {
            const isNextBlack =
              keyMapLeft[index + 1] && keyMapLeft[index + 1].isBlack ? keyMapLeft[index + 1] : null;
  
            return (
              !note.isBlack && (
                <div key={note.key} className='white-key-container'>
                  <div
                    className={`piano-key-white ${
                      pressedKeys.has(note.key) ? 'pressed' : ''
                    }`}
                  >
                    {note.key}
                  </div>
  
                  {isNextBlack && (
                    <div
                      className={`piano-key-black ${
                        pressedKeys.has(isNextBlack.key) ? 'pressed' : ''
                      }`}
                      style={{ left: '40px' }}
                    >
                      {isNextBlack.key}
                    </div>
                  )}
                </div>
              )
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default App
