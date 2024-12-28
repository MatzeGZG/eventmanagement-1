import React, { Suspense, useState } from 'react';
import { Loader } from 'lucide-react';
import { DynamicMap } from './DynamicMap';
import { MapControls } from './controls/MapControls';
import { FloatingCalendarButton } from './calendar/FloatingCalendarButton';
import { CalendarPanel } from './calendar/CalendarPanel';
import { useMapData } from '../hooks/useMapData';
import { useMapStyle } from '../hooks/useMapStyle';

const MapContainer: React.FC = () => {
  const { loading } = useMapData();
  const { currentStyle, getStyleUrl } = useMapStyle();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleMapClick = () => {
    if (isCalendarOpen) {
      setIsCalendarOpen(false);
    }
  };

  if (!import.meta.env.VITE_MAPBOX_TOKEN) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center bg-black">
        <p className="text-fjs-gold">Mapbox token not configured</p>
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100vh-4rem)] bg-black">
      <Suspense fallback={
        <div className="h-full flex items-center justify-center">
          <Loader className="w-8 h-8 text-fjs-gold animate-spin" />
        </div>
      }>
        <div onClick={handleMapClick} className="h-full">
          <DynamicMap mapStyle={getStyleUrl(currentStyle)} />
        </div>
        <MapControls />
        <FloatingCalendarButton onClick={() => setIsCalendarOpen(true)} />
        <CalendarPanel 
          isOpen={isCalendarOpen} 
          onClose={() => setIsCalendarOpen(false)} 
        />
      </Suspense>
    </div>
  );
};

export { MapContainer };