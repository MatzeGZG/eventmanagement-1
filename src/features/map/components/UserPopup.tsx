import React from 'react';
import { MessageCircle, UserPlus } from 'lucide-react';
import { User } from '../../../types/user';
import { motion } from 'framer-motion';

interface UserPopupProps {
  user: User;
  onMessage: (userId: string) => void;
  onConnect: (userId: string) => void;
}

export const UserPopup: React.FC<UserPopupProps> = ({ user, onMessage, onConnect }) => {
  return (
    <div className="p-4 max-w-sm bg-black rounded-lg">
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={user.avatar || 'https://via.placeholder.com/40'}
          alt={user.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="font-medium text-fjs-gold">{user.name}</h3>
          <p className="text-sm text-fjs-silver">{user.level}</p>
        </div>
      </div>

      <div className="flex space-x-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onMessage(user.id)}
          className="flex-1 flex items-center justify-center px-3 py-2 bg-fjs-gold text-black rounded-lg"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Message
        </motion.button>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onConnect(user.id)}
          className="flex-1 flex items-center justify-center px-3 py-2 bg-fjs-charcoal text-fjs-gold rounded-lg"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Connect
        </motion.button>
      </div>
    </div>
  );
};