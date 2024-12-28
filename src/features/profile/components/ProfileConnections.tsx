```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { User, UserPlus, MessageCircle } from 'lucide-react';
import { User as UserType } from '../../../types/user';

interface ProfileConnectionsProps {
  connections: UserType[];
  onConnect?: (userId: string) => void;
  onMessage?: (userId: string) => void;
}

export const ProfileConnections: React.FC<ProfileConnectionsProps> = ({
  connections,
  onConnect,
  onMessage
}) => {
  return (
    <motion.div
      className="bg-fjs-charcoal rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-xl font-semibold text-fjs-gold mb-4">Connections</h2>

      <div className="space-y-4">
        {connections.map((connection, index) => (
          <motion.div
            key={connection.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-black/20 rounded-lg hover:bg-black/30 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={connection.avatar || 'https://via.placeholder.com/40'}
                  alt={connection.name}
                  className="w-10 h-10 rounded-full"
                />
                {connection.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-black" />
                )}
              </div>
              <div>
                <div className="font-medium text-white">{connection.name}</div>
                <div className="text-sm text-fjs-silver">{connection.level}</div>
              </div>
            </div>

            <div className="flex space-x-2">
              {onMessage && (
                <motion.button
                  onClick={() => onMessage(connection.id)}
                  className="p-2 text-fjs-gold hover:bg-black/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle className="w-5 h-5" />
                </motion.button>
              )}
              {onConnect && (
                <motion.button
                  onClick={() => onConnect(connection.id)}
                  className="p-2 text-fjs-gold hover:bg-black/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <UserPlus className="w-5 h-5" />
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
```