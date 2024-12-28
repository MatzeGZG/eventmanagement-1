```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { ChatMessage } from '../../types';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';

interface MessageThreadProps {
  parentMessage: ChatMessage;
  replies: ChatMessage[];
  onClose: () => void;
}

export const MessageThread: React.FC<MessageThreadProps> = ({
  parentMessage,
  replies,
  onClose
}) => {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="absolute top-0 right-0 bottom-0 w-80 bg-fjs-charcoal border-l border-black/20"
    >
      {/* Thread Header */}
      <div className="p-4 border-b border-black/20 flex items-center justify-between">
        <div className="flex items-center">
          <MessageCircle className="w-5 h-5 text-fjs-gold mr-2" />
          <h3 className="text-lg font-semibold text-fjs-gold">Thread</h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-fjs-silver hover:text-fjs-gold rounded-full hover:bg-black/20"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Parent Message */}
      <div className="p-4 border-b border-black/20 bg-black/10">
        <MessageBubble message={parentMessage} isOwnMessage={false} showAuthor showTimestamp />
      </div>

      {/* Thread Replies */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {replies.map((reply) => (
          <MessageBubble
            key={reply.id}
            message={reply}
            isOwnMessage={false}
            showAuthor
            showTimestamp
          />
        ))}
      </div>

      {/* Thread Input */}
      <div className="p-4 border-t border-black/20">
        <ChatInput roomId={parentMessage.roomId} replyTo={parentMessage.id} />
      </div>
    </motion.div>
  );
};
```