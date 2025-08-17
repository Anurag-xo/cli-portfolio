
import { themes, Theme } from '../styles/themes';

export const processCommand = (
  input: string,
  setCommandHistory: React.Dispatch<React.SetStateAction<{ input: string; output: React.ReactNode }[]>>,
  commandHistory: { input: string; output: React.ReactNode }[],
  setTheme: (theme: Theme) => void
) => {
  let output: React.ReactNode = '';
  const [command, ...args] = input.trim().split(' ');

  switch (command) {
    case 'help':
      output = (
        <div>
          <p>Available commands:</p>
          <ul className="list-disc list-inside">
            <li>help: Show this help message.</li>
            <li>about: Show information about me.</li>
            <li>projects: List my projects.</li>
            <li>contact: Show my contact information.</li>
            <li>theme [theme]: Change the theme. Available themes: {Object.keys(themes).join(', ')}.</li>
            <li>motd: Show the message of the day.</li>
            <li>neofetch: Show system information.</li>
            <li>clear: Clear the terminal.</li>
          </ul>
        </div>
      );
      break;
    case 'about':
      output = 'I am a passionate software developer with a love for creating beautiful and functional applications.';
      break;
    case 'projects':
      output = 'To see my projects, please visit my GitHub profile.';
      break;
    case 'contact':
      output = (
        <div>
          <p>You can reach me at:</p>
          <ul className="list-disc list-inside">
            <li>Email: anurag-xo@example.com</li>
            <li>GitHub: <a href="https://github.com/Anurag-xo" target="_blank" rel="noopener noreferrer">Anurag-xo</a></li>
          </ul>
        </div>
      );
      break;
    case 'theme': {
      const newTheme = args[0] as Theme;
      if (themes[newTheme]) {
        setTheme(newTheme);
        output = `Theme changed to ${newTheme}.`;
      } else {
        output = `Invalid theme. Available themes: ${Object.keys(themes).join(', ')}.`;
      }
      break;
    }
    case 'motd':
      output = 'Welcome to my interactive portfolio! I hope you enjoy your stay.';
      break;
    case 'neofetch':
      output = (
        <pre>
          {`
          user@terminal
          ---------------
          OS: Web Browser
          Host: Your Machine
          Kernel: JavaScript
          Uptime: As long as you've been here
          Shell: bash
          CPU: Your Brain
          GPU: Your Eyes
          Memory: Your Imagination
          `}
        </pre>
      );
      break;
    case 'clear':
      setCommandHistory([]);
      return;
    default:
      output = `Command not found: ${command}. Type 'help' for a list of commands.`;
  }

  setCommandHistory([...commandHistory, { input, output }]);
};
