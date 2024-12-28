import React from 'react';
import { Search } from 'lucide-react';
import { useChat } from '../../../../contexts/ChatContext';
import { ChatRoomList } from './ChatRoomList';
import { ChatRoomFilter } from './ChatRoomFilter';

export const ChatSidebar: React.FC = () => {
  const { rooms } = useChat();

  return (
    <div className="w-80 border-r border-fjs-charcoal flex flex-col">
      <div className="p-4 border-b border-fjs-charcoal">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-fjs-gold w-5 h-5" />
          <input
            type="text"
            placeholder="Search chats..."
            className="w-full pl-10 pr-4 py-2 bg-fjs-charcoal text-white rounded-lg 
                     focus:ring-2 focus:ring-fjs-gold"
          />
        </div>
      </div>
      <ChatRoomFilter />
      <ChatRoomList rooms={rooms} />
    </div>
  );
};