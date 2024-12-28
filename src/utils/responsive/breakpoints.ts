export const BREAKPOINTS = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const;

export const DEVICE_SIZES = {
  mobile: { min: 0, max: 767 },
  tablet: { min: 768, max: 1023 },
  desktop: { min: 1024, max: Infinity }
} as const;

export const getDeviceType = () => {
  const width = window.innerWidth;
  if (width <= DEVICE_SIZES.mobile.max) return 'mobile';
  if (width <= DEVICE_SIZES.tablet.max) return 'tablet';
  return 'desktop';
};