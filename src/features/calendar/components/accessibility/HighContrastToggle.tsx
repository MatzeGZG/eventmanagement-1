```typescript
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

interface HighContrastToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export const HighContrastToggle: React.FC<HighContrastToggleProps> = ({
  enabled,
  onChange
}) => {
  return (
    <motion.button
      onClick={() => onChange(!enabled)}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full
        ${enabled ? 'bg-fjs-gold' : 'bg-fjs-charcoal'}
      `}
      whileTap={{ scale: 0.95 }}
      aria-label={`Toggle high contrast mode: currently ${enabled ? 'enabled' : 'disabled'}`}
    >
      <span className="sr-only">
        Toggle high contrast mode
      </span>
      <motion.span
        className={`
          inline-block h-4 w-4 transform rounded-full
          ${enabled ? 'translate-x-6 bg-black' : 'translate-x-1 bg-white'}
        `}
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
      >
        {enabled ? (
          <Sun className="w-3 h-3 m-0.5 text-fjs-gold" />
        ) : (
          <Moon className="w-3 h-3 m-0.5 text-fjs-charcoal" />
        )}
      </motion.span>
    </motion.button>
  );
};
```