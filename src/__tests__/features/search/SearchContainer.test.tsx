```typescript
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchContainer } from '../../../features/search/components/SearchContainer';
import { renderWithProviders } from '../../../utils/testing/renderWithProviders';
import { useTestStore } from '../../../utils/testing/hooks/useTestStore';

describe('SearchContainer', () => {
  const { resetStore, populateEvents } = useTestStore();

  beforeEach(() => {
    resetStore();
  });

  it('handles search input', async () => {
    renderWithProviders(<SearchContainer />);
    const input = screen.getByPlaceholderText(/search/i);
    
    await userEvent.type(input, 'tech');
    expect(screen.getByText(/tech events/i)).toBeInTheDocument();
  });

  it('shows search suggestions', async () => {
    renderWithProviders(<SearchContainer />);
    const input = screen.getByPlaceholderText(/search/i);
    
    await userEvent.type(input, 'tech');
    expect(screen.getByText(/tech events near me/i)).toBeInTheDocument();
  });

  it('filters results by category', async () => {
    renderWithProviders(<SearchContainer />);
    const filterButton = screen.getByRole('button', { name: /filter/i });
    
    await userEvent.click(filterButton);
    await userEvent.click(screen.getByText(/tech/i));
    
    expect(screen.getByText(/tech events/i)).toBeInTheDocument();
  });
});
```