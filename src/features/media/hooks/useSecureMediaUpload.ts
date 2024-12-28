import { useState, useCallback } from 'react';
import { validateFile } from '../../../utils/security/fileValidation';
import { sanitizer } from '../../../utils/security';
import { supabase } from '../../../lib/supabase';
import { useToast } from '../../../hooks/useToast';
import { PerformanceMonitor } from '../../../utils/performance/performanceMonitor';

export const useSecureMediaUpload = () => {
  const [uploading, setUploading] = useState(false);
  const { showToast } = useToast();

  const uploadMedia = useCallback(async (file: File) => {
    setUploading(true);
    PerformanceMonitor.start('media-upload');

    try {
      // Validate file
      const errors = validateFile(file);
      if (errors.length > 0) {
        throw new Error(errors.join(', '));
      }

      // Sanitize filename
      const sanitizedName = sanitizer.cleanInput(file.name);
      if (!sanitizer.validateFileName(sanitizedName)) {
        throw new Error('Invalid filename');
      }

      // Generate secure path
      const filePath = `uploads/${Date.now()}-${sanitizedName}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('media')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // Get secure URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      PerformanceMonitor.end('media-upload');
      
      return {
        success: true,
        url: publicUrl,
        path: filePath
      };

    } catch (error) {
      console.error('Upload error:', error);
      showToast(error instanceof Error ? error.message : 'Upload failed', 'error');
      return { success: false, error };
    } finally {
      setUploading(false);
    }
  }, [showToast]);

  return {
    uploading,
    uploadMedia
  };
};