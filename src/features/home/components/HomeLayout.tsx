import React from 'react';
import { useLocation } from '../../../hooks/useLocation';
import { useStore } from '../../../store';
import { MapSection } from './sections/MapSection';
import { ContentSections } from './sections/ContentSections';
import { ErrorBoundary } from '../../../components/common/ErrorBoundary';

export const HomeLayout: React.FC = () => {
  const { coordinates } = useLocation();
  const showMyEvents = useStore(state => state.showMyEvents);
  const user = useStore(state => state.user);

  return (
    <div className="min-h-screen bg-black">
      <ErrorBoundary>
        <MapSection 
          coordinates={coordinates}
          showMyEvents={showMyEvents}
          userId={user?.id}
        />
        <ContentSections userId={user?.id} />
      </ErrorBoundary>
    </div>
  );
};