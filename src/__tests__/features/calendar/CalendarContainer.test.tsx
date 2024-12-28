```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { CalendarContainer } from '../../../features/calendar/components/CalendarContainer';
import { renderWithProviders } from '../../../utils/testing/renderWithProviders';
import { useTestStore } from '../../../utils/testing/hooks/useTestStore';
import { createMockEvent } from '../../../utils/testing/fixtures/eventFixtures';

describe('CalendarContainer', () => {
  const { resetStore, populateEvents } = useTestStore();

  beforeEach(() => {
    resetStore();
  });

  it('renders calendar grid', () => {
    renderWithProviders(<CalendarContainer />);
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('displays events on correct dates', () => {
    const event = createMockEvent();
    populateEvents([event]);
    renderWithProviders(<CalendarContainer />);

    const eventDate = event.date.toLocaleDateString();
    const dateCell = screen.getByText(eventDate);
    expect(dateCell).toBeInTheDocument();
    expect(screen.getByText(event.title)).toBeInTheDocument();
  });

  it('handles empty event list', () => {
    renderWithProviders(<CalendarContainer />);
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });
});
```