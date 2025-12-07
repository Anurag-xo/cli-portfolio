

import { ICommand } from '../types';

const Banner: React.FC = () => {
  return (
    <pre>
      {`
      _   _              _            _   _ 
     | | | | ___  _ __  | | ___      | | | | __ _ _ __  ___ 
  _  | | | |/ _ \| '_ \| |/ _ \  _   | | | |/ _\` | '_ \/ __|
 | |_| | | | (_) | | | | |  __/ | |__| | | | (_| | | | \__ \
  \___/|_|_|\___/|_|_|_|_|\___|  \____/|_|_|\__,_|_|_|_|___/

    `}
    </pre>
  );
};

export const banner: ICommand = {
  name: 'banner',
  description: 'Displays the banner.',
  execute: () => <Banner />,
};

