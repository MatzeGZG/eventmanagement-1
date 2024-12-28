import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface AuthErrorDisplayProps {
  error: string;
}

export const AuthErrorDisplay: React.FC<AuthErrorDisplayProps> = ({ error }) => {
  if (!error) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start space-x-3"
    >
      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
      <span className="text-sm text-red-500">{error}</span>
    </motion.div>
  );
};