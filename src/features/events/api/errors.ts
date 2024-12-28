import { AppError } from '../../../utils/errorHandling';

export class APIError extends AppError {
  constructor(message: string, statusCode?: number, originalError?: Error) {
    super(message, 'PREDICTHQ_API_ERROR', statusCode, originalError);
  }
}

export class TimeoutError extends AppError {
  constructor() {
    super('Request timed out', 'PREDICTHQ_TIMEOUT', 408);
  }
}

export class ConfigError extends AppError {
  constructor() {
    super('PredictHQ API token not configured', 'PREDICTHQ_CONFIG_ERROR', 500);
  }
}