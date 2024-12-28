import React, { Suspense } from 'react';
import { Loader } from 'lucide-react';
import { useMapData } from '../hooks/useMapData';
import { useMapInteractions } from '../hooks/useMapInteractions';
import MapComponent from './MapComponent';
import MapControls from './controls/MapControls';
import EventMarkers from './markers/EventMarkers';

const LoadingFallback = () => (
  <div className="h-[600px] flex items-center justify-center bg-black">
    <Loader className="w-8 h-8 text-fjs-gold animate-spin" />
  </div>
);

export const DynamicEventMap: React.FC = () => {
  const { loading, visibleEvents, updateVisibleEvents } = useMapData();
  const { viewState, selectedItem, handleViewStateChange, handleMarkerClick, handlePopupClose } = useMapInteractions();

  if (loading) {
    return <LoadingFallback />;
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <MapComponent
        viewState={viewState}
        onViewStateChange={handleViewStateChange}
        onBoundsChange={updateVisibleEvents}
      >
        <EventMarkers
          events={visibleEvents}
          onMarkerClick={handleMarkerClick}
          selectedEvent={selectedItem}
          onPopupClose={handlePopupClose}
        />
        <MapControls />
      </MapComponent>
    </Suspense>
  );
};