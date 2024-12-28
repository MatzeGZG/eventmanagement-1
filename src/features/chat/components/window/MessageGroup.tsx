```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { ChatMessage } from '../../types';
import { MessageBubble } from './MessageBubble';
import { formatDate } from '../../../../utils/date';

interface MessageGroupProps {
  messages: ChatMessage[];
  isOwnMessage: boolean;
}

export const MessageGroup: React.FC<MessageGroupProps> = ({ messages, isOwnMessage }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'} space-y-1`}
    >
      {messages.map((message, index) => (
        <MessageBubble
          key={message.id}
          message={message}
          isOwnMessage={isOwnMessage}
          showAuthor={index === 0}
          showTimestamp={index === messages.length - 1}
        />
      ))}
      <div className="text-xs text-fjs-silver px-2">
        {formatDate(messages[messages.length - 1].createdAt)}
      </div>
    </motion.div>
  );
};
```