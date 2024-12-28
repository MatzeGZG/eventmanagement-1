import React from 'react';

interface SkipLinkProps {
  target?: string;
  className?: string;
}

export const SkipLink: React.FC<SkipLinkProps> = ({
  target = "#main-content",
  className = "sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 bg-fjs-gold text-black px-4 py-2 rounded-lg z-50"
}) => (
  <a
    href={target}
    className={className}
    tabIndex={0}
  >
    Skip to main content
  </a>
);