```typescript
import React, { useState, useEffect } from 'react';
import { Send, Image, Smile, Bell } from 'lucide-react';
import { useStore } from '../../../store';
import { useChat } from '../hooks/useChat';
import { MessageList } from './MessageList';
import { ChatRoomList } from './ChatRoomList';
import { colors } from '../../../styles/colors';

export const ChatInterface: React.FC = () => {
  const [message, setMessage] = useState('');
  const user = useStore(state => state.user);
  const { 
    activeRoom,
    sendMessage,
    markAsRead,
    rooms,
    setActiveRoom 
  } = useChat();

  useEffect(() => {
    if (activeRoom) {
      markAsRead(activeRoom.id);
    }
  }, [activeRoom, markAsRead]);

  const handleSend = () => {
    if (!message.trim() || !activeRoom || !user) return;

    sendMessage({
      id: crypto.randomUUID(),
      senderId: user.id,
      content: message,
      timestamp: new Date(),
      readBy: [user.id]
    });

    setMessage('');
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Chat Rooms List */}
      <div className="w-80 bg-black border-r border-fjs-charcoal">
        <ChatRoomList
          rooms={rooms}
          activeRoomId={activeRoom?.id}
          onRoomSelect={setActiveRoom}
        />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-black">
        {activeRoom ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-fjs-charcoal">
              <h3 className="text-fjs-gold font-semibold">{activeRoom.name}</h3>
              <p className="text-sm text-fjs-silver">
                {activeRoom.participants.length} participants
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              <MessageList roomId={activeRoom.id} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-fjs-charcoal">
              <div className="flex items-center space-x-2">
                <button className="p-2 text-fjs-gold hover:bg-fjs-charcoal rounded-full">
                  <Image className="w-5 h-5" />
                </button>
                <button className="p-2 text-fjs-gold hover:bg-fjs-charcoal rounded-full">
                  <Smile className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 bg-fjs-charcoal text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-fjs-gold"
                />
                <button
                  onClick={handleSend}
                  className="p-2 text-fjs-gold hover:bg-fjs-charcoal rounded-full"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-fjs-silver">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};
```