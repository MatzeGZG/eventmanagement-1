```typescript
export enum ErrorType {
  AUTH = 'AUTH_ERROR',
  API = 'API_ERROR',
  NETWORK = 'NETWORK_ERROR',
  VALIDATION = 'VALIDATION_ERROR',
  STATE = 'STATE_ERROR',
  RENDER = 'RENDER_ERROR',
  DATABASE = 'DATABASE_ERROR',
  FEED = 'FEED_ERROR'
}

export interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  metadata?: Record<string, any>;
}

export interface ErrorLogEntry {
  id: string;
  timestamp: number;
  type: ErrorType;
  message: string;
  stack?: string;
  context?: ErrorContext;
}
```