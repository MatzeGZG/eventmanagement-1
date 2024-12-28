import React from 'react';
import { motion } from 'framer-motion';
import { ViewMode } from '../types';
import { ViewportOptimizer } from '../../../utils/performance/viewportOptimizer';
import { DynamicMap } from '../../map/components/DynamicMap';
import { CalendarContainer } from '../../calendar/components/CalendarContainer';
import { EventList } from '../../events/components/EventList';

interface ViewRendererProps {
  view: ViewMode;
  selectedEventId?: string;
  onEventSelect: (eventId: string) => void;
}

export const ViewRenderer = React.memo<ViewRendererProps>(({
  view,
  selectedEventId,
  onEventSelect
}) => {
  const viewComponents = {
    map: DynamicMap,
    calendar: CalendarContainer,
    list: EventList
  };

  const Component = viewComponents[view];

  return (
    <motion.div
      key={view}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0"
      role="region"
      aria-label={`${view} view`}
    >
      <Component
        selectedEventId={selectedEventId}
        onEventSelect={onEventSelect}
      />
    </motion.div>
  );
});

ViewRenderer.displayName = 'ViewRenderer';