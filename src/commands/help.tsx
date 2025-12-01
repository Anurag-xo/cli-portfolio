import { themes } from '../../styles/themes';

export const help = (): React.ReactNode => (
  <div className="space-y-2">
    <p className="font-bold text-lg">Available commands:</p>
    
    <div>
      <p className="font-bold text-accent">General</p>
      <ul className="list-disc list-inside ml-4">
        <li><span className="font-bold w-20 inline-block">help</span>: Show this help message.</li>
        <li><span className="font-bold w-20 inline-block">clear</span>: Clear the terminal.</li>
        <li><span className="font-bold w-20 inline-block">motd</span>: Show the message of the day.</li>
        <li><span className="font-bold w-20 inline-block">welcome</span>: Show the welcome message.</li>
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
      </ul>
    </div>
  </div>
);
