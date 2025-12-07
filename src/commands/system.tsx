import React from 'react';
import { SystemMonitor } from '../components/SystemMonitor';
import { ICommand } from '../types';

export const system: ICommand = {
  name: 'system',
  description: 'Displays the system monitor.',
  execute: () => <SystemMonitor />,
};
