
import { ICommand } from '../types';
import React from 'react';
import { ICommand } from '../types';

export const history: ICommand = {
  name: 'history',
  description: 'Displays the command history.',
  execute: (args, setCommandHistory, commandHistory) => {
    return (
      <div>
        {commandHistory.map((command, index) => (
          <div key={index}>
            <span>{index + 1}</span>
            <span className="ml-2">{command.input}</span>
          </div>
        ))}
      </div>
    );
  },
};
