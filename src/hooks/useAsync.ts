```typescript
import { useState, useCallback } from 'react';
import { EnhancedErrorHandler } from '../utils/errorHandling/enhancedErrorHandler';
import { ErrorLogger } from '../utils/errorHandling/errorLogger';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useAsync<T>() {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (
    promise: Promise<T>,
    context?: { action: string; metadata?: Record<string, any> }
  ) => {
    setState({ data: null, loading: true, error: null });

    try {
      const data = await promise;
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      await EnhancedErrorHandler.handleError(error, {
        component: 'useAsync',
        action: context?.action || 'execute',
        metadata: context?.metadata
      });

      ErrorLogger.log('ASYNC_ERROR', 'Async operation failed', {
        error,
        context
      });

      setState({ data: null, loading: false, error: error as Error });
      throw error;
    }
  }, []);

  return {
    ...state,
    execute,
  };
}
```