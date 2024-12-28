```typescript
export const ERROR_CONFIG = {
  MAX_LOG_SIZE: 100,
  ERROR_THRESHOLD: 5,
  ERROR_WINDOW: 60000, // 1 minute
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

export const ERROR_MESSAGES = {
  NETWORK: 'Network error occurred. Please check your connection.',
  AUTH: 'Authentication error. Please sign in again.',
  VALIDATION: 'Invalid input provided. Please check your data.',
  UNKNOWN: 'An unexpected error occurred. Please try again.',
  FEED: 'Error loading feed items. Please refresh.',
  DATABASE: 'Database operation failed. Please try again.',
};
```