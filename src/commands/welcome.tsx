
import { ICommand } from '../types';

export const welcome: ICommand = {
  name: 'welcome',
  description: 'Displays the welcome message.',
  execute: () => `
  Booting up terminal...
  Welcome to my portfolio!
  Type 'help' to see available commands.
  `,
};
