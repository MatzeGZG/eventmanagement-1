```typescript
import { useCallback } from 'react';

export const useAriaAnnouncer = () => {
  const announce = useCallback((message: string, assertive = false) => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', assertive ? 'assertive' : 'polite');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);

    // Announce the message
    announcer.textContent = message;

    // Clean up after announcement
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 3000);
  }, []);

  return { announce };
};
```