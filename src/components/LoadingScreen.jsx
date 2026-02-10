import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-obsidian z-[9999] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 size={32} className="text-bronze animate-spin" strokeWidth={1} />
        <span className="text-[10px] uppercase tracking-[0.3em] text-ash animate-pulse">
          Loading Atelier...
        </span>
      </div>
    </div>
  );
};

export default LoadingScreen;