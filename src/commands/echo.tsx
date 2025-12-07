import { ICommand } from '../types';

export const echo: ICommand = {
  name: 'echo',
  description: 'Echoes the input.',
  execute: (args) => {
    return args.join(' ');
  },
};
