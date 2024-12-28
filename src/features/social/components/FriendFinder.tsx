```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus } from 'lucide-react';
import { useFriendSuggestions } from '../hooks/useFriendSuggestions';
import { usePoints } from '../../../hooks/usePoints';

export const FriendFinder: React.FC = () => {
  const { suggestions, loading, sendFriendRequest } = useFriendSuggestions();
  const { awardPoints } = usePoints();

  const handleConnect = async (userId: string) => {
    await sendFriendRequest(userId);
    awardPoints(10); // Award points for social engagement
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-fjs-gold">
          People You May Know
        </h2>
        <Users className="w-6 h-6 text-fjs-gold" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-fjs-charcoal rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar || 'https://via.placeholder.com/40'}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-medium text-white">{user.name}</h3>
                  <p className="text-sm text-fjs-silver">{user.mutualConnections} mutual connections</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleConnect(user.id)}
                className="p-2 text-fjs-gold hover:bg-black/20 rounded-lg"
              >
                <UserPlus className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
```