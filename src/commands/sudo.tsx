import { ICommand } from '../types';

export const sudo: ICommand = {
  name: 'sudo',
  description: 'Runs a command with root privileges.',
  execute: (args) => {
    if (args.length === 0) {
      return 'sudo: missing operand';
    }
    return `sudo: ${args.join(' ')}: command not found`;
  },
};
