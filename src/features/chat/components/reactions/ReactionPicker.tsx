```tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile } from 'lucide-react';

interface ReactionPickerProps {
  onSelect: (emoji: string) => void;
  existingReactions?: Record<string, string[]>;
}

export const ReactionPicker: React.FC<ReactionPickerProps> = ({
  onSelect,
  existingReactions = {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const quickReactions = ['👍', '❤️', '😂', '🎉', '🤔', '👏'];

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-fjs-silver hover:text-fjs-gold rounded-full transition-colors"
      >
        <Smile className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute bottom-full left-0 mb-2 p-2 bg-fjs-charcoal rounded-lg shadow-lg z-50"
          >
            <div className="grid grid-cols-6 gap-1">
              {quickReactions.map(emoji => (
                <motion.button
                  key={emoji}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    onSelect(emoji);
                    setIsOpen(false);
                  }}
                  className="w-8 h-8 flex items-center justify-center text-xl hover:bg-black/20 rounded"
                >
                  {emoji}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
```