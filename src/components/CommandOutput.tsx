import React from "react";

interface CommandOutputProps {
  children: React.ReactNode;
  className?: string;
}

export const CommandOutput: React.FC<CommandOutputProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`mt-2 p-3 bg-gray-900/30 rounded-lg border border-gray-700 text-sm ${className}`}
    >
      {children}
    </div>
  );
};
