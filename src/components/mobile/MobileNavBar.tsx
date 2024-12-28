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
            className="mobile-nav-item"
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs mt-1">{label}</span>
          </motion.button>
        ))}
      </div>
    </nav>
  );
};