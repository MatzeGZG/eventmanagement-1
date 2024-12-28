```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCalendarEvents } from '../../../features/calendar/hooks/useCalendarEvents';
import { useTestStore } from '../../../utils/testing/hooks/useTestStore';
import { createMockEvent } from '../../../utils/testing/fixtures/eventFixtures';

describe('useCalendarEvents', () => {
  const { resetStore, populateEvents, setUser } = useTestStore();

  beforeEach(() => {
    resetStore();
  });

  it('filters events for current user', () => {
    const user = { id: '1', name: 'Test User' };
    const events = [
      createMockEvent({ attendees: [user.id] }),
      createMockEvent({ attendees: ['other-user'] })
    ];

    setUser(user as any);
    populateEvents(events);

    const { result } = renderHook(() => useCalendarEvents(true));
    expect(result.current.events).toHaveLength(1);
  });

  it('handles loading state', () => {
    const { result } = renderHook(() => useCalendarEvents());
    expect(result.current.loading).toBe(true);
  });

  it('returns all events when not filtered', () => {
    const events = [createMockEvent(), createMockEvent()];
    populateEvents(events);

    const { result } = renderHook(() => useCalendarEvents(false));
    expect(result.current.events).toHaveLength(2);
  });
});
```