import React, { useEffect } from 'react';
import { useStore } from '../../store';

export const NavigationAnnouncer: React.FC = () => {
  const currentView = useStore(state => state.view);

  useEffect(() => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
    
    announcer.textContent = `Current view: ${currentView}`;

    return () => {
      document.body.removeChild(announcer);
    };
  }, [currentView]);

  return null;
};