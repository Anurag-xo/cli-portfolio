import { ICommand } from "../types";

const Banner: React.FC = () => {
  return (
    <pre>
      {`
     _    _   _ _   _ ____      _    ____ 
    / \  | \ | | | | |  _ \    / \  / ___|
   / _ \ |  \| | | | | |_) |  / _ \| |  _ 
  / ___ \| |\  | |_| |  _ <  / ___ \ |_| |
 /_/   \_\_| \_|\___/|_| \_\/_/   \_\____|

    `}
    </pre>
  );
};

export const banner: ICommand = {
  name: "banner",
  description: "Displays the banner.",
  category: "General",
  execute: () => <Banner />,
};
