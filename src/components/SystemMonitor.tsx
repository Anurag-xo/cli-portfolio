import React, { useState, useEffect } from 'react';
import { systemMonitorStats } from '../data/systemMonitor';

export const SystemMonitor: React.FC = () => {
  const [stats, setStats] = useState({
    cpu: 78,
    memory: 64,
    disk: 45,
    network: 23
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        cpu: Math.floor(Math.random() * 30) + 60,
        memory: Math.floor(Math.random() * 20) + 50,
        disk: Math.floor(Math.random() * 15) + 40,
        network: Math.floor(Math.random() * 40) + 10
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const ProgressBar: React.FC<{ value: number; label: string; color?: string }> = ({ 
    value, 
    label, 
    color = 'green' 
  }) => {
    const colorVariants = {
      green: 'bg-green-400',
      yellow: 'bg-yellow-400',
      red: 'bg-red-400',
    };
    
    const barColor = colorVariants[color as keyof typeof colorVariants] || colorVariants.green;

    return (
      <div className="mb-2">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-green-400">{label}</span>
          <span className="text-green-300">{value}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div
            className={`${barColor} h-2 rounded-full transition-all duration-500`}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-green-400/30 rounded p-4 font-mono text-sm">
      <div className="text-green-300 mb-4">🖥️ System Monitor</div>
      
      <ProgressBar value={stats.cpu} label="CPU Usage" />
      <ProgressBar value={stats.memory} label="Memory" />
      <ProgressBar value={stats.disk} label="Disk I/O" />
      <ProgressBar value={stats.network} label="Network" />

      <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
        <div>
          <div className="text-green-400">Containers: {systemMonitorStats.containers}</div>
          <div className="text-green-400">Images: {systemMonitorStats.images}</div>
          <div className="text-green-400">Volumes: {systemMonitorStats.volumes}</div>
        </div>
        <div>
          <div className="text-green-400">Pods: {systemMonitorStats.pods}</div>
          <div className="text-green-400">Services: {systemMonitorStats.services}</div>
          <div className="text-green-400">Uptime: {systemMonitorStats.uptime}</div>
        </div>
      </div>
    </div>
  );
};