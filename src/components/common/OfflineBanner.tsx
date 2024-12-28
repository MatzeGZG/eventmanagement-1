import React from 'react';
import { WifiOff } from 'lucide-react';
import { motion } from 'framer-motion';

export const OfflineBanner: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-red-500 text-white px-4 py-2 flex items-center justify-center"
  >
    <WifiOff className="w-4 h-4 mr-2" />
    <span>You are currently offline. Some features may be limited.</span>
  </motion.div>
);