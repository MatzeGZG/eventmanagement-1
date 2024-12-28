import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { useMediaUpload } from '../hooks/useMediaUpload';
import { useToast } from '../../../hooks/useToast';

export const MediaUploadButton: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploading, uploadMedia } = useMediaUpload();
  const { showToast } = useToast();

  const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const result = await uploadMedia(file);
      if (result.success && result.points) {
        showToast(`Upload successful! You earned ${result.points} points!`, 'success');
      }
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Upload failed', 'error');
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [uploadMedia, showToast]);

  return (
    <div className="relative">
      <motion.button
        onClick={() => fileInputRef.current?.click()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={uploading}
        className="bg-gradient-gold text-black px-4 py-2 rounded-lg font-medium flex items-center space-x-2 disabled:opacity-50"
      >
        <Upload className="w-5 h-5" />
        <span>{uploading ? 'Uploading...' : 'Share Moment'}</span>
      </motion.button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};