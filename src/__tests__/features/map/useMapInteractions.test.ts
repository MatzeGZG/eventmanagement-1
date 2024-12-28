```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMapInteractions } from '../../../features/map/hooks/useMapInteractions';
import { useTestLocation } from '../../../utils/testing/hooks/useTestLocation';
import { createMockEvent } from '../../../utils/testing/fixtures/eventFixtures';

describe('useMapInteractions', () => {
  const { mockGeolocation } = useTestLocation();

  beforeEach(() => {
    mockGeolocation();
  });

  it('initializes with default view state', () => {
    const { result } = renderHook(() => useMapInteractions());
    
    expect(result.current.viewState).toEqual(
      expect.objectContaining({
        zoom: 11,
        bearing: 0,
        pitch: 0
      })
    );
  });

  it('handles view state changes', () => {
    const { result } = renderHook(() => useMapInteractions());

    act(() => {
      result.current.handleViewStateChange({
        latitude: 0,
        longitude: 0,
        zoom: 12,
        bearing: 0,
        pitch: 0
      });
    });

    expect(result.current.viewState.zoom).toBe(12);
  });

  it('manages selected item state', () => {
    const { result } = renderHook(() => useMapInteractions());
    const event = createMockEvent();

    act(() => {
      result.current.handleMarkerClick(event);
    });

    expect(result.current.selectedItem).toBe(event);

    act(() => {
      result.current.handlePopupClose();
    });

    expect(result.current.selectedItem).toBeNull();
  });
});
```