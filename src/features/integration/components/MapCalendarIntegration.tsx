import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Map } from 'lucide-react';
import { DynamicMap } from '../../map/components/DynamicMap';
import { CalendarContainer } from '../../calendar/components/CalendarContainer';
import { useMapData } from '../../map/hooks/useMapData';
import { useCalendarEvents } from '../../calendar/hooks/useCalendarEvents';
import { useViewTransition } from '../hooks/useViewTransition';
import { useViewSync } from '../hooks/useViewSync';
import { EventSyncIndicator } from './EventSyncIndicator';

export const MapCalendarIntegration: React.FC = () => {
  const [view, setView] = useState<'map' | 'calendar'>('map');
  const { visibleEvents, updateVisibleEvents } = useMapData();
  const { events: calendarEvents } = useCalendarEvents();
  const { selectedEvent, handleEventSelect } = useViewTransition();
  const { syncViews, syncing, lastSynced } = useViewSync();

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
            <DynamicMap 
              selectedEvent={selectedEvent}
              onEventSelect={handleEventSelect}
            />
          </motion.div>
        ) : (
          <motion.div
            key="calendar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <CalendarContainer 
              selectedEvent={selectedEvent}
              onEventSelect={handleEventSelect}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleViewToggle}
        className="absolute top-4 right-4 z-10 bg-fjs-gold text-black px-4 py-2 
                   rounded-lg font-medium flex items-center space-x-2"
        aria-label={`Switch to ${view === 'map' ? 'Calendar' : 'Map'} View`}
      >
        {view === 'map' ? (
          <>
            <Calendar className="w-5 h-5" />
            <span>Calendar View</span>
          </>
        ) : (
          <>
            <Map className="w-5 h-5" />
            <span>Map View</span>
          </>
        )}
      </motion.button>

      <EventSyncIndicator 
        syncing={syncing}
        lastSynced={lastSynced}
      />
    </div>
  );
};