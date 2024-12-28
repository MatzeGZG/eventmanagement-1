import React, { useCallback } from 'react';
import { useMediaUpload } from '../../../hooks/useMediaUpload';
import { useToast } from '../../../../../hooks/useToast';
import { UploadButtonContainer } from './UploadButtonContainer';
import { FileInput } from './FileInput';

export const MediaUploadButton: React.FC = () => {
  const { uploading, uploadMedia } = useMediaUpload();
  const { showToast } = useToast();

  const handleFileSelect = useCallback(async (file: File) => {
    try {
      const result = await uploadMedia(file);
      
      if (result.success && result.points) {
        showToast(
          `Upload successful! You earned ${result.points} points!`,
          'success'
        );
      } else if (result.error) {
        showToast(result.error.message, 'error');
      }
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : 'Upload failed',
        'error'
      );
    }
  }, [uploadMedia, showToast]);

  return (
    <UploadButtonContainer uploading={uploading}>
      <FileInput onFileSelect={handleFileSelect} />
    </UploadButtonContainer>
  );
};