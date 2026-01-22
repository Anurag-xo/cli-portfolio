import { ICommand } from "../types";
import { CommandOutput } from "../components/CommandOutput";

const Socials: React.FC = () => {
  return (
    <CommandOutput>
      <p>You can find me on the following platforms:</p>
      <ul className="list-disc list-inside">
        <li>
          <a
            href="https://github.com/Anurag-xo"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/anurag-s-9b09b81b3/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/Anurag_xo"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </li>
      </ul>
    </CommandOutput>
  );
};

export const socials: ICommand = {
  name: "socials",
  description: "Displays my social media links.",
  execute: () => <Socials />,
};
