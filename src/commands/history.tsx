
import React from 'react';

export const history = (
  commandHistory: { input: string; output: React.ReactNode }[]
): React.ReactNode => (
  <div>
    {commandHistory.map((command, index) => (
      <div key={index}>
        <span>{index + 1}</span>
        <span className="ml-2">{command.input}</span>
      </div>
    ))}
  </div>
);
