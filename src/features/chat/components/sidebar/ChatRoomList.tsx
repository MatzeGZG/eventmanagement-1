import React from 'react';
import { motion } from 'framer-motion';
import { ChatRoom } from '../../types';
import { ChatRoomItem } from './ChatRoomItem';

interface ChatRoomListProps {
  rooms: ChatRoom[];
}

export const ChatRoomList: React.FC<ChatRoomListProps> = ({ rooms }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {rooms.map((room, index) => (
        <motion.div
          key={room.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <ChatRoomItem room={room} />
        </motion.div>
      ))}
    </div>
  );
};