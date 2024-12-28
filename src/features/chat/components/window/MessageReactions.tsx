```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { Smile } from 'lucide-react';

interface MessageReactionsProps {
  reactions: Record<string, string[]>;
  onReact: (emoji: string) => void;
}

export const MessageReactions: React.FC<MessageReactionsProps> = ({
  reactions,
  onReact
}) => {
  const commonEmojis = ['👍', '❤️', '😂', '🎉', '🤔', '👏'];

  return (
    <div className="mt-1 flex flex-wrap gap-1">
      {Object.entries(reactions).map(([emoji, users]) => (
        <motion.button
          key={emoji}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onReact(emoji)}
          className="inline-flex items-center space-x-1 px-2 py-1 bg-black/20 
                   rounded-full text-sm hover:bg-black/30 transition-colors"
        >
          <span>{emoji}</span>
          <span className="text-xs text-fjs-silver">{users.length}</span>
        </motion.button>
      ))}
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="p-1 text-fjs-silver hover:text-fjs-gold rounded-full 
                 hover:bg-black/20 transition-colors"
      >
        <Smile className="w-4 h-4" />
      </motion.button>
    </div>
  );
};
```