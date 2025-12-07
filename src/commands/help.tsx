import { ICommand } from '../types';
import { themes } from '../styles/themes';

const Help: React.FC = () => {
  return (
    <div className="space-y-2">
      <p className="font-bold text-lg">Available commands:</p>
      
      <div>
        <p className="font-bold text-accent">General</p>
        <ul className="list-disc list-inside ml-4">
          <li><span className="font-bold w-20 inline-block">help</span>: Show this help message.</li>
          <li><span className="font-bold w-20 inline-block">clear</span>: Clear the terminal.</li>
          <li><span className="font-bold w-20 inline-block">motd</span>: Show the message of the day.</li>
          <li><span className="font-bold w-20 inline-block">welcome</span>: Show the welcome message.</li>
          <li><span className="font-bold w-20 inline-block">sudo</span>: Run a command with root privileges.</li>
          <li><span className="font-bold w-20 inline-block">echo</span>: Print a message.</li>
          <li><span className="font-bold w-20 inline-block">date</span>: Show the current date and time.</li>
          <li><span className="font-bold w-20 inline-block">whoami</span>: Show the current user.</li>
        </ul>
      </div>

      <div>
        <p className="font-bold text-accent">About Me</p>
        <ul className="list-disc list-inside ml-4">
          <li><span className="font-bold w-20 inline-block">about</span>: Show information about me.</li>
          <li><span className="font-bold w-20 inline-block">projects</span>: List my projects.</li>
          <li><span className="font-bold w-20 inline-block">contact</span>: Show my contact information.</li>
          <li><span className="font-bold w-20 inline-block">github</span>: Show my github stats.</li>
        </ul>
      </div>

      <div>
        <p className="font-bold text-accent">System</p>
        <ul className="list-disc list-inside ml-4">
          <li><span className="font-bold w-20 inline-block">neofetch</span>: Show system information.</li>
          <li><span className="font-bold w-20 inline-block">system</span>: Show system monitor.</li>
          <li>
            <span className="font-bold w-20 inline-block">theme</span>: Change the theme.
            <br />
            <span className="ml-2">Usage: theme [theme]</span>
            <br />
            <span className="ml-2">Available themes: {Object.keys(themes).join(', ')}.</span>
          </li>
          <li>
            <span className="font-bold w-20 inline-block">weather</span>: Show the weather for a given location.
            <br />
            <span className="ml-2">Usage: weather [location]</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export const help: ICommand = {
  name: 'help',
  description: 'Displays this help message.',
  execute: () => <Help />,
};
