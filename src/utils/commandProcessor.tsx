
import { commands } from '../commands';
import { Theme } from '../styles/themes';
import React from 'react';

export const processCommand = (
  input: string,
  setCommandHistory: React.Dispatch<React.SetStateAction<{ input: string; output: React.ReactNode }[]>>,
  commandHistory: { input: string; output: React.ReactNode }[],
  setTheme: (theme: Theme) => void
) => {
  const [command, ...args] = input.trim().split(' ');

  if (command in commands) {
    const output = commands[command].execute(args, setCommandHistory, commandHistory, setTheme);
    if (command !== 'clear') {
      setCommandHistory([...commandHistory, { input, output }]);
    }
  } else {
    const output = `Command not found: ${command}. Type 'help' for a list of commands.`;
    setCommandHistory([...commandHistory, { input, output }]);
  }
};
