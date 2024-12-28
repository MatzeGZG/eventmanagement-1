```typescript
export class AccessibilityManager {
  static init() {
    this.setupKeyboardNavigation();
    this.setupScreenReaderAnnouncements();
    this.setupReducedMotion();
  }

  private static setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-user');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-user');
    });
  }

  private static setupScreenReaderAnnouncements() {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
  }

  private static setupReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const updateMotionPreference = (e: MediaQueryListEvent | MediaQueryList) => {
      document.documentElement.classList.toggle('reduced-motion', e.matches);
    };

    prefersReducedMotion.addEventListener('change', updateMotionPreference);
    updateMotionPreference(prefersReducedMotion);
  }
}
```