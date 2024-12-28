```typescript
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GroupDiscovery } from '../../../features/social/components/GroupDiscovery';
import { renderWithProviders } from '../../../utils/testing/renderWithProviders';

describe('GroupDiscovery', () => {
  it('renders search and filters', () => {
    renderWithProviders(<GroupDiscovery />);
    expect(screen.getByPlaceholderText(/search groups/i)).toBeInTheDocument();
    expect(screen.getByText(/discover groups/i)).toBeInTheDocument();
  });

  it('handles group search', async () => {
    renderWithProviders(<GroupDiscovery />);
    const searchInput = screen.getByPlaceholderText(/search groups/i);
    
    await userEvent.type(searchInput, 'tech');
    expect(screen.getByText(/tech enthusiasts/i)).toBeInTheDocument();
  });

  it('shows relevance scores', () => {
    renderWithProviders(<GroupDiscovery />);
    expect(screen.getByText(/90% match/i)).toBeInTheDocument();
  });

  it('allows group creation', async () => {
    renderWithProviders(<GroupDiscovery />);
    await userEvent.click(screen.getByText(/create group/i));
    expect(screen.getByText(/new group/i)).toBeInTheDocument();
  });
});
```