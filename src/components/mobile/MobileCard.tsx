import React from 'react';
import { motion } from 'framer-motion';
import { useDeviceType } from '../../utils/responsive';

interface MobileCardProps {
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
}

export const MobileCard: React.FC<MobileCardProps> = ({
  children,
  onPress,
  className = ''
}) => {
  const { isIOS } = useDeviceType();

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onPress}
      className={`
        bg-fjs-charcoal rounded-lg p-4 mb-3
        ${isIOS ? 'ios-tap-highlight-none' : 'android-ripple'}
        ${onPress ? 'active:opacity-90' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};