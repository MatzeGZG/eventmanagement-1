```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../../../features/auth/components/LoginForm';
import { renderWithProviders } from '../../../utils/testing/renderWithProviders';

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('validates email format', async () => {
    renderWithProviders(<LoginForm />);
    
    const emailInput = screen.getByPlaceholderText(/email/i);
    await userEvent.type(emailInput, 'invalid-email');
    await userEvent.tab();

    expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
  });

  it('validates password requirements', async () => {
    renderWithProviders(<LoginForm />);
    
    const passwordInput = screen.getByPlaceholderText(/password/i);
    await userEvent.type(passwordInput, 'short');
    await userEvent.tab();

    expect(screen.getByText(/at least 12 characters/i)).toBeInTheDocument();
  });

  it('handles successful login', async () => {
    const onSuccess = vi.fn();
    renderWithProviders(<LoginForm onSuccess={onSuccess} />);
    
    await userEvent.type(screen.getByPlaceholderText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText(/password/i), 'ValidPassword123!');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(onSuccess).toHaveBeenCalled();
  });
});
```