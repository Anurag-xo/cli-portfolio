import { ICommand } from "../types";

export const date: ICommand = {
  name: "date",
  description: "Displays the current date and time.",
  execute: () => {
    return new Date().toString();
  },
};
