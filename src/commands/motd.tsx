import { ICommand } from '../types';

export const motd: ICommand = {
  name: 'motd',
  description: 'Displays the message of the day.',
  execute: () => `"The only way to do great work is to love what you do." - Steve Jobs`,
};
