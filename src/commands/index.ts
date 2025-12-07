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
  help: help,
  about: about,
  projects: projects,
  ls: projects, // Alias for projects
  contact: contact,
  theme: theme,
  motd: motd,
  neofetch: neofetch,
  github: github,
  system: system,
  welcome: welcome,
  socials: socials,
  history: history,
  banner: banner,
  clear: clear,
  sudo: sudo,
  echo: echo,
  date: date,
  whoami: whoami,
  weather: weather,
};
