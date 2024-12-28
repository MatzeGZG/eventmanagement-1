import React from 'react';
import { MapPin, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export const MapLegend: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="absolute bottom-4 left-4 bg-black/90 rounded-lg p-4 text-white"
    >
      <div className="flex items-center mb-2">
        <Info className="w-4 h-4 text-fjs-gold mr-2" />
        <span className="font-medium">Event Legend</span>
      </div>
      
      <div className="space-y-2">
        <LegendItem color="#EF4444" label="Today/Tomorrow" />
        <LegendItem color="#F59E0B" label="This Week" />
        <LegendItem color="#10B981" label="Upcoming" />
      </div>

      <div className="mt-4 pt-2 border-t border-fjs-charcoal">
        <div className="text-sm text-fjs-silver">Marker size indicates popularity</div>
      </div>
    </motion.div>
  );
};

const LegendItem: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div className="flex items-center">
    <MapPin className="w-4 h-4 mr-2" style={{ color }} />
    <span className="text-sm">{label}</span>
  </div>
);