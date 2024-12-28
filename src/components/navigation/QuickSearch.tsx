import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const QuickSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 bg-black/50 flex items-start justify-center pt-20 px-4 z-50"
        >
          <div className="w-full max-w-2xl bg-fjs-charcoal rounded-xl shadow-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-fjs-gold" />
              <input
                type="text"
                placeholder="Search anything... (Esc to close)"
                className="w-full pl-12 pr-4 py-3 bg-transparent text-white border-none focus:ring-0"
                autoFocus
                onKeyDown={e => e.key === 'Escape' && setIsOpen(false)}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};