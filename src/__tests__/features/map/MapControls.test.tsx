```typescript
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MapControls } from '../../../features/map/components/controls/MapControls';
import { renderWithProviders } from '../../../utils/testing/renderWithProviders';

describe('MapControls', () => {
  it('handles category filter changes', async () => {
    const onFilterChange = vi.fn();
    renderWithProviders(
      <MapControls 
        filters={{
          categories: [],
          maxDistance: 10
        }}
        onFiltersChange={onFilterChange}
      />
    );

    const techButton = screen.getByRole('button', { name: /tech/i });
    await userEvent.click(techButton);

    expect(onFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({
        categories: ['Tech']
      })
    );
  });

  it('updates distance filter', async () => {
    const onFilterChange = vi.fn();
    renderWithProviders(
      <MapControls 
        filters={{
          categories: [],
          maxDistance: 10
        }}
        onFiltersChange={onFilterChange}
      />
    );

    const slider = screen.getByRole('slider');
    await userEvent.type(slider, '20');

    expect(onFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({
        maxDistance: 20
      })
    );
  });

  it('displays current filter values', () => {
    renderWithProviders(
      <MapControls 
        filters={{
          categories: ['Tech'],
          maxDistance: 15
        }}
        onFiltersChange={() => {}}
      />
    );

    const techButton = screen.getByRole('button', { name: /tech/i });
    expect(techButton).toHaveClass('bg-fjs-gold');
    expect(screen.getByText('15 km')).toBeInTheDocument();
  });
});
```