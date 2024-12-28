import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

interface UnreadIndicatorProps {
  count: number;
  onClick: () => void;
}

export const UnreadIndicator: React.FC<UnreadIndicatorProps> = ({ count, onClick }) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="absolute bottom-4 right-4 flex items-center space-x-2 px-3 py-2 
                 bg-fjs-gold text-black rounded-full shadow-lg"
    >
      <span className="font-medium">{count} new messages</span>
      <ArrowDown className="w-4 h-4" />
    </motion.button>
  );
};