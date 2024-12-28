import React from 'react';
import { Map, Users } from 'lucide-react';
import { MapControlButton } from './MapControlButton';
import { useMapContext } from '../../../contexts/MapContext';

export const MapControlsContainer: React.FC = () => {
  const { currentView, setCurrentView } = useMapContext();

  const controls = [
    { view: 'events', icon: Map, label: 'Events' },
    { view: 'users', icon: Users, label: 'Users' }
  ] as const;

  return (
    <div className="absolute top-4 right-4 z-10 bg-black/90 rounded-lg shadow-lg p-2 flex space-x-2">
      {controls.map(({ view, icon, label }) => (
        <MapControlButton
          key={view}
          icon={icon}
          label={label}
          active={currentView === view}
          onClick={() => setCurrentView(view)}
        />
      ))}
    </div>
  );
};