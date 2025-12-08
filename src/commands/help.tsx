import React from 'react';
import { ICommand } from '../types';
import { commands } from './index';
import { themes } from '../styles/themes';

const Help: React.FC = () => {
  const generalCommands = ['help', 'clear', 'motd', 'welcome', 'sudo', 'echo', 'date', 'whoami', 'history', 'banner'];
  const aboutMeCommands = ['about', 'projects', 'contact', 'github', 'socials'];
  const systemCommands = ['neofetch', 'system', 'theme', 'weather'];

  const renderCommands = (commandNames: string[]) => (
    <ul className="list-disc list-inside ml-4">
      {commandNames.map((name) => {
        const command = commands[name];
        if (!command || command.name === 'ls') return null; // Skip aliases or undefined commands
        let usage = '';
        if (command.name === 'theme') {
          usage = `<br /><span className="ml-2">Usage: theme [theme]</span><br /><span className="ml-2">Available themes: ${Object.keys(themes).join(', ')}.</span>`;
        } else if (command.name === 'weather') {
          usage = '<br /><span className="ml-2">Usage: weather [location]</span>';
        }
        return (
          <li key={name}>
            <span className="font-bold w-20 inline-block">{command.name}</span>: {command.description}
            {usage && <span dangerouslySetInnerHTML={{ __html: usage }} />}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="space-y-2">
      <p className="font-bold text-lg">Available commands:</p>
      
      <div>
        <p className="font-bold text-accent">General</p>
        {renderCommands(generalCommands)}
      </div>

      <div>
        <p className="font-bold text-accent">About Me</p>
        {renderCommands(aboutMeCommands)}
      </div>

      <div>
        <p className="font-bold text-accent">System</p>
        {renderCommands(systemCommands)}
      </div>
    </div>
  );
};

export const help: ICommand = {
  name: 'help',
  description: 'Displays this help message.',
  execute: () => <Help />,
};
