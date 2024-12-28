import React from 'react';
import { ChatRoom } from '../../types';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';

interface ChatWindowProps {
  room: ChatRoom;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ room }) => {
  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader room={room} />
      <ChatMessages roomId={room.id} />
      <ChatInput roomId={room.id} />
    </div>
  );
};