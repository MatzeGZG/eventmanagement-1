import React, { Suspense, useState } from 'react';
import { Loader } from 'lucide-react';
import { DynamicMap } from './DynamicMap';
import { MapControls } from './controls/MapControls';
import { FloatingCalendarButton } from './FloatingCalendarButton';
import { CalendarPanel } from './CalendarPanel';
import { useMapData } from '../../features/map/hooks/useMapData';

export const MapContainer: React.FC = () => {
  const { loading } = useMapData();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  if (!import.meta.env.VITE_MAPBOX_TOKEN) {
    return (
      <div className="h-[600px] flex items-center justify-center bg-black rounded-xl">
        <p className="text-fjs-gold">Mapbox token not configured</p>
      </div>
    );
  }

  return (
    <div className="relative h-[600px] bg-black rounded-xl overflow-hidden">
      <Suspense fallback={
        <div className="h-full flex items-center justify-center">
          <Loader className="w-8 h-8 text-fjs-gold animate-spin" />
        </div>
      }>
        <DynamicMap />
        <MapControls />
        <FloatingCalendarButton onClick={() => setIsCalendarOpen(true)} />
        <CalendarPanel isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
      </Suspense>
    </div>
  );
};