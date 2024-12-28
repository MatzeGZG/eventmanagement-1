export class A11yEnhancements {
  static init() {
    this.setupKeyboardNavigation();
    this.setupReducedMotion();
    this.setupHighContrast();
    this.setupFocusRing();
    this.setupScreenReaderAnnouncements();
  }

  private static setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }

  private static setupReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const updateMotionPreference = (e: MediaQueryListEvent | MediaQueryList) => {
      document.documentElement.classList.toggle('reduced-motion', e.matches);
    };

    prefersReducedMotion.addEventListener('change', updateMotionPreference);
    updateMotionPreference(prefersReducedMotion);
  }

  private static setupHighContrast() {
    const prefersHighContrast = window.matchMedia('(prefers-contrast: more)');
    
    const updateContrastPreference = (e: MediaQueryListEvent | MediaQueryList) => {
      document.documentElement.classList.toggle('high-contrast', e.matches);
    };

    prefersHighContrast.addEventListener('change', updateContrastPreference);
    updateContrastPreference(prefersHighContrast);
  }

  private static setupFocusRing() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        requestAnimationFrame(() => {
          const focusedElement = document.activeElement;
          if (focusedElement && focusedElement !== document.body) {
            focusedElement.classList.add('focus-visible');
          }
        });
      }
    });

    document.addEventListener('mousedown', () => {
      const focusedElement = document.activeElement;
      if (focusedElement) {
        focusedElement.classList.remove('focus-visible');
      }
    });
  }

  private static setupScreenReaderAnnouncements() {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
  }
}