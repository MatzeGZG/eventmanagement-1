import React from 'react';
import { List } from 'lucide-react';
import { motion } from 'framer-motion';

interface MyFunToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export const MyFunToggle: React.FC<MyFunToggleProps> = ({ enabled, onToggle }) => {
  return (
    <motion.button
      onClick={() => onToggle(!enabled)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-colors
        ${enabled ? 'bg-fjs-gold text-black' : 'text-fjs-silver hover:bg-fjs-charcoal'}
      `}
    >
      <List className="w-4 h-4" />
      <span className="text-sm font-medium">MyFun</span>
      <span className="text-xs font-medium opacity-75">{enabled ? 'ON' : 'OFF'}</span>
    </motion.button>
  );
};