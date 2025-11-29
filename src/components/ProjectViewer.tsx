// src/components/ProjectViewer.tsx
import React, { useState } from "react";
import { X, File, Folder } from "lucide-react";
import { projectFiles } from "../data/projectFiles";

interface ProjectViewerProps {
  project: string | null;
  onClose: () => void;
}

export const ProjectViewer: React.FC<ProjectViewerProps> = ({
  project,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<keyof typeof projectFiles>("README.md");

  const tabs = Object.keys(projectFiles) as (keyof typeof projectFiles)[];

  if (!project) return null;

  const fileContent = projectFiles[activeTab](project);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-green-400/30 rounded-lg w-full max-w-6xl h-5/6 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-green-400/30">
          <div className="flex items-center space-x-2">
            <Folder className="w-5 h-5 text-green-400" />
            <span className="text-green-300 font-mono">{project}</span>
          </div>
          <button
            onClick={onClose}
            className="text-green-400 hover:text-green-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex border-b border-green-400/30 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-mono whitespace-nowrap border-r border-green-400/30 transition-colors ${
                activeTab === tab
                  ? "bg-green-400/10 text-green-300"
                  : "text-green-400/70 hover:text-green-400 hover:bg-green-400/5"
              }`}
            >
              <File className="w-4 h-4" />
              <span>{tab}</span>
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-auto p-4">
          <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap leading-relaxed">
            {fileContent}
          </pre>
        </div>
        <div className="p-4 border-t border-green-400/30 text-xs text-green-400/70 font-mono">
          <div className="flex justify-between">
            <span>
              Lines: {fileContent.split("\n").length}
            </span>
            <span>Language: {activeTab.split(".").pop()?.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
