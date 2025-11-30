
import { themes, Theme } from '../styles/themes';
import {
  help,
  about,
  projects,
  contact,
  theme,
  motd,
  neofetch,
  clear,
  github,
} from '../commands';

export const processCommand = (
  input: string,
  setCommandHistory: React.Dispatch<React.SetStateAction<{ input: string; output: React.ReactNode }[]>>,
  commandHistory: { input: string; output: React.ReactNode }[],
  setTheme: (theme: Theme) => void
) => {
  let output: React.ReactNode = '';
  const [command, ...args] = input.trim().split(' ');

  switch (command) {
    case 'help':
      output = help();
      break;
    case 'about':
      output = about();
      break;
    case 'projects':
      output = projects();
      break;
    case 'contact':
      output = contact();
      break;
    case 'theme':
      output = theme(args, setTheme);
      break;
    case 'motd':
      output = motd();
      break;
    case 'neofetch':
      output = neofetch();
      break;
    case 'github':
      output = github();
      break;
    case 'clear':
      clear(setCommandHistory);
      return;
    default:
      output = `Command not found: ${command}. Type 'help' for a list of commands.`;
  }

  setCommandHistory([...commandHistory, { input, output }]);
};
