```typescript
export class InputValidator {
  private static readonly EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private static readonly URL_REGEX = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
  private static readonly SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

  static validateEmail(email: string): boolean {
    return this.EMAIL_REGEX.test(email);
  }

  static validateUrl(url: string): boolean {
    return this.URL_REGEX.test(url);
  }

  static sanitizeInput(input: string): string {
    return input
      .replace(this.SCRIPT_REGEX, '')
      .replace(/[<>]/g, '')
      .trim();
  }

  static validatePassword(password: string): string[] {
    const errors: string[] = [];
    
    if (password.length < 12) {
      errors.push('Password must be at least 12 characters');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain an uppercase letter');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain a number');
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      errors.push('Password must contain a special character');
    }

    return errors;
  }

  static validateFileName(filename: string): boolean {
    return /^[a-zA-Z0-9-_\.]+$/.test(filename);
  }
}
```