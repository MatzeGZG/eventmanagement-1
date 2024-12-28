import React from 'react';
import { motion } from 'framer-motion';
import { ProgressRing } from '../../../../components/common/ProgressRing';

interface UploadProgressProps {
  progress: number;
}

export const UploadProgress: React.FC<UploadProgressProps> = ({ progress }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-fjs-charcoal p-8 rounded-xl"
    >
      <ProgressRing progress={progress}>
        <div className="text-center">
          <span className="text-2xl font-bold text-fjs-gold">{progress}%</span>
          <p className="text-sm text-fjs-silver">Uploading...</p>
        </div>
      </ProgressRing>
    </motion.div>
  </div>
);