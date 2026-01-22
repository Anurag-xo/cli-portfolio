import { ICommand } from "../types";
import { CommandOutput } from "../components/CommandOutput";

const About: React.FC = () => {
  return (
    <CommandOutput>
      <p>
        I am a passionate software developer with a love for creating beautiful
        and functional applications.
      </p>
    </CommandOutput>
  );
};

export const about: ICommand = {
  name: "about",
  description: "Displays information about me.",
  category: "About Me",
  execute: () => <About />,
};
