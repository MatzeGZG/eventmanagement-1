```typescript
import React from 'react';
import { motion } from 'framer-motion';

interface FocusIndicatorProps {
  visible: boolean;
  position: { x: number; y: number; width: number; height: number };
}

export const FocusIndicator: React.FC<FocusIndicatorProps> = ({
  visible,
  position
}) => {
  if (!visible) return null;

  return (
    <motion.div
      className="absolute pointer-events-none border-2 border-fjs-gold rounded-lg"
      initial={false}
      animate={{
        x: position.x,
        y: position.y,
        width: position.width,
        height: position.height,
        opacity: 1
      }}
      transition={{ duration: 0.2 }}
    />
  );
};
```