import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface MapControlButtonProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick: () => void;
}

export const MapControlButton: React.FC<MapControlButtonProps> = ({
  icon: Icon,
  label,
  active,
  onClick
}) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`p-2 rounded-lg flex items-center ${
      active
        ? 'bg-fjs-gold text-black'
        : 'text-fjs-gold hover:bg-fjs-charcoal'
    }`}
  >
    <Icon className="w-5 h-5 mr-2" />
    <span className="font-medium">{label}</span>
  </motion.button>
);