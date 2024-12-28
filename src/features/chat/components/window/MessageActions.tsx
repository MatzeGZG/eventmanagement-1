```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { Reply, Trash2, MoreHorizontal } from 'lucide-react';
import { ChatMessage } from '../../types';

interface MessageActionsProps {
  message: ChatMessage;
  isOwnMessage: boolean;
  className?: string;
}

export const MessageActions: React.FC<MessageActionsProps> = ({
  message,
  isOwnMessage,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex items-center space-x-1 ${className}`}
    >
      <button className="p-1 rounded-full hover:bg-black/20 text-fjs-silver hover:text-fjs-gold transition-colors">
        <Reply className="w-4 h-4" />
      </button>
      {isOwnMessage && (
        <button className="p-1 rounded-full hover:bg-black/20 text-fjs-silver hover:text-red-500 transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      )}
      <button className="p-1 rounded-full hover:bg-black/20 text-fjs-silver hover:text-fjs-gold transition-colors">
        <MoreHorizontal className="w-4 h-4" />
      </button>
    </motion.div>
  );
};
```