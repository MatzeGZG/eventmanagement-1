import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, MessageCircle } from 'lucide-react';
import { User } from '../../../../types/user';
import { useSocialActions } from '../../../social/hooks/useSocialActions';

interface SocialConnectionsProps {
  connections: User[];
}

export const SocialConnections: React.FC<SocialConnectionsProps> = ({ connections }) => {
  const { connectWithUser } = useSocialActions();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-fjs-charcoal rounded-xl p-6"
    >
      <h3 className="text-lg font-semibold text-fjs-gold mb-4">Connections</h3>
      
      <div className="space-y-4">
        {connections.map((connection) => (
          <div
            key={connection.id}
            className="flex items-center justify-between p-3 bg-black/20 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <img
                src={connection.avatar || 'https://via.placeholder.com/40'}
                alt={connection.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-medium text-white">{connection.name}</div>
                <div className="text-sm text-fjs-silver">{connection.level}</div>
              </div>
            </div>

            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-fjs-gold hover:bg-black/20 rounded-lg"
              >
                <MessageCircle className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => connectWithUser(connection.id)}
                className="p-2 text-fjs-gold hover:bg-black/20 rounded-lg"
              >
                <UserPlus className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};