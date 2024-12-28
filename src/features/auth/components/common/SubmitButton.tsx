import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SubmitButtonProps {
  icon: LucideIcon;
  label: string;
  loading?: boolean;
  disabled?: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  icon: Icon,
  label,
  loading,
  disabled
}) => {
  return (
    <motion.button
      type="submit"
      disabled={loading || disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full flex items-center justify-center px-4 py-2 bg-gradient-gold text-black rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
    >
      <Icon className="w-5 h-5 mr-2" />
      <span>{loading ? 'Please wait...' : label}</span>
    </motion.button>
  );
};