import React from 'react';
import { TerminalWindow } from './components/TerminalWindow';
import { MatrixRain } from './components/MatrixRain';

function App() {
  return (
    <div className="font-mono bg-background text-text min-h-screen flex items-center justify-center">
      <MatrixRain />
      <div className="z-10">
        <TerminalWindow />
      </div>
    </div>
  );
}

export default App;
