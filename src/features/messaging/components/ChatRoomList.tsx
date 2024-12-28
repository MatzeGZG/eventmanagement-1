```typescript
import React from 'react';
import { Users, Calendar, MessageCircle } from 'lucide-react';
import { ChatRoom } from '../types';
import { format } from 'date-fns';

interface ChatRoomListProps {
  rooms: ChatRoom[];
  activeRoomId?: string;
  onRoomSelect: (room: ChatRoom) => void;
}

export const ChatRoomList: React.FC<ChatRoomListProps> = ({
  rooms,
  activeRoomId,
  onRoomSelect
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-fjs-charcoal">
        <h2 className="text-fjs-gold font-semibold">Messages</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {rooms.map((room) => (
          <button
            key={room.id}
            onClick={() => onRoomSelect(room)}
            className={`w-full p-4 flex items-center space-x-3 hover:bg-fjs-charcoal transition-colors ${
              room.id === activeRoomId ? 'bg-fjs-charcoal' : ''
            }`}
          >
            {/* Room Icon */}
            <div className="w-10 h-10 rounded-full bg-fjs-gold flex items-center justify-center">
              {room.type === 'group' ? (
                <Users className="w-5 h-5 text-black" />
              ) : room.type === 'event' ? (
                <Calendar className="w-5 h-5 text-black" />
              ) : (
                <MessageCircle className="w-5 h-5 text-black" />
              )}
            </div>

            {/* Room Info */}
            <div className="flex-1 text-left">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">
                  {room.name || 'Chat Room'}
                </span>
                {room.lastMessage && (
                  <span className="text-xs text-fjs-silver">
                    {format(room.lastMessage.timestamp, 'HH:mm')}
                  </span>
                )}
              </div>
              {room.lastMessage && (
                <p className="text-sm text-fjs-silver truncate">
                  {room.lastMessage.content}
                </p>
              )}
            </div>

            {/* Unread Count */}
            {room.unreadCount > 0 && (
              <div className="w-5 h-5 rounded-full bg-fjs-gold text-black text-xs flex items-center justify-center">
                {room.unreadCount}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
```