```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SignupForm } from '../../../features/auth/components/SignupForm';
import { renderWithProviders } from '../../../utils/testing/renderWithProviders';

describe('SignupForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('validates all required fields', async () => {
    renderWithProviders(<SignupForm />);
    
    const submitButton = screen.getByRole('button', { name: /create account/i });
    await userEvent.click(submitButton);

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  it('validates password requirements', async () => {
    renderWithProviders(<SignupForm />);
    
    const passwordInput = screen.getByLabelText(/password/i);
    await userEvent.type(passwordInput, 'weak');
    await userEvent.tab();

    await waitFor(() => {
      expect(screen.getByText(/at least 12 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/uppercase letter/i)).toBeInTheDocument();
      expect(screen.getByText(/number/i)).toBeInTheDocument();
      expect(screen.getByText(/special character/i)).toBeInTheDocument();
    });
  });

  it('handles successful signup', async () => {
    const onSuccess = vi.fn();
    renderWithProviders(<SignupForm onSuccess={onSuccess} />);
    
    await userEvent.type(screen.getByLabelText(/name/i), 'Test User');
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'ValidPassword123!');
    
    await userEvent.click(screen.getByRole('button', { name: /create account/i }));
    
    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
```