export interface Command {
  input: string;
  output: string;
  timestamp: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  codeUrl?: string;
  status: 'deployed' | 'development' | 'archived';
}

export interface Skill {
  name: string;
  level: number;
  category: 'devops' | 'cloud' | 'development' | 'database' | 'monitoring';
}