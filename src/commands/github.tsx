import React, { useState, useEffect } from "react";
import { GitHubStats } from "../components/GitHubStats";
import { ICommand } from "../types";
import { CommandOutput } from "../components/CommandOutput";

interface GitHubStatsData {
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
}

const GitHub: React.FC = () => {
  const [stats, setStats] = useState<GitHubStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const githubUsername = import.meta.env.VITE_GITHUB_USERNAME || "Anurag-xo"; // Default to Anurag-xo if not set

    const fetchStats = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${githubUsername}`,
        );

        if (response.status === 404) {
          setError(`GitHub user '${githubUsername}' not found.`);
          return;
        }

        if (response.status === 403) {
          const rateLimitRemaining = response.headers.get(
            "X-RateLimit-Remaining",
          );
          if (rateLimitRemaining === "0") {
            setError("GitHub API rate limit exceeded. Please try again later.");
            return;
          }
        }

        if (!response.ok) {
          setError(`Error fetching GitHub stats: ${response.statusText}`);
          return;
        }

        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError("Network error or unable to fetch GitHub stats.");
        console.error("Error fetching GitHub stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading GitHub stats...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!stats) {
    return <div>Error loading GitHub stats.</div>;
  }

  return <GitHubStats stats={stats} />;
};

export const github: ICommand = {
  name: "github",
  description: "Displays my GitHub stats.",
  execute: () => <GitHub />,
};
