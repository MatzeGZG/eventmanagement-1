import { useState, useEffect } from 'react';

// Standard breakpoints for mobile devices
export const BREAKPOINTS = {
  xs: 320, // Small phones
  sm: 375, // Modern phones
  md: 428, // Large phones
  lg: 744, // Tablets portrait
  xl: 1024 // Tablets landscape
};

// Safe areas for different devices
export const SAFE_AREAS = {
  ios: {
    top: 47,
    bottom: 34
  },
  android: {
    top: 24,
    bottom: 16
  }
};

export const useDeviceType = () => {
  const [device, setDevice] = useState({
    isIOS: false,
    isAndroid: false,
    hasNotch: false
  });

  useEffect(() => {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const android = /Android/.test(navigator.userAgent);
    const hasNotch = 'env(safe-area-inset-top)' !== '0px';

    setDevice({ isIOS: iOS, isAndroid: android, hasNotch });
  }, []);

  return device;
};