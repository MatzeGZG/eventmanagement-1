import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { useStore } from '../../../store';

export const MyFunToggle: React.FC = () => {
  const showMyEvents = useStore(state => state.showMyEvents);
  const toggleMyEvents = useStore(state => state.toggleMyEvents);

  return (
    <motion.button
      onClick={toggleMyEvents}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        flex items-center space-x-2 px-4 py-2 rounded-lg
        transition-colors duration-200
        ${showMyEvents ? 'bg-fjs-gold text-black' : 'text-fjs-gold'}
      `}
    >
      <User className="w-5 h-5" />
      <span className="font-medium">MyFun</span>
      <span className={`text-xs ${showMyEvents ? 'text-black' : 'text-fjs-gold'}`}>
        {showMyEvents ? 'ON' : 'OFF'}
      </span>
    </motion.button>
  );
};