import { themes, Theme } from '../styles/themes';
import { ICommand } from '../types';

export const theme: ICommand = {
  name: 'theme',
  description: 'Changes the theme of the terminal.',
  execute: (args, setCommandHistory, commandHistory, setTheme) => {
    if (args.length === 0) {
      return `Available themes: ${Object.keys(themes).join(', ')}.`;
    }

    const newTheme = args[0] as Theme;
    if (themes[newTheme]) {
      setTheme(newTheme);
      return `Theme changed to ${newTheme}.`;
    } else {
      return `Invalid theme. Available themes: ${Object.keys(themes).join(', ')}.`;
    }
  },
};
