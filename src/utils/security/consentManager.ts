export class ConsentManager {
  private static readonly COOKIE_CATEGORIES = {
    essential: {
      name: 'Essential',
      description: 'Required for core functionality',
      required: true
    },
    functional: {
      name: 'Functional',
      description: 'Enhances website functionality',
      required: true
    },
    analytics: {
      name: 'Analytics',
      description: 'Helps us improve our website',
      required: false
    },
    marketing: {
      name: 'Marketing',
      description: 'Used for targeted advertising',
      required: false
    }
  };

  static getConsentSettings(): Record<string, boolean> {
    try {
      return JSON.parse(localStorage.getItem('consent_settings') || '{}');
    } catch {
      return {};
    }
  }

  static updateConsentSettings(settings: Record<string, boolean>): void {
    localStorage.setItem('consent_settings', JSON.stringify(settings));
  }

  static hasConsent(category: string): boolean {
    const settings = this.getConsentSettings();
    return settings[category] || this.COOKIE_CATEGORIES[category]?.required || false;
  }

  static getCookieCategories() {
    return this.COOKIE_CATEGORIES;
  }
}