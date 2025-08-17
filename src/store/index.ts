
import create from 'zustand';
import { themes, Theme } from '../styles/themes';

interface ThemeState {
  theme: Theme;
  setTheme: (themeName: Theme) => void;
}

export const useStore = create<ThemeState>((set) => ({
  theme: 'dark',
  setTheme: (themeName) => {
    const root = document.documentElement;
    const themeColors = themes[themeName];
    for (const [key, value] of Object.entries(themeColors)) {
      root.style.setProperty(key, value);
    }
    set({ theme: themeName });
  },
}));
