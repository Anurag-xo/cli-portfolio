import React from 'react';

interface GitHubStatsData {
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
}

interface GitHubStatsProps {
  stats: GitHubStatsData;
}

export const GitHubStats: React.FC<GitHubStatsProps> = ({ stats }) => {
  return (
    <div>
      <h2 className="text-xl font-bold">GitHub Stats</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="border p-4 rounded-lg">
          <h3 className="font-bold">Followers</h3>
          <p>{stats.followers}</p>
        </div>
        <div className="border p-4 rounded-lg">
          <h3 className="font-bold">Following</h3>
          <p>{stats.following}</p>
        </div>
        <div className="border p-4 rounded-lg">
          <h3 className="font-bold">Public Repos</h3>
          <p>{stats.public_repos}</p>
        </div>
        <div className="border p-4 rounded-lg">
          <h3 className="font-bold">Public Gists</h3>
          <p>{stats.public_gists}</p>
        </div>
      </div>
    </div>
  );
};
