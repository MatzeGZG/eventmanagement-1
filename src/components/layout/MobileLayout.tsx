import React from 'react';
import { useDeviceType } from '../../utils/responsive';

interface MobileLayoutProps {
  children: React.ReactNode;
  fullScreen?: boolean;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children, 
  fullScreen = false 
}) => {
  const { isIOS, isAndroid, hasNotch } = useDeviceType();

  return (
    <div className={`
      min-h-screen w-full
      ${fullScreen ? 'h-screen overflow-hidden' : ''}
      ${isIOS ? 'ios-momentum-scroll' : ''}
      ${hasNotch ? 'mobile-safe-top mobile-safe-bottom' : ''}
    `}>
      <div className={`
        flex flex-col h-full
        ${isAndroid ? 'android-ripple' : ''}
        ${isIOS ? 'ios-tap-highlight-none' : ''}
      `}>
        {children}
      </div>
    </div>
  );
};