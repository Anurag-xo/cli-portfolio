import React, { useState, useEffect } from 'react';
import { system } from '../data/system';

const StatBar = ({ name, value, max }: { name: string; value: number; max: number }) => (
  <div className="flex items-center">
    <span className="w-16">{name}</span>
    <div className="w-full bg-gray-700 rounded-full h-2.5">
      <div
        className="bg-green-500 h-2.5 rounded-full"
        style={{ width: `${(value / max) * 100}%` }}
      ></div>
    </div>
    <span className="ml-2">{value}%</span>
  </div>
);

export const SystemMonitor: React.FC = () => {
  const [cpu, setCpu] = useState(0);
  const [mem, setMem] = useState(0);
  const [disk, setDisk] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(Math.floor(system.cpu.base + Math.random() * system.cpu.variation));
      setMem(Math.floor(system.mem.base + Math.random() * system.mem.variation));
      setDisk(Math.floor(system.disk.base + Math.random() * system.disk.variation));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">System Monitor</h2>
      <div className="mt-4 space-y-2">
        <StatBar name="CPU" value={cpu} max={100} />
        <StatBar name="Memory" value={mem} max={100} />
        <StatBar name="Disk" value={disk} max={100} />
      </div>
    </div>
  );
};
