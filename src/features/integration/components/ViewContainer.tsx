```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { useViewTransition } from '../hooks/useViewTransition';
import { ViewControls } from './ViewControls';
import { ViewContent } from './ViewContent';
import { ViewActions } from './ViewActions';
import { EventSyncIndicator } from './EventSyncIndicator';
import { useIntegratedView } from '../hooks/useIntegratedView';
import { KeyboardNavigation } from '../../../utils/accessibility/keyboardNavigation';

export const ViewContainer: React.FC = () => {
  const { currentView, handleViewChange } = useViewTransition();
  const { syncing, lastSynced, selectedEvent, handleEventSelect } = useIntegratedView();

  // Initialize keyboard navigation
  React.useEffect(() => {
    const container = document.getElementById('view-container');
    if (container) {
      KeyboardNavigation.init(container);
    }
  }, []);

  return (
    <div 
      id="view-container"
      className="relative h-[calc(100vh-4rem)] bg-black"
      role="region"
      aria-label={`${currentView} view`}
    >
      <ViewControls 
        currentView={currentView}
        onViewChange={handleViewChange}
      />

      <ViewContent
        view={currentView}
        selectedEvent={selectedEvent}
        onEventSelect={handleEventSelect}
      />

      <ViewActions view={currentView} />
      
      <EventSyncIndicator 
        syncing={syncing}
        lastSynced={lastSynced}
      />
    </div>
  );
};
```