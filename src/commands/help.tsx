import { themes } from '../../styles/themes';

export const help = (): React.ReactNode => (
  <div>
    <p>Available commands:</p>
    <ul className="list-disc list-inside">
      <li>help: Show this help message.</li>
      <li>about: Show information about me.</li>
      <li>projects: List my projects.</li>
      <li>contact: Show my contact information.</li>
      <li>github: Show my github stats.</li>
      <li>theme [theme]: Change the theme. Available themes: {Object.keys(themes).join(', ')}.</li>
      <li>motd: Show the message of the day.</li>
      <li>neofetch: Show system information.</li>
      <li>clear: Clear the terminal.</li>
    </ul>
  </div>
);
