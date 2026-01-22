import { ICommand } from "../types";
import { CommandOutput } from "../components/CommandOutput";

const Contact: React.FC = () => {
  return (
    <CommandOutput>
      <p>You can reach me at:</p>
      <ul className="list-disc list-inside">
        <li>Email: anurag.s.xo@gmail.com</li>
        <li>
          GitHub:{" "}
          <a
            href="https://github.com/Anurag-xo"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anurag-xo
          </a>
        </li>
      </ul>
    </CommandOutput>
  );
};

export const contact: ICommand = {
  name: "contact",
  description: "Displays my contact information.",
  execute: () => <Contact />,
};
