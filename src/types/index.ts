import React from 'react';
import { Theme } from '../styles/themes';

export interface Command {
  input: string;
  output: string;
  timestamp: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  codeUrl?: string;
  status: 'deployed' | 'development' | 'archived';
}

export interface Skill {
  name:string;
  level: number;
  category: 'devops' | 'cloud' | 'development' | 'database' | 'monitoring';
}

// New types for the command processor
export type CommandFunction = (
  args: string[],
  setCommandHistory: React.Dispatch<React.SetStateAction<{ input: string; output: React.ReactNode }[]>>,
  commandHistory: { input: string; output: React.ReactNode }[],
  setTheme: (theme: Theme) => void
) => React.ReactNode;

export interface ICommand {
  name: string;
  description: string;
  execute: CommandFunction;
}

export interface Commands {
  [key: string]: ICommand;
}
