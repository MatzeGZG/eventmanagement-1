import React from 'react';
import { Users, Calendar, MessageCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ChatRoom } from '../../types';
import { useChat } from '../../../../contexts/ChatContext';

interface ChatRoomItemProps {
  room: ChatRoom;
}

export const ChatRoomItem: React.FC<ChatRoomItemProps> = ({ room }) => {
  const { activeRoom, setActiveRoom } = useChat();
  const isActive = activeRoom?.id === room.id;

  const getIcon = () => {
    switch (room.type) {
      case 'group':
        return <Users className="w-5 h-5" />;
      case 'event':
        return <Calendar className="w-5 h-5" />;
      default:
        return <MessageCircle className="w-5 h-5" />;
    }
  };

  return (
    <button
      onClick={() => setActiveRoom(room.id)}
      className={`w-full p-4 flex items-center space-x-3 hover:bg-fjs-charcoal transition-colors
                ${isActive ? 'bg-fjs-charcoal' : ''}`}
    >
      <div className={`w-10 h-10 rounded-full bg-black/30 flex items-center justify-center
                    ${isActive ? 'text-fjs-gold' : 'text-fjs-silver'}`}>
        {getIcon()}
      </div>
      
      <div className="flex-1 text-left">
        <div className="flex items-center justify-between">
          <span className={`font-medium ${isActive ? 'text-fjs-gold' : 'text-white'}`}>
            {room.name}
          </span>
          <span className="text-xs text-fjs-silver">
            {formatDistanceToNow(room.updatedAt, { addSuffix: true })}
          </span>
        </div>
        {room.description && (
          <p className="text-sm text-fjs-silver truncate">{room.description}</p>
        )}
      </div>
    </button>
  );
};