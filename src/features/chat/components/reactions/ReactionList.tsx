```typescript
import React from 'react';
import { motion } from 'framer-motion';

interface ReactionListProps {
  reactions: Record<string, string[]>;
  onReactionClick?: (emoji: string) => void;
  maxDisplay?: number;
}

export const ReactionList: React.FC<ReactionListProps> = ({
  reactions,
  onReactionClick,
  maxDisplay = 3
}) => {
  const sortedReactions = Object.entries(reactions)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, maxDisplay);

  const totalOthers = Object.entries(reactions)
    .slice(maxDisplay)
    .reduce((acc, [_, users]) => acc + users.length, 0);

  return (
    <div className="flex flex-wrap gap-1">
      {sortedReactions.map(([emoji, users]) => (
        <motion.button
          key={emoji}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onReactionClick?.(emoji)}
          className="inline-flex items-center space-x-1 px-2 py-1 bg-black/20 
                   rounded-full text-sm hover:bg-black/30 transition-colors"
        >
          <span>{emoji}</span>
          <span className="text-xs text-fjs-silver">{users.length}</span>
        </motion.button>
      ))}

      {totalOthers > 0 && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center px-2 py-1 bg-black/20 rounded-full 
                   text-xs text-fjs-silver hover:bg-black/30 transition-colors"
        >
          +{totalOthers} more
        </motion.button>
      )}
    </div>
  );
};
```