export class XSSProtection {
  private static readonly SANITIZE_PATTERNS = {
    script: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    events: / on\w+="[^"]*"/g,
    tags: /<\/?[^>]+(>|$)/g
  };

  static sanitizeHTML(input: string): string {
    if (!input) return '';
    
    return input
      .replace(this.SANITIZE_PATTERNS.script, '')
      .replace(this.SANITIZE_PATTERNS.events, '')
      .replace(/javascript:/gi, '')
      .trim();
  }

  static sanitizeJSON(input: unknown): unknown {
    if (typeof input === 'string') {
      return this.sanitizeHTML(input);
    }
    if (Array.isArray(input)) {
      return input.map(item => this.sanitizeJSON(item));
    }
    if (typeof input === 'object' && input !== null) {
      return Object.fromEntries(
        Object.entries(input).map(([key, value]) => [
          key,
          this.sanitizeJSON(value)
        ])
      );
    }
    return input;
  }

  static validateInput(input: string, pattern: RegExp): boolean {
    return pattern.test(input);
  }

  static escapeOutput(input: string): string {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}