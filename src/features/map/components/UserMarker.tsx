import React from 'react';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';
import { User as UserType } from '../../../types/user';

interface UserMarkerProps {
  user: UserType;
  onClick: (user: UserType) => void;
}

export const UserMarker: React.FC<UserMarkerProps> = ({ user, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      onClick={() => onClick(user)}
      className="relative"
    >
      <div className="w-8 h-8 rounded-full bg-fjs-charcoal flex items-center justify-center">
        <User className="w-5 h-5 text-fjs-gold" />
      </div>
      {user.online && (
        <div className="absolute -right-1 -top-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
      )}
    </motion.button>
  );
};