import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EventCard } from '../../components/events/EventCard';
import { renderWithProviders } from '../../utils/testing/renderWithProviders';
import { createMockEvent } from '../../utils/testing/fixtures/eventFixtures';

describe('EventCard', () => {
  it('renders event details correctly', () => {
    const event = createMockEvent();
    renderWithProviders(<EventCard event={event} />);

    expect(screen.getByText(event.title)).toBeInTheDocument();
    expect(screen.getByText(event.location.city)).toBeInTheDocument();
  });

  it('shows RSVP button when not attending', () => {
    const event = createMockEvent();
    renderWithProviders(<EventCard event={event} />);
    
    expect(screen.getByText(/rsvp/i)).toBeInTheDocument();
  });

  it('handles RSVP click', async () => {
    const onRSVP = vi.fn();
    const event = createMockEvent();
    renderWithProviders(<EventCard event={event} onRSVP={onRSVP} />);

    await userEvent.click(screen.getByText(/rsvp/i));
    expect(onRSVP).toHaveBeenCalledTimes(1);
  });
});