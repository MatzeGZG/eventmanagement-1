import React from 'react';
import { Header } from './Header';
import { SkipLink } from '../common/SkipLink';
import { NavigationAnnouncer } from '../common/NavigationAnnouncer';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { FocusManager } from '../common/FocusManager';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useKeyboardNavigation();

  return (
    <FocusManager>
      <div className="min-h-screen bg-gradient-dark">
        <SkipLink />
        <NavigationAnnouncer />
        
        <Header role="banner" aria-label="Main header" />
        
        <main 
          id="main-content" 
          role="main" 
          className="pt-20"
          tabIndex={-1}
        >
          {children}
        </main>

        <footer role="contentinfo" className="bg-black py-8">
          <nav role="navigation" aria-label="Footer navigation">
            {/* Footer content */}
          </nav>
        </footer>
      </div>
    </FocusManager>
  );
};