import { ICommand } from '../types';

const Contact: React.FC = () => {
  return (
    <div>
      <p>You can reach me at:</p>
      <ul className="list-disc list-inside">
        <li>Email: anurag.s.xo@gmail.com</li>
        <li>GitHub: <a href="https://github.com/Anurag-xo" target="_blank" rel="noopener noreferrer">Anurag-xo</a></li>
      </ul>
    </div>
  );
};

export const contact: ICommand = {
  name: 'contact',
  description: 'Displays my contact information.',
  execute: () => <Contact />,
};
