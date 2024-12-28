```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Plus } from 'lucide-react';
import { useGroups } from '../hooks/useGroups';

export const GroupList: React.FC = () => {
  const { groups, loading, joinGroup } = useGroups();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-fjs-gold">Groups</h2>
        <button className="flex items-center space-x-2 text-fjs-gold hover:text-fjs-light-gold">
          <Plus className="w-5 h-5" />
          <span>Create Group</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-fjs-charcoal rounded-lg overflow-hidden"
          >
            <div className="aspect-video relative">
              <img
                src={group.coverImage}
                alt={group.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-1">
                {group.name}
              </h3>
              <p className="text-sm text-fjs-silver mb-3">
                {group.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-fjs-silver">
                  <Users className="w-4 h-4 mr-1" />
                  {group.memberCount} members
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => joinGroup(group.id)}
                  className="px-4 py-2 bg-gradient-gold text-black rounded-lg font-medium"
                >
                  Join Group
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
```