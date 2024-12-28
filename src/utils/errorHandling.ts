export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(error.message, 'UNKNOWN_ERROR', 500, error);
  }

  return new AppError('An unknown error occurred', 'UNKNOWN_ERROR', 500);
};

export const isNetworkError = (error: unknown): boolean => {
  return error instanceof Error && 
    (error.name === 'NetworkError' || error.message.includes('network'));
};