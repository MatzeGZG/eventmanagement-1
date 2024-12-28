import React from 'react';
import { Layers, Map as MapIcon, Activity } from 'lucide-react';

interface LayerControlsProps {
  layers: {
    clusters: boolean;
    heatmap: boolean;
    terrain: boolean;
  };
  onLayerToggle: (layer: keyof typeof layers) => void;
}

export const LayerControls: React.FC<LayerControlsProps> = ({
  layers,
  onLayerToggle
}) => {
  return (
    <div className="absolute top-4 right-16 bg-black/80 rounded-lg p-2 space-y-2">
      <button
        onClick={() => onLayerToggle('clusters')}
        className={`p-2 rounded-lg transition-colors ${
          layers.clusters ? 'bg-fjs-gold text-black' : 'text-fjs-gold hover:bg-fjs-charcoal'
        }`}
        title="Toggle clustering"
      >
        <Layers className="w-5 h-5" />
      </button>

      <button
        onClick={() => onLayerToggle('heatmap')}
        className={`p-2 rounded-lg transition-colors ${
          layers.heatmap ? 'bg-fjs-gold text-black' : 'text-fjs-gold hover:bg-fjs-charcoal'
        }`}
        title="Toggle heatmap"
      >
        <Activity className="w-5 h-5" />
      </button>

      <button
        onClick={() => onLayerToggle('terrain')}
        className={`p-2 rounded-lg transition-colors ${
          layers.terrain ? 'bg-fjs-gold text-black' : 'text-fjs-gold hover:bg-fjs-charcoal'
        }`}
        title="Toggle terrain"
      >
        <MapIcon className="w-5 h-5" />
      </button>
    </div>
  );
};