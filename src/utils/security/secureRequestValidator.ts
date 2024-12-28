export class SecureRequestValidator {
  private static readonly ALLOWED_ORIGINS = [
    'https://api.mapbox.com',
    'https://api.predicthq.com',
    import.meta.env.VITE_SUPABASE_URL
  ];

  private static readonly ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'DELETE'];

  static validateRequest(request: Request): boolean {
    // Validate origin
    const origin = request.headers.get('origin');
    if (origin && !this.ALLOWED_ORIGINS.includes(origin)) {
      console.warn(`Invalid request origin: ${origin}`);
      return false;
    }

    // Validate method
    if (!this.ALLOWED_METHODS.includes(request.method)) {
      console.warn(`Invalid request method: ${request.method}`);
      return false;
    }

    // Validate content type for POST/PUT
    if (['POST', 'PUT'].includes(request.method)) {
      const contentType = request.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        console.warn(`Invalid content type: ${contentType}`);
        return false;
      }
    }

    return true;
  }

  static validateRequestBody(body: unknown): boolean {
    if (!body || typeof body !== 'object') {
      return false;
    }

    // Add custom validation logic based on your needs
    return true;
  }

  static sanitizeQueryParams(params: URLSearchParams): URLSearchParams {
    const sanitized = new URLSearchParams();
    params.forEach((value, key) => {
      sanitized.append(
        SQLInjectionProtection.sanitizeInput(key),
        SQLInjectionProtection.sanitizeInput(value)
      );
    });
    return sanitized;
  }
}