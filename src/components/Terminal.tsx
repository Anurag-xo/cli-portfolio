import React, { useState, useEffect, useRef } from 'react';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { TerminalOutput } from './TerminalOutput';
import { GitHubStats } from './GitHubStats';
import { ProjectViewer } from './ProjectViewer';
import { SystemMonitor } from './SystemMonitor';
import { MatrixRain } from './MatrixRain';
import { Command } from '../types';
import confetti from 'canvas-confetti';

export const Terminal: React.FC = () => {
  const [isBooted, setIsBooted] = useState(false);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<Command[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [matrixMode, setMatrixMode] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('matrix');
  const [showProjectViewer, setShowProjectViewer] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const bootSequence = [
    'Initializing secure connection...',
    'Loading encryption protocols...',
    'Mounting file systems...',
    'Starting network services...',
    'Loading user profile...',
    'Connecting to GitHub API...',
    'Initializing system monitors...',
    'Terminal ready.',
    '',
    'Welcome to the DevOps Terminal Portfolio',
    'Type "help" to see available commands',
    ''
  ];

  const { displayedText: bootText, isComplete: bootComplete } = useTypingEffect(
    bootSequence.join('\n'),
    50
  );

  useEffect(() => {
    if (bootComplete) {
      setTimeout(() => setIsBooted(true), 500);
    }
  }, [bootComplete]);

  useEffect(() => {
    if (inputRef.current && isBooted) {
      inputRef.current.focus();
    }
  }, [isBooted]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  const availableCommands = [
    'help', 'about', 'skills', 'projects', 'experience', 'github',
    'contact', 'resume', 'clear', 'game', 'matrix', 'theme', 'blog',
    'whoami', 'date', 'uptime', 'monitor', 'sudo', 'curl', 'download'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentInput(value);
    
    // Auto-completion suggestions
    if (value) {
      const matches = availableCommands.filter(cmd => 
        cmd.startsWith(value.toLowerCase())
      );
      setSuggestions(matches.slice(0, 3));
    } else {
      setSuggestions([]);
    }
  };

  const executeCommand = (cmd: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const newCommand: Command = {
      input: cmd,
      timestamp,
      output: processCommand(cmd)
    };
    
    setCommandHistory(prev => [...prev, newCommand]);
    setCurrentInput('');
    setSuggestions([]);
    setHistoryIndex(-1);
  };

  const processCommand = (cmd: string): string => {
    const [command, ...args] = cmd.toLowerCase().trim().split(' ');
    
    switch (command) {
      case 'help':
        return `Available commands:
┌─────────────┬────────────────────────────────────┐
│ Command     │ Description                        │
├─────────────┼────────────────────────────────────┤
│ about       │ Learn about me                     │
│ skills      │ View technical skills              │
│ projects    │ Browse my projects                 │
│ experience  │ Professional experience           │
│ contact     │ Get in touch                       │
│ resume      │ Download my resume                 │
│ clear       │ Clear terminal                     │
│ matrix      │ Enter the matrix                   │
│ game        │ Play terminal snake                │
│ whoami      │ Display user info                  │
│ date        │ Show current date/time             │
│ uptime      │ System uptime                      │
└─────────────┴────────────────────────────────────┘

Tip: Use Tab for auto-completion, ↑/↓ for command history`;

      case 'about':
        return `$ cat /home/user/about.txt

██████╗ ███████╗██╗   ██╗ ██████╗ ██████╗ ███████╗
██╔══██╗██╔════╝██║   ██║██╔═══██╗██╔══██╗██╔════╝
██║  ██║█████╗  ██║   ██║██║   ██║██████╔╝███████╗
██║  ██║██╔══╝  ╚██╗ ██╔╝██║   ██║██╔═══╝ ╚════██║
██████╔╝███████╗ ╚████╔╝ ╚██████╔╝██║     ███████║
╚═════╝ ╚══════╝  ╚═══╝   ╚═════╝ ╚═╝     ╚══════╝

Full-Stack DevOps Engineer passionate about building scalable,
secure, and efficient systems. I specialize in cloud infrastructure,
containerization, and modern development practices.

🚀 Current Focus: Cloud-native architectures & Kubernetes
🎯 Goal: Building the future of automated infrastructure
📍 Location: Available for remote collaboration worldwide`;

      case 'skills':
        return `$ docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

╔═══════════════════════════════════════════════════════════╗
║                    SKILLS DASHBOARD                        ║
╠═══════════════════════════════════════════════════════════╣

🔧 DevOps & Infrastructure:
├── CI/CD: Jenkins ████████████ 95%
├── GitHub Actions ███████████ 90%
├── Argo CD ██████████ 85%
├── Kubernetes ████████████ 92%
├── Docker ██████████████ 98%
├── Terraform ███████████ 88%
├── Ansible ██████████ 80%

☁️ Cloud Platforms:
├── AWS ████████████ 90%
├── Azure ██████████ 75%
├── GCP ████████ 70%

📊 Monitoring & Observability:
├── Prometheus ███████████ 85%
├── Grafana ██████████ 80%
├── ELK Stack ████████ 75%

💻 Development:
├── Node.js ████████████ 90%
├── Python ███████████ 85%
├── Go ████████ 70%
├── React ██████████ 80%
├── PostgreSQL ███████████ 85%
├── MongoDB ████████ 75%
├── Redis ██████████ 80%

Status: All systems operational ✅`;

      case 'projects':
        if (args[0] === '--help') {
          return `Project commands:
  projects          - List all projects
  projects --live   - Show live project links
  projects --code   - Show source code links`;
        }
        if (args[0] === '--live') {
          return `🌐 Live Project Deployments:
┌─────────────────────────────────────────────────────┐
│ [LIVE] E-Commerce Platform                          │
│ └── https://shop.example.com                        │
│ [LIVE] Task Management App                          │
│ └── https://tasks.example.com                       │
│ [LIVE] DevOps Dashboard                             │
│ └── https://dashboard.example.com                   │
└─────────────────────────────────────────────────────┘`;
        }
        if (args[0] === '--code') {
          return `📂 Source Code Repositories:
┌─────────────────────────────────────────────────────┐
│ [CODE] Microservices Platform                       │
│ └── https://github.com/user/microservices-platform  │
│ [CODE] Kubernetes Operators                         │
│ └── https://github.com/user/k8s-operators          │
│ [CODE] Infrastructure as Code                       │
│ └── https://github.com/user/terraform-modules      │
└─────────────────────────────────────────────────────┘`;
        }
        return `$ kubectl get deployments --namespace=portfolio

PROJECT PORTFOLIO - DEPLOYMENT STATUS
╔════════════════════════════════════════════════════════╗

🏗️ Infrastructure Projects:
├── Kubernetes Multi-Cluster Setup
│   ├── Tech: K8s, Istio, Prometheus, Grafana
│   ├── Status: Production Ready ✅
│   └── Scale: 50+ microservices, 100+ pods
│
├── CI/CD Pipeline Automation
│   ├── Tech: Jenkins, GitHub Actions, ArgoCD
│   ├── Status: Active Deployment ✅
│   └── Performance: 95% faster deployments
│
├── Infrastructure as Code Platform
│   ├── Tech: Terraform, Ansible, AWS/Azure
│   ├── Status: Multi-Cloud Ready ✅
│   └── Coverage: 100% automated provisioning

💻 Full-Stack Applications:
├── E-Commerce Microservices
│   ├── Backend: Node.js, Python FastAPI
│   ├── Frontend: React, TypeScript
│   ├── Database: PostgreSQL, Redis
│   └── Deployment: Docker + Kubernetes
│
├── Real-time Chat Application
│   ├── Backend: Go, WebSockets
│   ├── Frontend: React, Socket.io
│   ├── Database: MongoDB, Redis
│   └── Features: 1M+ concurrent users
│
├── DevOps Monitoring Dashboard
│   ├── Backend: Python Django, Celery
│   ├── Frontend: React, D3.js
│   ├── Database: PostgreSQL, InfluxDB
│   └── Integration: Prometheus, Grafana

Use "projects --live" or "projects --code" for links`;

      case 'experience':
        return `$ grep -r "experience" /var/log/career.log

PROFESSIONAL EXPERIENCE LOG
╔════════════════════════════════════════════════════════╗

[2023-Present] Senior DevOps Engineer @ TechCorp
├── Designed and implemented Kubernetes infrastructure
├── Reduced deployment time by 80% with GitOps
├── Led migration of 50+ microservices to cloud-native
└── Technologies: K8s, AWS, Terraform, Jenkins

[2021-2023] Full-Stack Developer @ StartupXYZ
├── Built scalable microservices architecture
├── Implemented CI/CD pipelines from scratch
├── Developed real-time applications serving 100K+ users
└── Technologies: Node.js, React, PostgreSQL, Docker

[2020-2021] Junior DevOps Engineer @ CloudSolutions
├── Automated infrastructure provisioning
├── Monitored production systems with Prometheus/Grafana
├── Implemented backup and disaster recovery strategies
└── Technologies: AWS, Ansible, Python, Bash

[2019-2020] Software Developer Intern @ Innovation Labs
├── Developed REST APIs and database schemas
├── Created automated testing frameworks
├── Collaborated on agile development teams
└── Technologies: Python, Django, PostgreSQL, Git

🎓 Education:
├── B.S. Computer Science - University of Technology (2019)
├── AWS Certified Solutions Architect
├── Certified Kubernetes Administrator (CKA)
└── Terraform Associate Certification`;

      case 'contact':
        return `$ cat /etc/contact.conf

ESTABLISH CONNECTION
╔════════════════════════════════════════════════════════╗

📧 Primary Channels:
├── Email: devops.engineer@example.com
├── LinkedIn: linkedin.com/in/devops-engineer
├── GitHub: github.com/devops-engineer
└── Portfolio: https://terminal-portfolio.dev

💬 Preferred Communication:
├── Technical Discussions: Email/LinkedIn
├── Project Collaboration: GitHub
├── Quick Questions: LinkedIn DM
└── Response Time: < 24 hours

🌍 Availability:
├── Timezone: UTC-5 (EST)
├── Hours: 9:00 AM - 6:00 PM
├── Remote Work: ✅ Available worldwide
└── Travel: Open to opportunities

📞 Schedule a Call:
└── calendly.com/devops-engineer

Connection established. Ready for collaboration.`;

      case 'resume':
        return `$ wget https://portfolio.dev/resume.pdf

--2025-01-XX 10:30:45--  https://portfolio.dev/resume.pdf
Resolving portfolio.dev... 192.168.1.100
Connecting to portfolio.dev|192.168.1.100|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 245760 (240K) [application/pdf]
Saving to: 'DevOps_Engineer_Resume.pdf'

DevOps_Engineer_Resume.pdf 100%[===================>] 240K  --.-KB/s    in 0.1s

2025-01-XX 10:30:45 (2.40 MB/s) - 'DevOps_Engineer_Resume.pdf' saved [245760/245760]

✅ Resume downloaded successfully!
📄 File: DevOps_Engineer_Resume.pdf (240K)
🔗 Direct link: https://portfolio.dev/resume.pdf

Resume includes:
├── Complete technical skills matrix
├── Detailed project accomplishments  
├── Certification details
├── Professional references
└── Contact information`;

      case 'clear':
        setCommandHistory([]);
        return '';

      case 'whoami':
        return `devops-engineer
uid=1001(devops) gid=1001(devops) groups=1001(devops),4(adm),27(sudo),999(docker)
Current user: DevOps Engineer
Home directory: /home/devops
Shell: /bin/bash
Permissions: sudo, docker, kubernetes`;

      case 'date':
        return new Date().toString();

      case 'uptime':
        return `Portfolio uptime: 99.9% | Last deployment: 2 days ago
System load: 0.1, 0.2, 0.1 | Memory usage: 45%
Active connections: 1,337 | Response time: <50ms`;

      case 'matrix':
        return `Wake up, Neo...
The Matrix has you...
Follow the white rabbit.

⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣶⣿⣿⣷⣶⣄⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣾⣿⣿⡿⢿⣿⣿⣿⣿⣿⣿⣿⣷⢢⣀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⡟⠁⣰⣿⣿⣿⡿⠿⠻⠿⣿⣿⣿⣿⣧⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⠏⠀⣴⣿⣿⣿⠉⠀⠀⠀⠀⠀⠈⢻⣿⣿⣇⠀⠀⠀
⠀⠀⠀⠀⢀⣠⣼⣿⣿⡏⠀⢠⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⣿⡀⠀⠀
⠀⠀⠀⣰⣿⣿⣿⣿⣿⡇⠀⢸⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⡇⠀⠀
⠀⠀⢰⣿⣿⡿⣿⣿⣿⡇⠀⠘⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⢀⣸⣿⣿⣿⠁⠀⠀
⠀⠀⣿⣿⣿⠁⣿⣿⣿⡇⠀⠀⠻⣿⣿⣿⣷⣶⣶⣶⣶⣶⣿⣿⣿⣿⠃⠀⠀⠀
⠀⢰⣿⣿⡇⠀⣿⣿⣿⠀⠀⠀⠀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠁⠀⠀⠀⠀
⠀⢸⣿⣿⡇⠀⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠉⠛⠛⠛⠉⢉⣿⣿⠀⠀⠀⠀⠀⠀
⠀⢸⣿⣿⣇⠀⣿⣿⣿⠀⠀⠀⠀⠀⢀⣤⣤⣤⡀⠀⠀⢸⣿⣿⣿⣷⣦⠀⠀⠀
⠀⠀⢻⣿⣿⣶⣿⣿⣿⠀⠀⠀⠀⠀⠈⠻⣿⣿⣿⣦⡀⠀⠉⠉⠻⣿⣿⡇⠀⠀
⠀⠀⠀⠛⠿⣿⣿⣿⣿⣷⣤⡀⠀⠀⠀⠀⠈⠹⣿⣿⣇⣀⠀⣠⣾⣿⣿⡇⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣦⣤⣤⣤⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⢿⣿⣿⣿⣿⣿⣿⠿⠋⠉⠛⠋⠉⠉⠁⠀⠀⠀⠀

Reality is merely an illusion...`;

      case 'game':
        return `🐍 Terminal Snake Game Loading...

Use WASD or Arrow Keys to control the snake
Press 'q' to quit, 'r' to restart

┌─────────────────────────────────────────┐
│ ⚡ Starting game in 3... 2... 1...      │
│                                         │
│ Current Score: 0                        │
│ High Score: 1337                        │
│                                         │
│ 🐍 Ready Player One!                    │
└─────────────────────────────────────────┘

Game initialized! (This is a demo - full game coming soon)`;

      default:
        return `bash: ${command}: command not found

Did you mean one of these?
${availableCommands.filter(cmd => 
  cmd.includes(command.charAt(0)) || 
  command.includes(cmd.charAt(0))
).slice(0, 3).map(cmd => `  ${cmd}`).join('\n')}

Type "help" for available commands.`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (currentInput.trim()) {
        executeCommand(currentInput.trim());
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setCurrentInput(suggestions[0]);
        setSuggestions([]);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex].input);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex].input);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    }
  };

  if (!isBooted) {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center">
        <div className="w-full max-w-4xl p-8">
          <div className="mb-8 text-center">
            <div className="text-6xl mb-4 animate-pulse">⚡</div>
            <h1 className="text-2xl mb-2 text-green-300">SECURE TERMINAL</h1>
            <div className="w-48 h-2 bg-gray-800 rounded mx-auto overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-1000"
                style={{ width: bootComplete ? '100%' : '60%' }}
              />
            </div>
          </div>
          <pre className="text-sm leading-relaxed whitespace-pre-wrap">
            {bootText}
            <span className="animate-pulse">█</span>
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Matrix Rain Effect */}
      {matrixMode && <MatrixRain />}

      {/* Scanlines effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/5 to-transparent animate-pulse" 
             style={{ 
               backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.1) 2px, rgba(0,255,65,0.1) 4px)',
               animation: 'scanlines 0.1s linear infinite'
             }} />
      </div>

      {/* Project Viewer Modal */}
      {showProjectViewer && (
        <ProjectViewer 
          project={selectedProject} 
          onClose={() => {
            setShowProjectViewer(false);
            setSelectedProject(null);
          }} 
        />
      )}

      <div className="relative z-10 p-4">
        {/* Header */}
        <div className="mb-4 border-b border-green-400/30 pb-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl text-green-300 glow">
              root@portfolio:~$ █
            </h1>
            <div className="text-xs text-green-400/70">
              {new Date().toLocaleString()} | v3.0.0 | Theme: {currentTheme}
            </div>
          </div>
        </div>

        {/* Terminal Output */}
        <div 
          ref={terminalRef}
          className="h-96 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-green-400/30"
        >
          {commandHistory.map((command, index) => (
            <TerminalOutput key={index} command={command} />
          ))}
        </div>

        {/* Input Line */}
        <div className="flex items-center space-x-2">
          <span className="text-green-300 glow">user@terminal:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-green-400 caret-green-400"
            placeholder="Enter command..."
            spellCheck={false}
          />
          <span className="animate-pulse text-green-400">█</span>
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="mt-2 text-sm text-green-400/70">
            <span>Suggestions: </span>
            {suggestions.map((suggestion, index) => (
              <span key={suggestion} className="mr-4 hover:text-green-400 cursor-pointer">
                {suggestion}
              </span>
            ))}
          </div>
        )}

        {/* Status Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-green-400/10 border-t border-green-400/30 p-2 text-xs">
          <div className="flex justify-between items-center">
            <span>Status: Online | Commands: {commandHistory.length} | Theme: {currentTheme}</span>
            <span>Press Tab for auto-completion | ↑/↓ for history</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .glow {
          text-shadow: 0 0 10px currentColor;
        }
        @keyframes scanlines {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 65, 0.3);
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 255, 65, 0.5);
        }
      `}</style>
    </div>
  );
};