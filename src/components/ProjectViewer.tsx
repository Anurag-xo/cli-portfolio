import React from 'react';

interface Project {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

interface ProjectViewerProps {
  projects: Project[];
}

export const ProjectViewer: React.FC<ProjectViewerProps> = ({ projects }) => {
  return (
    <div>
      <h2 className="text-xl font-bold">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="border p-4 rounded-lg hover:bg-gray-800"
          >
            <h3 className="font-bold">{project.name}</h3>
            <p className="text-sm">{project.description}</p>
            <div className="flex justify-between mt-2 text-xs">
              <span>⭐ {project.stargazers_count}</span>
              <span>{project.language}</span>
              <span>{project.forks_count} forks</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};