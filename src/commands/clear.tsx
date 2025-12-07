import { ICommand } from '../types';

export const clear: ICommand = {
  name: 'clear',
  description: 'Clears the terminal history.',
  execute: (args, setCommandHistory) => {
    setCommandHistory([]);
    return '';
  },
};
