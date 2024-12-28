```typescript
import React, { createContext, useContext } from 'react';
import { Event } from '../../../types/event';

interface IntegrationContextValue {
  events: Event[];
  selectedEvent: Event | null;
  syncing: boolean;
  lastSynced: Date | null;
  handleEventSelect: (event: Event) => void;
  handleSync: (eventId: string, updates: Partial<Event>) => Promise<void>;
}

const IntegrationContext = createContext<IntegrationContextValue | undefined>(undefined);

export const IntegrationProvider: React.FC<{
  children: React.ReactNode;
  value: IntegrationContextValue;
}> = ({ children, value }) => (
  <IntegrationContext.Provider value={value}>
    {children}
  </IntegrationContext.Provider>
);

export const useIntegration = () => {
  const context = useContext(IntegrationContext);
  if (!context) {
    throw new Error('useIntegration must be used within an IntegrationProvider');
  }
  return context;
};
```