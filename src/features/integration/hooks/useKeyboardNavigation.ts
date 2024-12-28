```typescript
import { useEffect } from 'react';

type ShortcutMap = Record<string, () => void>;

export const useKeyboardNavigation = (shortcuts: ShortcutMap) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if focus is in input/textarea
      if (e.target instanceof HTMLInputElement || 
          e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.ctrlKey || e.metaKey) {
        const handler = shortcuts[e.key.toLowerCase()];
        if (handler) {
          e.preventDefault();
          handler();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};
```