import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ChatRequest } from '../../types';
import { useChat } from '../../../../contexts/ChatContext';

interface ChatRequestItemProps {
  request: ChatRequest;
}

export const ChatRequestItem: React.FC<ChatRequestItemProps> = ({ request }) => {
  const { acceptChatRequest, declineChatRequest } = useChat();

  return (
    <div className="p-4 border-b border-fjs-charcoal">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 rounded-full bg-fjs-charcoal flex items-center justify-center">
          <span className="text-fjs-gold font-medium">
            {request.senderId.charAt(0).toUpperCase()}
          </span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="font-medium text-white">{request.senderId}</span>
            <span className="text-xs text-fjs-silver">
              {formatDistanceToNow(request.createdAt, { addSuffix: true })}
            </span>
          </div>
          
          {request.message && (
            <p className="text-sm text-fjs-silver mt-1">{request.message}</p>
          )}

          <div className="flex items-center space-x-2 mt-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => acceptChatRequest(request.id)}
              className="flex-1 bg-fjs-gold text-black py-1.5 rounded-lg font-medium 
                       hover:bg-fjs-light-gold transition-colors"
            >
              <Check className="w-4 h-4 inline-block mr-1" />
              Accept
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => declineChatRequest(request.id)}
              className="flex-1 bg-fjs-charcoal text-fjs-silver py-1.5 rounded-lg font-medium
                       hover:bg-black/20 transition-colors"
            >
              <X className="w-4 h-4 inline-block mr-1" />
              Decline
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};