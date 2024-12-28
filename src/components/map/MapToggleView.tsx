import React from 'react';
import { Map, Users } from 'lucide-react';
import { LazyMapView } from './LazyMapView';
import { useMapContext } from '../../contexts/MapContext';

export const MapToggleView: React.FC = () => {
  const { currentView, setCurrentView } = useMapContext();

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10 bg-black rounded-lg shadow-lg p-2 flex space-x-2">
        <button
          onClick={() => setCurrentView('events')}
          className={`p-2 rounded-lg flex items-center ${
            currentView === 'events'
              ? 'bg-fjs-gold text-black'
              : 'text-fjs-gold hover:bg-fjs-charcoal'
          }`}
        >
          <Map className="w-5 h-5 mr-2" />
          <span className="font-medium">Events</span>
        </button>
        <button
          onClick={() => setCurrentView('users')}
          className={`p-2 rounded-lg flex items-center ${
            currentView === 'users'
              ? 'bg-fjs-gold text-black'
              : 'text-fjs-gold hover:bg-fjs-charcoal'
          }`}
        >
          <Users className="w-5 h-5 mr-2" />
          <span className="font-medium">Users</span>
        </button>
      </div>

      <div className="h-[600px] rounded-xl overflow-hidden">
        <LazyMapView />
      </div>
    </div>
  );
};