
import { themes, Theme } from '../styles/themes';
import {
  help,
  about,
  projects,
  contact,
  theme,
  motd,
  neofetch,
  clear,
  github,
  system,
  welcome,
} from '../commands';
import React from 'react';

interface Command {
  [key: string]: (
    args: string[],
    setCommandHistory: React.Dispatch<React.SetStateAction<{ input: string; output: React.ReactNode }[]>>,
    commandHistory: { input: string; output: React.ReactNode }[],
    setTheme: (theme: Theme) => void
  ) => React.ReactNode;
}

const commands: Command = {
  help: () => help(),
  about: () => about(),
  projects: () => projects(),
  ls: () => projects(),
  contact: () => contact(),
  theme: (args, setCommandHistory, commandHistory, setTheme) => theme(args, setTheme),
  motd: () => motd(),
  neofetch: () => neofetch(),
  github: () => github(),
  system: () => system(),
  welcome: () => welcome(),
  clear: (args, setCommandHistory) => {
    clear(setCommandHistory);
    return '';
  },
};

export const processCommand = (
  input: string,
  setCommandHistory: React.Dispatch<React.SetStateAction<{ input: string; output: React.ReactNode }[]>>,
  commandHistory: { input: string; output: React.ReactNode }[],
  setTheme: (theme: Theme) => void
) => {
  const [command, ...args] = input.trim().split(' ');

  if (command in commands) {
    const output = commands[command](args, setCommandHistory, commandHistory, setTheme);
    if (command !== 'clear') {
      setCommandHistory([...commandHistory, { input, output }]);
    }
  } else {
    const output = `Command not found: ${command}. Type 'help' for a list of commands.`;
    setCommandHistory([...commandHistory, { input, output }]);
  }
};
