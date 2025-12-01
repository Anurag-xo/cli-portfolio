import { themes, Theme } from '../../styles/themes';

export const theme = (args: string[], setTheme: (theme: Theme) => void): React.ReactNode => {
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
};
