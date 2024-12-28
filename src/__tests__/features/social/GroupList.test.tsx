```typescript
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GroupList } from '../../../features/social/components/GroupList';
import { renderWithProviders } from '../../../utils/testing/renderWithProviders';

describe('GroupList', () => {
  const mockGroups = [
    {
      id: '1',
      name: 'Tech Enthusiasts',
      description: 'A group for tech lovers',
      memberCount: 150,
      coverImage: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94'
    },
    {
      id: '2',
      name: 'Music Lovers',
      description: 'Share your passion for music',
      memberCount: 200,
      coverImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622'
    }
  ];

  it('renders group list', () => {
    renderWithProviders(<GroupList />);
    expect(screen.getByText(/tech enthusiasts/i)).toBeInTheDocument();
    expect(screen.getByText(/music lovers/i)).toBeInTheDocument();
  });

  it('displays member counts', () => {
    renderWithProviders(<GroupList />);
    expect(screen.getByText('150 members')).toBeInTheDocument();
    expect(screen.getByText('200 members')).toBeInTheDocument();
  });

  it('handles join group action', async () => {
    const onJoin = vi.fn();
    renderWithProviders(<GroupList onJoinGroup={onJoin} />);
    
    await userEvent.click(screen.getAllByText(/join group/i)[0]);
    expect(onJoin).toHaveBeenCalledWith(mockGroups[0].id);
  });

  it('shows group descriptions', () => {
    renderWithProviders(<GroupList />);
    expect(screen.getByText(/tech lovers/i)).toBeInTheDocument();
    expect(screen.getByText(/passion for music/i)).toBeInTheDocument();
  });
});
```