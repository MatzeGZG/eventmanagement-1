```tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Reply } from 'lucide-react';
import { Message } from '../../types';
import { useStore } from '../../../../store';
import { ReactionPicker } from '../reactions/ReactionPicker';
import { useMessageReactions } from '../../hooks/useMessageReactions';
import { useReadReceipts } from '../../hooks/useReadReceipts';
import { formatDistanceToNow } from 'date-fns';

interface MessageBubbleProps {
  message: Message;
  isThread?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isThread }) => {
  const [showActions, setShowActions] = useState(false);
  const user = useStore(state => state.user);
  const { reactions, toggleReaction } = useMessageReactions(message.id);
  const { readBy, markAsRead } = useReadReceipts(message.id);
  
  const isOwnMessage = message.senderId === user?.id;

  React.useEffect(() => {
    if (!isOwnMessage && !readBy.includes(user?.id || '')) {
      markAsRead();
    }
  }, [isOwnMessage, readBy, user, markAsRead]);

  return (
    <div 
      className={`group flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="max-w-[70%]">
        <motion.div
          layout
          className={`rounded-lg p-3 ${
            isOwnMessage 
              ? 'bg-fjs-gold text-black' 
              : 'bg-fjs-charcoal text-white'
          }`}
        >
          {!isOwnMessage && !isThread && (
            <div className="text-xs text-fjs-silver mb-1">
              {message.senderId}
            </div>
          )}

          <div className="break-words">{message.content}</div>

          {/* Reactions */}
          {Object.keys(reactions).length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {Object.entries(reactions).map(([emoji, users]) => (
                <button
                  key={emoji}
                  onClick={() => toggleReaction(emoji)}
                  className="inline-flex items-center space-x-1 px-2 py-1 bg-black/20 rounded-full text-sm"
                >
                  <span>{emoji}</span>
                  <span className="text-xs">{users.length}</span>
                </button>
              ))}
            </div>
          )}

          <div className="mt-1 flex items-center justify-between text-xs opacity-75">
            <span>
              {formatDistanceToNow(message.createdAt, { addSuffix: true })}
            </span>
            {readBy.length > 0 && isOwnMessage && (
              <span>Read by {readBy.length}</span>
            )}
          </div>
        </motion.div>

        {/* Message Actions */}
        {showActions && !isThread && (
          <div className="flex items-center justify-end mt-1 space-x-2">
            <ReactionPicker
              onSelect={toggleReaction}
              existingReactions={reactions}
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1 text-fjs-silver hover:text-fjs-gold rounded-full"
            >
              <Reply className="w-4 h-4" />
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};
```