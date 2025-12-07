import { ICommand } from '../types';

export const echo: ICommand = {
  name: 'echo',
  description: 'Prints the given text.',
  execute: (args) => args.join(' '),
};
