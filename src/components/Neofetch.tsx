import React from 'react';

const skills = [
  { name: 'TypeScript', level: 90 },
  { name: 'JavaScript', level: 90 },
  { name: 'React', level: 95 },
  { name: 'Node.js', level: 85 },
  { name: 'Python', level: 80 },
  { name: 'Go', level: 70 },
  { name: 'HTML/CSS', level: 95 },
];

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
    _   _              _
   / \ | | ___  _ __  | | ___
  / _ \\| |/ _ \\| '_ \\ | |/ _ \\
 / ___ \\ | (_) | | | || | (_) |
/_/   \\_\\|___/|_| |_|/ |\\___/
                     |__/
          `}
        </pre>
      </div>
      <div className="w-2/3 space-y-2">
        <h2 className="text-xl font-bold">Anurag-xo</h2>
        <p>Full Stack Developer</p>
        <p>I'm a passionate developer who loves to build things for the web.</p>
        
        <div>
          <span className="font-bold">Location:</span> India
        </div>
        <div>
          <span className="font-bold">Website:</span> <a href="https://anurag-xo.github.io" target="_blank" rel="noopener noreferrer">anurag-xo.github.io</a>
        </div>

        <div className="mt-4">
          <h3 className="font-bold">Skills</h3>
          {skills.map((skill) => (
            <SkillBar key={skill.name} name={skill.name} level={skill.level} />
          ))}
        </div>
      </div>
    </div>
  );
};
