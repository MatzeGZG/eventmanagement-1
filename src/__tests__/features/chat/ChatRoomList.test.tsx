```typescript
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatRoomList } from '../../../features/chat/components/ChatRoomList';
import { renderWithProviders } from '../../../utils/testing/renderWithProviders';

describe('ChatRoomList', () => {
  const mockRooms = [
    {
      id: '1',
      name: 'General',
      type: 'group',
      lastMessage: { content: 'Hello', timestamp: new Date() },
      unreadCount: 2
    },
    {
      id: '2',
      name: 'Event Chat',
      type: 'event',
      lastMessage: { content: 'Hi', timestamp: new Date() },
      unreadCount: 0
    }
  ];

  it('renders chat rooms', () => {
    renderWithProviders(
      <ChatRoomList 
        rooms={mockRooms}
        activeRoomId="1"
        onRoomSelect={() => {}}
      />
    );

    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Event Chat')).toBeInTheDocument();
  });

  it('shows unread count', () => {
    renderWithProviders(
      <ChatRoomList 
        rooms={mockRooms}
        activeRoomId="1"
        onRoomSelect={() => {}}
      />
    );

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('handles room selection', async () => {
    const onRoomSelect = vi.fn();
    renderWithProviders(
      <ChatRoomList 
        rooms={mockRooms}
        activeRoomId="1"
        onRoomSelect={onRoomSelect}
      />
    );

    await userEvent.click(screen.getByText('Event Chat'));
    expect(onRoomSelect).toHaveBeenCalledWith(mockRooms[1]);
  });
});
```