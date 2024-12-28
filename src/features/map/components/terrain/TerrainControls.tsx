import React from 'react';
import { Mountain } from 'lucide-react';

interface TerrainControlsProps {
  enabled: boolean;
  onToggle: () => void;
  exaggeration: number;
  onExaggerationChange: (value: number) => void;
}

export const TerrainControls: React.FC<TerrainControlsProps> = ({
  enabled,
  onToggle,
  exaggeration,
  onExaggerationChange
}) => {
  return (
    <div className="absolute bottom-16 right-4 bg-black/80 rounded-lg p-2 space-y-2">
      <button
        onClick={onToggle}
        className={`p-2 rounded-lg transition-colors ${
          enabled ? 'bg-fjs-gold text-black' : 'text-fjs-gold hover:bg-fjs-charcoal'
        }`}
        title="Toggle terrain"
      >
        <Mountain className="w-5 h-5" />
      </button>
      
      {enabled && (
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={exaggeration}
          onChange={(e) => onExaggerationChange(Number(e.target.value))}
          className="w-24 accent-fjs-gold"
          title="Terrain exaggeration"
        />
      )}
    </div>
  );
};