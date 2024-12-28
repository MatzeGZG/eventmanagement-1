import React from 'react';

interface MediaItemContainerProps {
  children: React.ReactNode;
}

export const MediaItemContainer: React.FC<MediaItemContainerProps> = ({ children }) => (
  <div className="group relative bg-fjs-charcoal rounded-xl overflow-hidden">
    {children}
  </div>
);