import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../store';
import { processCommand } from '../utils/commandProcessor.tsx';

export const Terminal = () => {
  const [commandHistory, setCommandHistory] = useState<{ input: string; output: React.ReactNode }[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { setTheme } = useStore();

  const bootText = `
  Booting up terminal...
  Welcome to my portfolio!
  Type 'help' to see available commands.
  `;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processCommand(currentInput, setCommandHistory, commandHistory, setTheme);
      setCurrentInput('');
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="font-mono text-sm leading-snug h-full" onClick={() => inputRef.current?.focus()}>
      {/* Boot Text */}
      <div className="text-primary">
        {bootText.split('\n').map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>

      {/* Command History */}
      {commandHistory.map((command, index) => (
        <React.Fragment key={index}>
          <div className="flex items-baseline">
            <span className="text-accent">user@terminal:~$ </span>
            <span className="text-text">{command.input}</span>
          </div>
          {command.output && (
            <div className="text-primary whitespace-pre-wrap ml-2">
              {command.output}
            </div>
          )}
        </React.Fragment>
      ))}

      {/* Current Input */}
      <div className="flex items-baseline">
        <span className="text-accent">user@terminal:~$ </span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-text ml-1 min-w-1"
          spellCheck={false}
          autoFocus
        />
        <span className="text-primary">█</span>
      </div>
    </div>
  );
};
