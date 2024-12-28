import { useState, useCallback } from 'react';
import { useStore } from '../../../store';
import { usePoints } from '../../../hooks/usePoints';
import { MediaUploadResult } from '../types';
import { validateMediaFile } from '../utils/mediaValidation';

export const useMediaUpload = () => {
  const [uploading, setUploading] = useState(false);
  const { awardPoints } = usePoints();

  const uploadMedia = useCallback(async (file: File): Promise<MediaUploadResult> => {
    setUploading(true);

    try {
      // Validate file
      const errors = validateMediaFile(file);
      if (errors.length > 0) {
        return {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: errors.join(', ')
          }
        };
      }

      // Mock upload - In production, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Award points based on media type
      const points = file.type.startsWith('video/') ? 50 : 30;
      awardPoints(points);

      return {
        success: true,
        points,
        mediaUrl: URL.createObjectURL(file)
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'UPLOAD_ERROR',
          message: error instanceof Error ? error.message : 'Upload failed'
        }
      };
    } finally {
      setUploading(false);
    }
  }, [awardPoints]);

  return {
    uploading,
    uploadMedia
  };
};