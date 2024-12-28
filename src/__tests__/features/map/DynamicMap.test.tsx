```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { DynamicMap } from '../../../features/map/components/DynamicMap';
import { renderWithProviders } from '../../../utils/testing/renderWithProviders';
import { useTestLocation } from '../../../utils/testing/hooks/useTestLocation';

describe('DynamicMap', () => {
  const { mockGeolocation } = useTestLocation();

  beforeEach(() => {
    mockGeolocation();
  });

  it('renders map controls', () => {
    renderWithProviders(<DynamicMap />);
    expect(screen.getByRole('button', { name: /zoom in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /zoom out/i })).toBeInTheDocument();
  });

  it('handles missing Mapbox token', () => {
    vi.stubEnv('VITE_MAPBOX_TOKEN', '');
    renderWithProviders(<DynamicMap />);
    expect(screen.getByText(/mapbox token not configured/i)).toBeInTheDocument();
  });

  it('renders with custom initial view state', () => {
    const initialViewState = {
      latitude: 0,
      longitude: 0,
      zoom: 10
    };

    renderWithProviders(
      <DynamicMap initialViewState={initialViewState} />
    );

    // Verify map initialized with correct view state
    const map = screen.getByTestId('map-container');
    expect(map).toHaveAttribute('data-latitude', '0');
    expect(map).toHaveAttribute('data-longitude', '0');
    expect(map).toHaveAttribute('data-zoom', '10');
  });
});
```