```typescript
import React from 'react';
import { motion } from 'framer-motion';

export const ChatRoomSkeleton: React.FC = () => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="p-4 border-b border-fjs-charcoal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-fjs-charcoal animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-fjs-charcoal rounded animate-pulse w-2/3" />
              <div className="h-3 bg-fjs-charcoal rounded animate-pulse w-1/2" />
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
};
```