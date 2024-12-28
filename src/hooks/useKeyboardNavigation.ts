import { useEffect, useCallback } from 'react';
import { useStore } from '../store';

export const useKeyboardNavigation = () => {
  const { setView, navigateDate } = useStore();

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    // Ignore if focus is in input/textarea
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return;
    }

    switch (e.key) {
      case 'ArrowLeft':
        navigateDate('prev');
        break;
      case 'ArrowRight':
        navigateDate('next');
        break;
      case 'm':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          setView('month');
        }
        break;
      case 'w':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          setView('week');
        }
        break;
      case 'd':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          setView('day');
        }
        break;
    }
  }, [setView, navigateDate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);
};