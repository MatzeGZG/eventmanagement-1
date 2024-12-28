```typescript
import React from 'react';
import { motion } from 'framer-motion';

interface DroppableCellProps {
  date: Date;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (date: Date, e: React.DragEvent) => void;
  children: React.ReactNode;
}

export const DroppableCell: React.FC<DroppableCellProps> = ({
  date,
  onDragOver,
  onDragLeave,
  onDrop,
  children
}) => {
  return (
    <motion.div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(date, e)}
      className="min-h-[100px] p-2 border border-fjs-charcoal rounded-lg
                transition-colors duration-200"
      initial={false}
      animate={{ 
        backgroundColor: 'transparent'
      }}
    >
      {children}
    </motion.div>
  );
};
```