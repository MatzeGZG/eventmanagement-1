import { describe, it, expect } from 'vitest';
import { useStore } from '../../store';
import { createMockEvent } from '../../utils/testing/fixtures/eventFixtures';

describe('eventSlice', () => {
  it('adds events correctly', () => {
    const event = createMockEvent();
    const addEvent = useStore.getState().addEvent;
    
    addEvent(event);
    const events = useStore.getState().events;
    
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual(event);
  });

  it('updates events correctly', () => {
    const event = createMockEvent();
    const { addEvent, updateEvent } = useStore.getState();
    
    addEvent(event);
    
    const updatedEvent = { ...event, title: 'Updated Title' };
    updateEvent(updatedEvent);
    
    const events = useStore.getState().events;
    expect(events[0].title).toBe('Updated Title');
  });
});