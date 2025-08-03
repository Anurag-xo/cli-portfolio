import React from 'react';

interface GitHubStatsProps {
  username: string;
}

export const GitHubStats: React.FC<GitHubStatsProps> = ({ username }) => {
  return (
    <div className="bg-gray-900 border border-green-400/30 rounded p-4 font-mono text-sm">
      <div className="text-green-300 mb-2">📊 GitHub Statistics</div>
      
      {/* Contribution Graph */}
      <div className="mb-4">
        <div className="text-xs text-green-400/70 mb-2">Contribution Graph (2024)</div>
        <div className="grid grid-cols-53 gap-1">
          {Array.from({ length: 371 }, (_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-sm ${
                Math.random() > 0.7 
                  ? 'bg-green-400' 
                  : Math.random() > 0.5 
                  ? 'bg-green-400/60' 
                  : Math.random() > 0.3 
                  ? 'bg-green-400/30' 
                  : 'bg-gray-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <div className="text-green-400">Public Repos: 47</div>
          <div className="text-green-400">Stars: 1,247</div>
          <div className="text-green-400">Followers: 523</div>
        </div>
        <div>
          <div className="text-green-400">Contributions: 1,847</div>
          <div className="text-green-400">Streak: 127 days</div>
          <div className="text-green-400">PRs: 234</div>
        </div>
      </div>
    </div>
  );
};