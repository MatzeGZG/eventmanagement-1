export class KeyboardManager {
  private static focusableSelector = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  static init() {
    this.setupGlobalKeyboardHandlers();
    this.setupFocusIndicators();
    this.setupFocusTraps();
  }

  private static setupGlobalKeyboardHandlers() {
    document.addEventListener('keydown', (e) => {
      // Skip to main content
      if (e.key === '/' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        document.querySelector('#main-content')?.focus();
      }

      // Close modals with Escape
      if (e.key === 'Escape') {
        const modal = document.querySelector('[role="dialog"]');
        if (modal) {
          const closeButton = modal.querySelector('[data-close]') as HTMLElement;
          closeButton?.click();
        }
      }
    });
  }

  private static setupFocusIndicators() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-user');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-user');
    });
  }

  private static setupFocusTraps() {
    document.addEventListener('focusin', (e) => {
      const modal = document.querySelector('[role="dialog"]');
      if (!modal) return;

      const target = e.target as HTMLElement;
      if (!modal.contains(target)) {
        const firstFocusable = modal.querySelector(this.focusableSelector) as HTMLElement;
        firstFocusable?.focus();
      }
    });
  }

  static trapFocus(element: HTMLElement) {
    const focusableElements = Array.from(
      element.querySelectorAll(this.focusableSelector)
    ) as HTMLElement[];

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    });
  }
}