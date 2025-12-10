import { ICommand } from "../types";

export const clear: ICommand = {
  name: "clear",
  description: "Clears the terminal history.",
  category: 'General',
  execute: (args, setCommandHistory) => {
    setCommandHistory([]);
    return "";
  },
};
