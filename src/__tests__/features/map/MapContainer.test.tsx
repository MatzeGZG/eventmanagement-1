```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { MapContainer } from '../../../features/map/components/MapContainer';
import { renderWithProviders } from '../../../utils/testing/renderWithProviders';
import { useTestLocation } from '../../../utils/testing/hooks/useTestLocation';
import { useTestStore } from '../../../utils/testing/hooks/useTestStore';
import { createMockEvent } from '../../../utils/testing/fixtures/eventFixtures';

describe('MapContainer', () => {
  const { mockGeolocation } = useTestLocation();
  const { resetStore, populateEvents } = useTestStore();

  beforeEach(() => {
    mockGeolocation();
    resetStore();
  });

  it('shows loading state initially', () => {
    renderWithProviders(<MapContainer />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays events on the map', () => {
    const events = [createMockEvent()];
    populateEvents(events);
    renderWithProviders(<MapContainer />);
    
    // Wait for map to load and verify markers
    expect(screen.getByText(events[0].title)).toBeInTheDocument();
  });

  it('handles missing Mapbox token', () => {
    vi.stubEnv('VITE_MAPBOX_TOKEN', '');
    renderWithProviders(<MapContainer />);
    expect(screen.getByText(/mapbox token not configured/i)).toBeInTheDocument();
  });
});
```