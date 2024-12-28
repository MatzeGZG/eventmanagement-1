```typescript
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Map } from 'lucide-react';
import { DynamicMap } from '../../map/components/DynamicMap';
import { CalendarContainer } from '../../calendar/components/CalendarContainer';
import { useMapData } from '../../map/hooks/useMapData';
import { useCalendarEvents } from '../../calendar/hooks/useCalendarEvents';

export const CalendarMapView: React.FC = () => {
  const [view, setView] = useState<'map' | 'calendar'>('map');
  const { visibleEvents, updateVisibleEvents } = useMapData();
  const { events: calendarEvents } = useCalendarEvents();

  const handleViewToggle = useCallback(() => {
    setView(prev => prev === 'map' ? 'calendar' : 'map');
  }, []);

  return (
    <div className="relative h-[calc(100vh-4rem)]">
      <AnimatePresence mode="wait">
        {view === 'map' ? (
          <motion.div
            key="map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <DynamicMap />
          </motion.div>
        ) : (
          <motion.div
            key="calendar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <CalendarContainer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleViewToggle}
        className="absolute top-4 right-4 z-10 bg-fjs-gold text-black px-4 py-2 rounded-lg 
                 font-medium flex items-center space-x-2"
      >
        {view === 'map' ? (
          <>
            <Calendar className="w-5 h-5" />
            <span>Switch to Calendar</span>
          </>
        ) : (
          <>
            <Map className="w-5 h-5" />
            <span>Switch to Map</span>
          </>
        )}
      </motion.button>
    </div>
  );
};
```