```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useChat } from '../hooks/useChat';
import { ChatRoomList } from './ChatRoomList';
import { ChatWindow } from './window/ChatWindow';
import { ChatRequests } from './requests/ChatRequests';

export const ChatContainer: React.FC = () => {
  const { recentChats, unreadCount, markAsRead } = useChat();

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-black">
      {/* Chat Rooms List */}
      <div className="w-80 border-r border-fjs-charcoal">
        <ChatRoomList chats={recentChats} unreadCount={unreadCount} />
      </div>

      {/* Main Chat Area */}
      <motion.div 
        className="flex-1 flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <ChatWindow onMessageRead={markAsRead} />
      </motion.div>

      {/* Chat Requests */}
      <ChatRequests />
    </div>
  );
};
```