export class KeyboardNavigation {
  private static focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  static init(container: HTMLElement) {
    this.setupFocusTrap(container);
    this.setupKeyboardShortcuts();
  }

  private static setupFocusTrap(container: HTMLElement) {
    container.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;

      const focusableElements = Array.from(
        container.querySelectorAll(this.focusableSelector)
      ) as HTMLElement[];

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    });
  }

  private static setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'm':
            e.preventDefault();
            document.querySelector('[data-view="map"]')?.click();
            break;
          case 'c':
            e.preventDefault();
            document.querySelector('[data-view="calendar"]')?.click();
            break;
          case '/':
            e.preventDefault();
            document.querySelector('[data-search]')?.focus();
            break;
        }
      }
    });
  }
}