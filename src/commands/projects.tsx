import React, { useState, useEffect } from "react";
import { ProjectViewer } from "../components/ProjectViewer";
import { ICommand } from "../types";
import { CommandOutput } from "../components/CommandOutput";

interface Project {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/Anurag-xo/repos",
        );
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading projects...</div>;
  }

  return (
    <CommandOutput>
      <p className="mb-4">
        Here are some of my projects from GitHub. You can click on them to view
        the source code.
      </p>
      <ProjectViewer projects={projects} />
    </CommandOutput>
  );
};

export const projects: ICommand = {
  name: "projects",
  description: "Displays my projects.",
  execute: () => <Projects />,
};
