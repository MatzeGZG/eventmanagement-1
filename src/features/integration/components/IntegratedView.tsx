```typescript
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Map, List } from 'lucide-react';
import { DynamicMap } from '../../map/components/DynamicMap';
import { CalendarContainer } from '../../calendar/components/CalendarContainer';
import { EventList } from '../../events/components/EventList';
import { ViewControls } from '../../map/components/controls/ViewControls';
import { useViewTransition } from '../hooks/useViewTransition';
import { useViewSync } from '../hooks/useViewSync';

type ViewMode = 'map' | 'calendar' | 'list';

export const IntegratedView: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('map');
  const { selectedEvent, transitioning, handleEventSelect, handleTransitionComplete } = useViewTransition();
  const { syncViews, optimizeViewRendering } = useViewSync();

  const handleViewChange = useCallback((view: ViewMode) => {
    setCurrentView(view);
    handleTransitionComplete();
  }, [handleTransitionComplete]);

  return (
    <div className="relative h-[calc(100vh-4rem)] bg-black">
      <ViewControls 
        currentView={currentView}
        onViewChange={handleViewChange}
      />

      <AnimatePresence mode="wait">
        {currentView === 'map' && (
          <motion.div
            key="map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <DynamicMap 
              onEventSelect={handleEventSelect}
              selectedEvent={selectedEvent}
            />
          </motion.div>
        )}

        {currentView === 'calendar' && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <CalendarContainer 
              onEventSelect={handleEventSelect}
              selectedEvent={selectedEvent}
            />
          </motion.div>
        )}

        {currentView === 'list' && (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 overflow-auto"
          >
            <EventList 
              onEventSelect={handleEventSelect}
              selectedEvent={selectedEvent}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Buttons */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <FloatingButton
          icon={Map}
          label="Map"
          active={currentView === 'map'}
          onClick={() => handleViewChange('map')}
        />
        <FloatingButton
          icon={Calendar}
          label="Calendar"
          active={currentView === 'calendar'}
          onClick={() => handleViewChange('calendar')}
        />
        <FloatingButton
          icon={List}
          label="List"
          active={currentView === 'list'}
          onClick={() => handleViewChange('list')}
        />
      </div>
    </div>
  );
};

interface FloatingButtonProps {
  icon: React.FC<any>;
  label: string;
  active: boolean;
  onClick: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  icon: Icon,
  label,
  active,
  onClick
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`
      flex items-center space-x-2 px-4 py-2 rounded-lg font-medium
      transition-colors shadow-lg
      ${active 
        ? 'bg-fjs-gold text-black' 
        : 'bg-fjs-charcoal text-fjs-gold hover:bg-black/40'
      }
    `}
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </motion.button>
);
```