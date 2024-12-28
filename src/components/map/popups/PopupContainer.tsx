import React from 'react';
import { motion } from 'framer-motion';

interface PopupContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PopupContainer: React.FC<PopupContainerProps> = ({
  children,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`bg-black rounded-lg shadow-lg overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
};