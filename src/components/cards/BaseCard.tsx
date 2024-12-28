import React from 'react';
import { motion } from 'framer-motion';
import { hoverScale } from '../../utils/animations/variants';

interface BaseCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const BaseCard: React.FC<BaseCardProps> = ({
  children,
  className = '',
  onClick
}) => {
  return (
    <motion.div
      {...hoverScale}
      onClick={onClick}
      className={`
        bg-fjs-charcoal rounded-xl overflow-hidden
        hover:shadow-lg hover:shadow-fjs-gold/10 
        transition-all duration-300
        ${className}
      `.trim()}
    >
      {children}
    </motion.div>
  );
};