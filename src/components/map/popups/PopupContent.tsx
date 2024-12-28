import React from 'react';

interface PopupContentProps {
  children: React.ReactNode;
  className?: string;
}

export const PopupContent: React.FC<PopupContentProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`p-4 max-w-sm ${className}`}>
      {children}
    </div>
  );
};