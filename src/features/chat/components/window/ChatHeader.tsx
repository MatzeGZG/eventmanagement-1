```typescript
import React from 'react';
import { Users, Info, Search } from 'lucide-react';
import { ChatRoom } from '../../types';
import { MessageSearch } from './MessageSearch';
import { useChat } from '../../../../contexts/ChatContext';

interface ChatHeaderProps {
  room: ChatRoom;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ room }) => {
  const { messages } = useChat();
  const roomMessages = messages[room.id] || [];

  const scrollToMessage = (messageId: string) => {
    const element = document.getElementById(`message-${messageId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('highlight-message');
      setTimeout(() => element.classList.remove('highlight-message'), 2000);
    }
  };

  return (
    <div className="p-4 border-b border-fjs-charcoal flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold text-fjs-gold">{room.name}</h2>
        <div className="flex items-center text-fjs-silver">
          <Users className="w-4 h-4 mr-1" />
          <span className="text-sm">100 members</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <MessageSearch 
          messages={roomMessages}
          onResultSelect={scrollToMessage}
        />
        <button className="p-2 text-fjs-silver hover:text-fjs-gold hover:bg-black/20 rounded-full transition-colors">
          <Info className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
```