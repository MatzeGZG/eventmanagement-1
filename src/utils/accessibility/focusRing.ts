export class FocusRing {
  static init() {
    // Add focus ring styles
    const style = document.createElement('style');
    style.textContent = [
      '.keyboard-user :focus {',
      '  outline: 2px solid #D4AF37 !important;',
      '  outline-offset: 2px !important;',
      '}',
      '',
      '.keyboard-user :focus:not(:focus-visible) {',
      '  outline: none !important;',
      '}',
      '',
      '.keyboard-user :focus-visible {',
      '  outline: 2px solid #D4AF37 !important;',
      '  outline-offset: 2px !important;',
      '}'
    ].join('\n');

    document.head.appendChild(style);

    // Setup keyboard detection
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-user');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-user');
    });
  }
}