```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { Message } from '../../types';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { useMessageThread } from '../../hooks/useMessageThread';

interface MessageThreadProps {
  parentMessage: Message;
  onClose: () => void;
}

export const MessageThread: React.FC<MessageThreadProps> = ({
  parentMessage,
  onClose
}) => {
  const { replies, sendReply } = useMessageThread(parentMessage.id);

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="absolute top-0 right-0 bottom-0 w-80 bg-fjs-charcoal border-l border-black/20"
    >
      <div className="flex items-center justify-between p-4 border-b border-black/20">
        <div className="flex items-center">
          <MessageCircle className="w-5 h-5 text-fjs-gold mr-2" />
          <h3 className="text-lg font-semibold text-fjs-gold">Thread</h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-fjs-silver hover:text-fjs-gold rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col h-[calc(100%-8rem)]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <MessageBubble message={parentMessage} isThread />
          {replies.map(reply => (
            <MessageBubble key={reply.id} message={reply} isThread />
          ))}
        </div>

        <div className="p-4 border-t border-black/20">
          <MessageInput onSend={sendReply} placeholder="Reply to thread..." />
        </div>
      </div>
    </motion.div>
  );
};
```