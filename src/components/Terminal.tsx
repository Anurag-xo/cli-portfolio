import React, { useState, useEffect, useRef } from "react";
import { useTypingEffect } from "../hooks/useTypingEffect";
import { TerminalOutput } from "./TerminalOutput";
import { GitHubStats } from "./GitHubStats";
import { ProjectViewer } from "./ProjectViewer";
import { SystemMonitor } from "./SystemMonitor";
import { MatrixRain } from "./MatrixRain";
import { Command } from "../types";
import confetti from "canvas-confetti";

export const Terminal: React.FC = () => {
  const [isBooted, setIsBooted] = useState(false);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<Command[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [matrixMode, setMatrixMode] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("standard");
  const [showProjectViewer, setShowProjectViewer] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const bootSequence = [
    "Initializing secure connection...",
    "Loading encryption protocols...",
    "Mounting file systems...",
    "Starting network services...",
    "Loading user profile...",
    "Connecting to GitHub API...",
    "Initializing system monitors...",
    "Terminal ready.",
    "",
    "Welcome to the DevOps Terminal Portfolio",
    'Type "help" to see available commands',
    "",
  ];

  const { displayedText: bootText, isComplete: bootComplete } = useTypingEffect(
    bootSequence.join("\n"),
    50,
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
    "help",
    "about",
    "skills",
    "projects",
    "experience",
    "github",
    "contact",
    "resume",
    "clear",
    "game",
    "matrix",
    "theme",
    "blog",
    "whoami",
    "date",
    "uptime",
    "monitor",
    "sudo",
    "curl",
    "download",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentInput(value);
    if (value) {
      const matches = availableCommands.filter((cmd) =>
        cmd.startsWith(value.toLowerCase()),
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
      output: processCommand(cmd),
    };
    setCommandHistory((prev) => [...prev, newCommand]);
    setCurrentInput("");
    setSuggestions([]);
    setHistoryIndex(-1);
  };

  const processCommand = (cmd: string): string => {
    const [command, ...args] = cmd.toLowerCase().trim().split(" ");
    switch (command) {
      case "help":
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

      case "matrix":
        setMatrixMode(true);
        setCurrentTheme("matrix");
        return 'Entering the Matrix... Type "exit" to return.';
      case "exit":
        if (matrixMode) {
          setMatrixMode(false);
          setCurrentTheme("standard");
          return "Exiting Matrix mode.";
        }
        return 'Unknown command. Type "help" for options.';

      default:
        return `bash: ${command}: command not found
Did you mean one of these?
${availableCommands
  .filter((cmd) => cmd.includes(command.charAt(0)))
  .slice(0, 3)
  .map((cmd) => `  ${cmd}`)
  .join("\n")}
Type "help" for available commands.`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (currentInput.trim()) {
        executeCommand(currentInput.trim());
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setCurrentInput(suggestions[0]);
        setSuggestions([]);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (
        commandHistory.length > 0 &&
        historyIndex < commandHistory.length - 1
      ) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(
          commandHistory[commandHistory.length - 1 - newIndex].input,
        );
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(
          commandHistory[commandHistory.length - 1 - newIndex].input,
        );
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    }
  };

  if (!isBooted) {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center">
        <div className="w-full max-w-4xl p-8">
          <div className="mb-8 text-center">
            <div className="text-6xl mb-4">⚡</div>
            <h1 className="text-2xl mb-2 text-green-300">SECURE TERMINAL</h1>
            <div className="w-48 h-2 bg-gray-800 rounded mx-auto"></div>
          </div>
          <pre className="text-sm leading-relaxed whitespace-pre-wrap">
            {bootText}
            <span className="ml-1">█</span>
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {matrixMode && <MatrixRain />}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent" />
      </div>

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
        <div className="mb-4 border-b border-green-400/30 pb-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl text-green-300">root@portfolio:~$ █</h1>
            <div className="text-xs text-green-400/70">
              {new Date().toLocaleString()} | v3.0.0 | Theme: {currentTheme}
            </div>
          </div>
        </div>

        <div ref={terminalRef} className="h-96 overflow-y-auto mb-4">
          {commandHistory.map((command, index) => (
            <TerminalOutput key={index} command={command} />
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-green-300">user@terminal:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-green-400"
            placeholder="Enter command..."
            spellCheck={false}
          />
          <span>█</span>
        </div>

        {suggestions.length > 0 && (
          <div className="mt-2 text-sm text-green-400/70">
            <span>Suggestions: </span>
            {suggestions.map((suggestion) => (
              <span
                key={suggestion}
                className="mr-4 hover:text-green-400 cursor-pointer"
              >
                {suggestion}
              </span>
            ))}
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 bg-green-400/10 border-t border-green-400/30 p-2 text-xs">
          <div className="flex justify-between items-center">
            <span>
              Status: Online | Commands: {commandHistory.length} | Theme:{" "}
              {currentTheme}
            </span>
            <span>Press Tab for auto-completion | ↑/↓ for history</span>
          </div>
        </div>
      </div>
    </div>
  );
};
