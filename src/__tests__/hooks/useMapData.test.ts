import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useMapData } from '../../hooks/useMapData';
import { useStore } from '../../store';
import { createMockEvent } from '../../utils/testing/fixtures/eventFixtures';

describe('useMapData', () => {
  beforeEach(() => {
    useStore.setState({ events: [] });
  });

  it('filters events by map bounds', () => {
    const events = [
      createMockEvent({
        location: {
          coordinates: { latitude: 0, longitude: 0 },
          address: 'Test',
          city: 'Test',
          country: 'Test'
        }
      })
    ];
    useStore.setState({ events });

    const { result } = renderHook(() => useMapData());
    const bounds = {
      getSouth: () => -1,
      getNorth: () => 1,
      getWest: () => -1,
      getEast: () => 1
    };

    result.current.updateVisibleEvents(bounds);
    expect(result.current.visibleEvents).toHaveLength(1);
  });
});