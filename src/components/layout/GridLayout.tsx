import React from 'react';
import { motion } from 'framer-motion';
import { staggerChildren } from '../../utils/animations/variants';
import { GRID_COLUMNS, SPACING } from '../../utils/constants/responsive';

interface GridLayoutProps {
  children: React.ReactNode;
  columns?: Partial<typeof GRID_COLUMNS>;
  gap?: keyof typeof SPACING;
  className?: string;
}

export const GridLayout: React.FC<GridLayoutProps> = ({
  children,
  columns = GRID_COLUMNS,
  gap = 'md',
  className = ''
}) => {
  const gridClasses = [
    `grid-cols-${columns.sm || 1}`,
    `sm:grid-cols-${columns.md || 2}`,
    `lg:grid-cols-${columns.lg || 3}`,
    `xl:grid-cols-${columns.xl || 4}`
  ].join(' ');

  return (
    <motion.div
      variants={staggerChildren}
      className={`grid ${gridClasses} gap-${SPACING[gap]} ${className}`}
    >
      {children}
    </motion.div>
  );
};