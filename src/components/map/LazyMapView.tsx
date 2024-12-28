import React, { Suspense } from 'react';
import { Loader } from 'lucide-react';
import { useMapContext } from '../../contexts/MapContext';

const DynamicEventMap = React.lazy(() => import('../../features/map/components/DynamicEventMap'));
const NearbyUsersMap = React.lazy(() => import('./NearbyUsersMap'));

export const LazyMapView: React.FC = () => {
  const { currentView } = useMapContext();

  return (
    <Suspense fallback={
      <div className="h-[600px] flex items-center justify-center bg-black rounded-xl">
        <div className="flex items-center space-x-2 text-fjs-gold">
          <Loader className="w-6 h-6 animate-spin" />
          <span>Loading map...</span>
        </div>
      </div>
    }>
      {currentView === 'events' ? <DynamicEventMap /> : <NearbyUsersMap />}
    </Suspense>
  );
};