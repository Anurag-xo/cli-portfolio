import { ICommand } from '../types';

const About: React.FC = () => {
  return (
    <div>
      <p>I am a passionate software developer with a love for creating beautiful and functional applications.</p>
    </div>
  );
};

export const about: ICommand = {
  name: 'about',
  description: 'Displays information about me.',
  execute: () => <About />,
};
