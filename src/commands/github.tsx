import React, { useState, useEffect } from 'react';
import { GitHubStats } from '../../components/GitHubStats';

interface GitHubStatsData {
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
}

const GitHub: React.FC = () => {
  const [stats, setStats] = useState<GitHubStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Anurag-xo');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading GitHub stats...</div>;
  }

  if (!stats) {
    return <div>Error loading GitHub stats.</div>;
  }

  return <GitHubStats stats={stats} />;
};

export const github = (): React.ReactNode => {
  return <GitHub />;
};
