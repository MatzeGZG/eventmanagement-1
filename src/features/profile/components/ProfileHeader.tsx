```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Edit, MapPin, Calendar } from 'lucide-react';
import { User } from '../../../types/user';
import { formatDate } from '../../../utils/date';

interface ProfileHeaderProps {
  user: User;
  onEdit?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, onEdit }) => {
  return (
    <motion.div 
      className="relative bg-gradient-dark rounded-xl p-6 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-fjs-gold/20 to-transparent" />
      </div>

      <div className="relative flex items-start gap-6">
        {/* Avatar */}
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-fjs-gold">
            <img
              src={user.avatar || 'https://via.placeholder.com/96'}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          {user.online && (
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full ring-2 ring-black" />
          )}
        </motion.div>

        {/* User Info */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-fjs-gold">{user.name}</h1>
              <p className="text-fjs-silver">{user.level}</p>
            </div>
            {onEdit && (
              <motion.button
                onClick={onEdit}
                className="p-2 text-fjs-gold hover:bg-fjs-charcoal rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit className="w-5 h-5" />
              </motion.button>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center text-fjs-silver">
              <MapPin className="w-4 h-4 mr-1" />
              {user.location || 'Location not set'}
            </div>
            <div className="flex items-center text-fjs-silver">
              <Calendar className="w-4 h-4 mr-1" />
              Joined {formatDate(user.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
```