import { SecureRequestValidator } from '../security/secureRequestValidator';
import { XSSProtection } from '../security/xssProtection';
import { AuditLogger } from '../security/auditLogger';

interface SecureRequestOptions extends RequestInit {
  validateResponse?: boolean;
  logRequest?: boolean;
}

export const secureRequest = async <T>(
  url: string,
  options: SecureRequestOptions = {}
): Promise<T> => {
  const { validateResponse = true, logRequest = true, ...requestOptions } = options;

  // Create request object
  const request = new Request(url, {
    ...requestOptions,
    headers: {
      ...requestOptions.headers,
      'X-Request-ID': crypto.randomUUID()
    }
  });

  // Validate request
  if (!SecureRequestValidator.validateRequest(request)) {
    throw new Error('Invalid request');
  }

  try {
    // Log request if enabled
    if (logRequest) {
      await AuditLogger.log('api_request', {
        url,
        method: request.method,
        timestamp: new Date().toISOString()
      });
    }

    // Make request
    const response = await fetch(request);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.statusText}`);
    }

    // Parse and validate response
    const data = await response.json();
    
    if (validateResponse) {
      return XSSProtection.sanitizeJSON(data) as T;
    }

    return data;
  } catch (error) {
    // Log error
    await AuditLogger.log('api_error', {
      url,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, 'error');

    throw error;
  }
};