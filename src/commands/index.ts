import { Commands } from '../types';
import { help } from './help';
import { about } from './about';
import { projects } from './projects';
import { contact } from './contact';
import { theme } from './theme';
import { motd } from './motd';
import { neofetch } from './neofetch';
import { clear } from './clear';
import { github } from './github';
import { system } from './system';
import { welcome } from './welcome';
import { socials } from './socials';
import { history } from './history';
import { banner } from './banner';
import { sudo } from './sudo';
import { echo } from './echo';
import { date } from './date';
import { whoami } from './whoami';
import { weather } from './weather';

export const commands: Commands = {
  help: {
    name: 'help',
    description: 'Show this help message.',
    execute: (args, setCommandHistory, commandHistory, setTheme) => help(),
  },
  about: {
    name: 'about',
    description: 'Show information about me.',
    execute: (args, setCommandHistory, commandHistory, setTheme) => about(),
  },
  projects: {
    name: 'projects',
    description: 'List my projects.',
    execute: (args, setCommandHistory, commandHistory, setTheme) => projects(),
  },
  ls: {
    name: 'ls',
    description: 'List my projects.',
    execute: (args, setCommandHistory, commandHistory, setTheme) => projects(),
  },
  contact: {
    name: 'contact',
    description: 'Show my contact information.',
    execute: (args, setCommandHistory, commandHistory, setTheme) => contact(),
  },
  theme: {
    name: 'theme',
    description: 'Change the theme.',
    execute: (args, setCommandHistory, commandHistory, setTheme) => theme(args, setTheme),
  },
  motd: {
    name: 'motd',
    description: 'Show the message of the day.',
    execute: (args, setCommandHistory, commandHistory, setTheme) => motd(),
  },
  neofetch: {
    name: 'neofetch',
    description: 'Show system information.',
    execute: (args, setCommandHistory, commandHistory, setTheme) => neofetch(),
  },
  github: {
    name: 'github',
    description: 'Show my github stats.',
    execute: (args, setCommandHistory, commandHistory, setTheme) => github(),
  },
  system: {
    name: 'system',
    description: 'Show system monitor.',
    execute: (args, setCommandHistory, commandHistory, setTheme) => system(),
  },
  welcome: {
    name: 'welcome',
    description: 'Show the welcome message.',
    execute: (args, setCommandHistory, commandHistory, setTheme) => welcome(),
  },
  socials: {
    name: 'socials',
    description: 'Show my social media links.',
    execute: (args, setCommandHistory, commandHistory, setTheme) => socials(),
  },
  history: {
    name: 'history',
    description: 'Show command history.',
    execute: (args, setCommandHistory, commandHistory, setTheme) => history(commandHistory),
  },
  banner: {
    name: 'banner',
    description: 'Show the banner.',
    execute: (args, setCommandHistory, commandHistory, setTheme) => banner(),
  },
  clear: {
    name: 'clear',
    description: 'Clear the terminal.',
    execute: (args, setCommandHistory, commandHistory, setTheme) => {
      clear(setCommandHistory);
      return '';
    },
  },
  sudo: {
    name: 'sudo',
    description: 'Run a command with root privileges.',
    execute: (args, setCommandHistory, commandHistory, setTheme) => sudo(args),
  },
  echo: {
    name: 'echo',
    description: 'Print a message.',
    execute: (args, setCommandHistory, commandHistory, setTheme) => echo(args),
  },
  date: {
    name: 'date',
    description: 'Show the current date and time.',
    execute: (args, setCommandHistory, commandHistory, setTheme) => date(),
  },
  whoami: {
    name: 'whoami',
    description: 'Show the current user.',
    execute: (args, setCommandHistory, commandHistory, setTheme) => whoami(),
  },
  weather: {
    name: 'weather',
    description: 'Show the weather for a given location.',
    execute: (args, setCommandHistory, commandHistory, setTheme) => weather(args),
  },
};
