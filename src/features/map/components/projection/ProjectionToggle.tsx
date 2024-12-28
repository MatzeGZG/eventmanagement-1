import React from 'react';
import { Globe } from 'lucide-react';

interface ProjectionToggleProps {
  projection: 'globe' | 'mercator';
  onToggle: () => void;
}

export const ProjectionToggle: React.FC<ProjectionToggleProps> = ({
  projection,
  onToggle
}) => {
  return (
    <button
      onClick={onToggle}
      className={`absolute bottom-16 left-4 p-2 bg-black/80 rounded-lg transition-colors ${
        projection === 'globe' ? 'text-fjs-gold' : 'text-fjs-silver'
      }`}
      title="Toggle map projection"
    >
      <Globe className="w-5 h-5" />
    </button>
  );
};