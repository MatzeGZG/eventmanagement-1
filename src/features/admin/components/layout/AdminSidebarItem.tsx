import React from 'react';
import { motion } from 'framer-motion';

interface AdminSidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

export const AdminSidebarItem: React.FC<AdminSidebarItemProps> = ({
  icon,
  label,
  active
}) => {
  return (
    <motion.button
      whileHover={{ x: 4 }}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
        active
          ? 'bg-fjs-gold text-black'
          : 'text-fjs-silver hover:bg-black/20 hover:text-fjs-gold'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </motion.button>
  );
};