import { ICommand } from '../types';

export const echo: ICommand = {
  name: 'echo',
  description: 'Prints the given text.',
  execute: (args) => {
    if (args.length === 0) {
      return '';
    }

    if (args[0] === '--help') {
      return 'Usage: echo [text...]\n\nPrints the given text to the terminal.';
    }

    return args.join(' ');
  },
};
