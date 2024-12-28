import React from 'react';
import { useDeviceType } from '../../utils/responsive';

interface MobileButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

export const MobileButton: React.FC<MobileButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const { isIOS } = useDeviceType();

  return (
    <button
      className={`
        px-4 py-3 rounded-lg font-medium
        ${isIOS ? 'ios-tap-highlight-none' : 'android-ripple'}
        ${fullWidth ? 'w-full' : ''}
        ${variant === 'primary' 
          ? 'bg-gradient-gold text-black active:opacity-90' 
          : 'bg-fjs-charcoal text-fjs-gold active:bg-opacity-90'}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};