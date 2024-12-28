```typescript
import React from 'react';
import { Users, Calendar, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const ChatRoomFilter: React.FC = () => {
  const filters = [
    { icon: MessageCircle, label: 'Direct', type: 'direct' },
    { icon: Users, label: 'Groups', type: 'group' },
    { icon: Calendar, label: 'Events', type: 'event' }
  ];

  return (
    <div className="p-4 border-b border-fjs-charcoal">
      <div className="flex space-x-2">
        {filters.map(({ icon: Icon, label, type }) => (
          <motion.button
            key={type}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 
                     bg-fjs-charcoal rounded-lg text-fjs-silver hover:text-fjs-gold 
                     transition-colors"
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium">{label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
```