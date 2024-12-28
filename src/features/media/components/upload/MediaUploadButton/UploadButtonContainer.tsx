import React from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';

interface UploadButtonContainerProps {
  children: React.ReactNode;
  uploading: boolean;
}

export const UploadButtonContainer: React.FC<UploadButtonContainerProps> = ({
  children,
  uploading
}) => {
  const handleClick = () => {
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="relative">
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={uploading}
        className="bg-gradient-gold text-black px-4 py-2 rounded-lg font-medium flex items-center space-x-2 disabled:opacity-50"
      >
        <Upload className="w-5 h-5" />
        <span>{uploading ? 'Uploading...' : 'Share Moment'}</span>
      </motion.button>
      {children}
    </div>
  );
};