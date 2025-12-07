import { ICommand } from '../types';

export const whoami: ICommand = {
  name: 'whoami',
  description: 'Displays the current username.',
  execute: () => {
    return 'guest';
  },
};
