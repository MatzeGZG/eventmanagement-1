import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, MessageSquarePlus } from 'lucide-react';
import { useChat } from '../../../features/chat/hooks/useChat';
import { ChatDropdown } from './ChatDropdown';

export const ChatButton: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { unreadCount } = useChat();

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowDropdown(!showDropdown)}
        className="p-2 hover:bg-fjs-charcoal rounded-full transition-colors relative"
      >
        {unreadCount > 0 ? (
          <MessageSquarePlus className="w-6 h-6 text-fjs-gold" />
        ) : (
          <MessageCircle className="w-6 h-6 text-fjs-gold" />
        )}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-fjs-gold text-black text-xs font-medium rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {showDropdown && (
          <ChatDropdown onClose={() => setShowDropdown(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};