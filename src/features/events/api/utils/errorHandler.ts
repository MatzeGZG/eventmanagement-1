import { AppError } from '../../../../utils/errorHandling';

export const handleAPIError = async (response: Response): Promise<never> => {
  let errorMessage: string;
  
  try {
    const errorData = await response.json();
    errorMessage = errorData.error || `API request failed with status ${response.status}`;
  } catch {
    errorMessage = `API request failed with status ${response.status}`;
  }

  throw new AppError(
    errorMessage,
    'PREDICTHQ_API_ERROR',
    response.status
  );
};

export const isPredictHQAuthError = (error: unknown): boolean => {
  return error instanceof AppError && 
    error.code === 'PREDICTHQ_API_ERROR' && 
    error.statusCode === 401;
};