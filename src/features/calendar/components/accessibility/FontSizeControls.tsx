```typescript
import React from 'react';
import { Type, Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface FontSizeControlsProps {
  size: 'sm' | 'md' | 'lg';
  onChange: (size: 'sm' | 'md' | 'lg') => void;
}

export const FontSizeControls: React.FC<FontSizeControlsProps> = ({
  size,
  onChange
}) => {
  const sizes = ['sm', 'md', 'lg'] as const;
  const currentIndex = sizes.indexOf(size);

  const decrease = () => {
    if (currentIndex > 0) {
      onChange(sizes[currentIndex - 1]);
    }
  };

  const increase = () => {
    if (currentIndex < sizes.length - 1) {
      onChange(sizes[currentIndex + 1]);
    }
  };

  return (
    <div className="flex items-center space-x-2" role="group" aria-label="Font size controls">
      <motion.button
        onClick={decrease}
        disabled={currentIndex === 0}
        whileTap={{ scale: 0.95 }}
        className="p-2 text-fjs-gold hover:bg-black/20 rounded-lg disabled:opacity-50"
        aria-label="Decrease font size"
      >
        <Minus className="w-5 h-5" />
      </motion.button>

      <div className="flex items-center px-3 py-1 bg-fjs-charcoal rounded-lg">
        <Type className="w-4 h-4 text-fjs-gold mr-2" />
        <span className="text-white font-medium">
          {size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'}
        </span>
      </div>

      <motion.button
        onClick={increase}
        disabled={currentIndex === sizes.length - 1}
        whileTap={{ scale: 0.95 }}
        className="p-2 text-fjs-gold hover:bg-black/20 rounded-lg disabled:opacity-50"
        aria-label="Increase font size"
      >
        <Plus className="w-5 h-5" />
      </motion.button>
    </div>
  );
};
```