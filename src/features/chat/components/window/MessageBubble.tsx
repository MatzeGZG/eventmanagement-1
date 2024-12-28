```typescript
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Reply, MoreHorizontal } from 'lucide-react';
import { ChatMessage } from '../../types';
import { MessageActions } from './MessageActions';
import { ReactionList } from '../reactions/ReactionList';
import { MessageThread } from './MessageThread';

interface MessageBubbleProps {
  message: ChatMessage;
  isOwnMessage: boolean;
  showAuthor?: boolean;
  showTimestamp?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwnMessage,
  showAuthor,
  showTimestamp
}) => {
  const [showActions, setShowActions] = useState(false);
  const [showThread, setShowThread] = useState(false);

  const handleReply = () => {
    setShowThread(true);
  };

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {showAuthor && !isOwnMessage && (
        <div className="text-xs text-fjs-silver mb-1 ml-2">
          {message.senderId}
        </div>
      )}

      <div className="flex items-start space-x-2">
        <motion.div
          className={`max-w-[70%] rounded-lg p-3 ${
            isOwnMessage 
              ? 'bg-fjs-gold text-black' 
              : 'bg-fjs-charcoal text-white'
          }`}
        >
          {message.content}
          
          {message.replyTo && (
            <div className="mt-1 text-xs opacity-75">
              Replying to a message
            </div>
          )}

          {message.reactions && Object.keys(message.reactions).length > 0 && (
            <div className="mt-2">
              <ReactionList reactions={message.reactions} />
            </div>
          )}
        </motion.div>

        {showActions && (
          <MessageActions
            message={message}
            isOwnMessage={isOwnMessage}
            onReply={handleReply}
          />
        )}
      </div>

      {message.replyCount > 0 && (
        <button
          onClick={() => setShowThread(true)}
          className="ml-2 mt-1 text-xs text-fjs-silver hover:text-fjs-gold"
        >
          {message.replyCount} {message.replyCount === 1 ? 'reply' : 'replies'}
        </button>
      )}

      {showThread && (
        <MessageThread
          parentMessage={message}
          replies={[]}
          onClose={() => setShowThread(false)}
        />
      )}
    </div>
  );
};
```