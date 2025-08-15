import React, { useState, useRef, useEffect } from 'react';

export const Terminal = () => {
  const [commandHistory, setCommandHistory] = useState<{ input: string; output: string }[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

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
      processCommand(currentInput);
      setCurrentInput('');
    }
  };

  const processCommand = (input: string) => {
    let output = '';
    const [command, ...args] = input.trim().split(' ');

    switch (command) {
      case 'help':
        output = 'Available commands: help, about, projects, contact, clear';
        break;
      case 'about':
        output = 'This is a terminal-style portfolio built with React and Tailwind CSS.';
        break;
      case 'projects':
        output = 'Project Viewer is not implemented yet.';
        break;
      case 'contact':
        output = 'You can find me on GitHub: https://github.com/Anurag-xo';
        break;
      case 'clear':
        setCommandHistory([]);
        return;
      default:
        output = `Command not found: ${command}`;
    }

    setCommandHistory([...commandHistory, { input, output }]);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="relative z-10 font-mono text-sm leading-snug">
      {/* Boot Text */}
      <div className="text-green-400">
        {bootText.split('\n').map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>

      {/* Command History */}
      {commandHistory.map((command, index) => (
        <React.Fragment key={index}>
          <div className="flex items-baseline">
            <span className="text-green-300">user@terminal:~$ </span>
            <span className="text-white">{command.input}</span>
          </div>
          {command.output && (
            <pre className="text-green-400 whitespace-pre-wrap ml-2">
              {command.output}
            </pre>
          )}
        </React.Fragment>
      ))}

      {/* Current Input */}
      <div className="flex items-baseline">
        <span className="text-green-300">user@terminal:~$ </span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-white ml-1 min-w-1"
          spellCheck={false}
          autoFocus
        />
        <span className="text-green-400">█</span>
      </div>

      {/* Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-green-400/30 text-xs text-green-400/70 px-4 py-1">
        <span>Status: Online | {commandHistory.length} cmds</span>
      </div>
    </div>
  );
};