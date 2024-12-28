import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { ChatMessage as ChatMessageType } from '../../types';
import { useStore } from '../../../../store';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const user = useStore(state => state.user);
  const isOwnMessage = message.senderId === user?.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[70%] rounded-lg p-3 ${
        isOwnMessage 
          ? 'bg-fjs-gold text-black' 
          : 'bg-fjs-charcoal text-white'
      }`}>
        {!isOwnMessage && (
          <div className="text-xs text-fjs-silver mb-1">
            {message.senderId}
          </div>
        )}
        <div className="break-words">{message.content}</div>
        <div className="text-xs mt-1 opacity-75">
          {formatDistanceToNow(message.createdAt, { addSuffix: true })}
        </div>
      </div>
    </motion.div>
  );
};