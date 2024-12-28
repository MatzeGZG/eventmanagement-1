```typescript
import React from 'react';
import { ViewContainer } from './ViewContainer';
import { useIntegratedView } from '../hooks/useIntegratedView';
import { IntegrationProvider } from '../context/IntegrationContext';

export const ViewManager: React.FC = () => {
  const viewState = useIntegratedView();

  return (
    <IntegrationProvider value={viewState}>
      <ViewContainer />
    </IntegrationProvider>
  );
};
```