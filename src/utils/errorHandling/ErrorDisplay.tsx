import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  title = 'Something went wrong',
  message = 'Please try again later',
  onRetry
}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/90 p-4 text-center z-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-fjs-charcoal rounded-xl p-8 max-w-md"
    >
      <AlertTriangle className="w-16 h-16 text-fjs-gold mx-auto mb-4" />
      <h2 className="text-xl font-bold text-fjs-gold mb-2">
        {title}
      </h2>
      <p className="text-fjs-silver mb-6">
        {message}
      </p>
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="px-6 py-2 bg-gradient-gold text-black rounded-lg font-medium"
        >
          Try Again
        </motion.button>
      )}
    </motion.div>
  </div>
);