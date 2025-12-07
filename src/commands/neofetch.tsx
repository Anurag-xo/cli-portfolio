import { Neofetch } from '../components/Neofetch';
import { ICommand } from '../types';

export const neofetch: ICommand = {
  name: 'neofetch',
  description: 'Displays system information.',
  execute: () => <Neofetch />,
};
