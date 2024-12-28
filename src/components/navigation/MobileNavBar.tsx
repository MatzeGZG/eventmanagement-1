import React from 'react';
import { Home, Calendar, Map, User } from 'lucide-react';
import { motion } from 'framer-motion';

export const MobileNavBar: React.FC = () => {
  const navItems = [
    { icon: Home, label: 'Home' },
    { icon: Calendar, label: 'Events' },
    { icon: Map, label: 'Map' },
    { icon: User, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-fjs-charcoal safe-area-bottom">
      <div className="flex justify-around py-2">
        {navItems.map(({ icon: Icon, label }) => (
          <motion.button
            key={label}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center p-2"
          >
            <Icon className="w-6 h-6 text-fjs-gold" />
            <span className="text-xs text-fjs-silver mt-1">{label}</span>
          </motion.button>
        ))}
      </div>
    </nav>
  );
};