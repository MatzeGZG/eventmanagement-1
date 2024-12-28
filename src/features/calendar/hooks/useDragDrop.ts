```typescript
import { useState, useCallback } from 'react';
import { Event } from '../../../types/event';
import { useStore } from '../../../store';
import { usePoints } from '../../../hooks/usePoints';

interface DragState {
  event: Event | null;
  sourceDate: Date | null;
}

export const useDragDrop = () => {
  const [dragState, setDragState] = useState<DragState>({
    event: null,
    sourceDate: null
  });
  const updateEvent = useStore(state => state.updateEvent);
  const { awardPoints } = usePoints();

  const handleDragStart = useCallback((event: Event) => {
    setDragState({
      event,
      sourceDate: event.date
    });
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-fjs-charcoal/50');
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.currentTarget.classList.remove('bg-fjs-charcoal/50');
  }, []);

  const handleDrop = useCallback((targetDate: Date, e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-fjs-charcoal/50');

    if (!dragState.event) return;

    const updatedEvent = {
      ...dragState.event,
      date: targetDate
    };

    updateEvent(updatedEvent);
    awardPoints(5); // Award points for calendar organization

    setDragState({ event: null, sourceDate: null });
  }, [dragState, updateEvent, awardPoints]);

  return {
    dragState,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop
  };
};
```