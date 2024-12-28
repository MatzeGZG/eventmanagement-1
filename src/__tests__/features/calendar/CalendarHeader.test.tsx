```typescript
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalendarHeader } from '../../../components/calendar/layout/CalendarHeader';
import { renderWithProviders } from '../../../utils/testing/renderWithProviders';

describe('CalendarHeader', () => {
  it('displays current month and year', () => {
    const date = new Date('2024-02-14');
    renderWithProviders(
      <CalendarHeader 
        view={{ type: 'month', date }}
        onViewChange={() => {}}
      />
    );

    expect(screen.getByText('February 2024')).toBeInTheDocument();
  });

  it('handles view type changes', async () => {
    const onViewChange = vi.fn();
    renderWithProviders(
      <CalendarHeader 
        view={{ type: 'month', date: new Date() }}
        onViewChange={onViewChange}
      />
    );

    await userEvent.click(screen.getByText('Week'));
    expect(onViewChange).toHaveBeenCalledWith('week');
  });

  it('highlights active view', () => {
    renderWithProviders(
      <CalendarHeader 
        view={{ type: 'month', date: new Date() }}
        onViewChange={() => {}}
      />
    );

    const monthButton = screen.getByText('Month').closest('button');
    expect(monthButton).toHaveClass('bg-fjs-gold');
  });
});
```