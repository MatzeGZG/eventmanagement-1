import React from 'react';

interface FocusRingProps {
  children: React.ReactNode;
  className?: string;
}

export const FocusRing: React.FC<FocusRingProps> = ({ children, className = '' }) => (
  <div 
    className={`
      focus-within:ring-2 focus-within:ring-fjs-gold focus-within:ring-opacity-50 
      rounded-lg outline-none transition-shadow
      ${className}
    `}
  >
    {children}
  </div>
);