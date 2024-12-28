import React, { Suspense } from 'react';
import { MapContainer } from '../../../map/components/MapContainer';
import { LoadingSpinner } from '../../../../components/common/LoadingSpinner';
import { MyFunToggle } from '../MyFunToggle';

interface MapSectionProps {
  coordinates?: { latitude: number; longitude: number };
  showMyEvents: boolean;
  userId?: string;
}

export const MapSection: React.FC<MapSectionProps> = ({
  coordinates,
  showMyEvents,
  userId
}) => (
  <section className="relative h-[60vh]">
    <Suspense fallback={
      <div className="h-full flex items-center justify-center bg-black">
        <LoadingSpinner size="lg" />
      </div>
    }>
      <MapContainer />
      <div className="absolute top-4 right-4 z-10">
        <MyFunToggle />
      </div>
    </Suspense>
  </section>
);