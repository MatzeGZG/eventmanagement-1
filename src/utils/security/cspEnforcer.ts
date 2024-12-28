export class CSPEnforcer {
  static readonly VIOLATION_ENDPOINT = '/api/csp-report';

  static init(): void {
    if (!window.trustedTypes) {
      console.warn('Trusted Types not supported in this browser');
      return;
    }

    // Create default policy
    trustedTypes.createPolicy('default', {
      createHTML: (string) => string,
      createScriptURL: (string) => {
        if (this.isAllowedScriptURL(string)) {
          return string;
        }
        throw new Error('Blocked script URL');
      },
      createScript: (string) => {
        if (this.isAllowedScript(string)) {
          return string;
        }
        throw new Error('Blocked script content');
      }
    });

    this.setupViolationReporting();
  }

  private static isAllowedScriptURL(url: string): boolean {
    const allowedDomains = [
      'api.mapbox.com',
      'app.supabase.com'
    ];
    try {
      const parsedUrl = new URL(url);
      return allowedDomains.some(domain => parsedUrl.hostname.endsWith(domain));
    } catch {
      return false;
    }
  }

  private static isAllowedScript(content: string): boolean {
    // Add script content validation logic
    return !content.includes('eval') && !content.includes('Function');
  }

  private static setupViolationReporting(): void {
    document.addEventListener('securitypolicyviolation', (e) => {
      const violation = {
        blockedURI: e.blockedURI,
        violatedDirective: e.violatedDirective,
        originalPolicy: e.originalPolicy,
        timestamp: new Date().toISOString()
      };

      // Log violation
      console.error('CSP Violation:', violation);

      // Report violation
      fetch(this.VIOLATION_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(violation),
        headers: {
          'Content-Type': 'application/json'
        }
      }).catch(console.error);
    });
  }
}