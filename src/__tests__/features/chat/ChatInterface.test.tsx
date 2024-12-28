```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatInterface } from '../../../features/chat/components/ChatInterface';
import { renderWithProviders } from '../../../utils/testing/renderWithProviders';
import { useTestStore } from '../../../utils/testing/hooks/useTestStore';

describe('ChatInterface', () => {
  const { resetStore, setUser } = useTestStore();

  beforeEach(() => {
    resetStore();
    setUser({ id: '1', name: 'Test User' } as any);
  });

  it('renders chat rooms list', () => {
    renderWithProviders(<ChatInterface />);
    expect(screen.getByText(/messages/i)).toBeInTheDocument();
  });

  it('sends messages', async () => {
    renderWithProviders(<ChatInterface />);
    
    const input = screen.getByPlaceholderText(/type a message/i);
    await userEvent.type(input, 'Hello{enter}');

    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('shows typing indicator', async () => {
    renderWithProviders(<ChatInterface />);
    
    const input = screen.getByPlaceholderText(/type a message/i);
    await userEvent.type(input, 'Hello');

    expect(screen.getByText(/typing/i)).toBeInTheDocument();
  });
});
```