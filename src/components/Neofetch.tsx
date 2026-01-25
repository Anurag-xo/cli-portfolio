import React from "react";
import { user } from "../data/user";

const SkillBar = ({ name, level }: { name: string; level: number }) => (
  <div className="flex items-center">
    <span className="w-24">{name}</span>
    <div className="w-full bg-gray-700 rounded-full h-2.5">
      <div
        className="bg-blue-500 h-2.5 rounded-full"
        style={{ width: `${level}%` }}
      ></div>
    </div>
  </div>
);

export const Neofetch: React.FC = () => {
  return (
    <div className="flex">
      <div className="w-1/3">
        <pre>
          {`
     _    _   _ _   _ ____      _    ____ 
    / \  | \ | | | | |  _ \    / \  / ___|
   / _ \ |  \| | | | | |_) |  / _ \| |  _ 
  / ___ \| |\  | |_| |  _ <  / ___ \ |_| |
 /_/   \_\_| \_|\___/|_| \_\/_/   \_\____|

          `}
        </pre>
      </div>
      <div className="w-2/3 space-y-2">
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p>{user.title}</p>
        <p>{user.bio}</p>

        <div>
          <span className="font-bold">Location:</span> {user.location}
        </div>
        <div>
          <span className="font-bold">Website:</span>{" "}
          <a href={user.website} target="_blank" rel="noopener noreferrer">
            {user.website}
          </a>
        </div>

        <div className="mt-4">
          <h3 className="font-bold">Skills</h3>
          {user.skills.map((skill) => (
            <SkillBar key={skill.name} name={skill.name} level={skill.level} />
          ))}
        </div>
      </div>
    </div>
  );
};
