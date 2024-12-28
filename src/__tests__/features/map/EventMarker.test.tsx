```typescript
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EventMarker } from '../../../components/map/markers/EventMarker';
import { renderWithProviders } from '../../../utils/testing/renderWithProviders';
import { createMockEvent } from '../../../utils/testing/fixtures/eventFixtures';

describe('EventMarker', () => {
  it('renders marker with correct styling', () => {
    const event = createMockEvent();
    const onClick = vi.fn();

    renderWithProviders(
      <EventMarker 
        event={event}
        onClick={onClick}
        isHot={false}
      />
    );

    const marker = screen.getByRole('button');
    expect(marker).toHaveClass('text-fjs-silver');
  });

  it('shows hot event indicator', () => {
    const event = createMockEvent();
    renderWithProviders(
      <EventMarker 
        event={event}
        onClick={() => {}}
        isHot={true}
      />
    );

    const marker = screen.getByRole('button');
    expect(marker).toHaveClass('text-fjs-gold');
    expect(screen.getByTestId('hot-indicator')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const event = createMockEvent();
    const onClick = vi.fn();

    renderWithProviders(
      <EventMarker 
        event={event}
        onClick={onClick}
        isHot={false}
      />
    );

    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledWith(event);
  });
});
```