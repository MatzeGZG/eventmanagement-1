import React from 'react';
import { Map as MapIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export type MapStyle = 'dark' | 'light' | 'satellite' | 'streets';

interface MapStyleControlProps {
  currentStyle: MapStyle;
  onStyleChange: (style: MapStyle) => void;
}

export const MapStyleControl: React.FC<MapStyleControlProps> = ({
  currentStyle,
  onStyleChange
}) => {
  const styles: Array<{ id: MapStyle; label: string }> = [
    { id: 'dark', label: 'Dark' },
    { id: 'light', label: 'Light' },
    { id: 'satellite', label: 'Satellite' },
    { id: 'streets', label: 'Streets' }
  ];

  return (
    <div className="absolute top-4 right-4 bg-black/90 rounded-lg p-2">
      <div className="flex items-center space-x-2">
        <MapIcon className="w-5 h-5 text-fjs-gold" />
        {styles.map(style => (
          <motion.button
            key={style.id}
            onClick={() => onStyleChange(style.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              currentStyle === style.id
                ? 'bg-fjs-gold text-black'
                : 'text-fjs-silver hover:bg-fjs-charcoal'
            }`}
          >
            {style.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};