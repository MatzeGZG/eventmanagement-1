```typescript
import { AppError } from '../../../utils/errorHandling';
import { RateLimiter } from '../../../utils/security';
import { EnhancedErrorHandler } from '../../../utils/errorHandling/enhancedErrorHandler';
import { ErrorLogger } from '../../../utils/errorHandling/errorLogger';
import { PredictHQSearchParams, PredictHQResponse } from './types/predicthq';

export class PredictHQAPI {
  private readonly baseUrl = 'https://api.predicthq.com/v1';
  private readonly token: string;

  constructor() {
    const token = import.meta.env.VITE_PREDICTHQ_TOKEN;
    if (!token) {
      throw new AppError('PredictHQ API token not configured', 'CONFIG_ERROR');
    }
    this.token = token;
  }

  async searchEvents(params: PredictHQSearchParams): Promise<PredictHQResponse> {
    try {
      // Check rate limit
      if (!RateLimiter.checkLimit('predicthq', 50, 60 * 1000)) {
        throw new AppError('Rate limit exceeded', 'RATE_LIMIT_ERROR', 429);
      }

      const queryParams = new URLSearchParams();

      // Add location parameter
      if (params.location) {
        queryParams.append(
          'location.around',
          `${params.location.latitude},${params.location.longitude},${params.location.radius || '20km'}`
        );
      }

      // Add date range parameters
      if (params.dateRange) {
        queryParams.append('start.gte', params.dateRange.start.toISOString());
        queryParams.append('start.lte', params.dateRange.end.toISOString());
      }

      const url = `${this.baseUrl}/events/?${queryParams.toString()}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new AppError(
          await this.getErrorMessage(response),
          'API_ERROR',
          response.status
        );
      }

      return response.json();
    } catch (error) {
      await EnhancedErrorHandler.handleError(error, {
        component: 'PredictHQAPI',
        action: 'searchEvents',
        metadata: { params }
      });

      ErrorLogger.log('API_ERROR', 'PredictHQ API request failed', {
        error,
        params
      });

      throw error;
    }
  }

  private async getErrorMessage(response: Response): Promise<string> {
    try {
      const data = await response.json();
      return data.error || `API request failed with status ${response.status}`;
    } catch {
      return `API request failed with status ${response.status}`;
    }
  }
}
```