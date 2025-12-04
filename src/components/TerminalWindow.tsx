
import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';
import { Terminal } from './Terminal';
import { Minimize, Maximize, X } from 'lucide-react';

export const TerminalWindow: React.FC = () => {
  const nodeRef = useRef(null);
  return (
    <Draggable handle=".handle" nodeRef={nodeRef}>
      <Resizable
        ref={nodeRef}
        defaultSize={{
          width: 800,
          height: 600,
        }}
        minWidth={400}
        minHeight={300}
        className="shadow-lg"
        style={{
          border: '1px solid var(--border)',
          borderRadius: '8px',
          background: 'var(--background)',
        }}
      >
        <div className="handle w-full h-8 bg-header flex items-center justify-between px-2" style={{ borderRadius: '8px 8px 0 0', cursor: 'move' }}>
          <div className="flex items-center space-x-2">
            <button className="w-3 h-3 bg-red-500 rounded-full" />
            <button className="w-3 h-3 bg-yellow-500 rounded-full" />
            <button className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
          <div className="text-sm text-secondary">Anurag's Portfolio</div>
          <div className="flex items-center space-x-2">
            <Minimize size={16} className="text-secondary" />
            <Maximize size={16} className="text-secondary" />
            <X size={16} className="text-secondary" />
          </div>
        </div>
        <div className="p-4 h-full overflow-y-auto">
          <Terminal />
        </div>
      </Resizable>
    </Draggable>
  );
};
