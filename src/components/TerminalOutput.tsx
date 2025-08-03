import React from 'react';
import { Command } from '../types';

interface TerminalOutputProps {
  command: Command;
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ command }) => {
  return (
    <div className="mb-4 font-mono">
      {/* Command input line */}
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-green-300 glow">user@terminal:~$</span>
        <span className="text-white">{command.input}</span>
        <span className="text-green-400/50 text-xs">({command.timestamp})</span>
      </div>
      
      {/* Command output */}
      {command.output && (
        <div className="ml-4 pl-4 border-l-2 border-green-400/30">
          <pre className="whitespace-pre-wrap text-green-400 text-sm leading-relaxed">
            {command.output}
          </pre>
        </div>
      )}
    </div>
  );
};