```typescript
import { useState, useCallback, useRef } from 'react';
import { Event } from '../../../types/event';

interface VirtualizationConfig {
  itemHeight: number;
  overscan: number;
  containerHeight: number;
}

export const useVirtualization = (
  events: Event[],
  config: VirtualizationConfig
) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const getVisibleRange = useCallback(() => {
    const start = Math.floor(scrollTop / config.itemHeight);
    const visibleCount = Math.ceil(config.containerHeight / config.itemHeight);
    const end = start + visibleCount + config.overscan;

    return {
      start: Math.max(0, start - config.overscan),
      end: Math.min(events.length, end + config.overscan)
    };
  }, [scrollTop, config, events.length]);

  const visibleEvents = useCallback(() => {
    const { start, end } = getVisibleRange();
    return events.slice(start, end).map((event, index) => ({
      ...event,
      virtualIndex: start + index
    }));
  }, [events, getVisibleRange]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return {
    visibleEvents: visibleEvents(),
    totalHeight: events.length * config.itemHeight,
    handleScroll,
    scrollRef
  };
};
```