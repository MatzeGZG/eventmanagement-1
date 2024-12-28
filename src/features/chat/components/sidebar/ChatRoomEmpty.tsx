```typescript
import React from 'react';
import { MessageSquarePlus } from 'lucide-react';
import { motion } from 'framer-motion';

export const ChatRoomEmpty: React.FC = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full p-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <MessageSquarePlus className="w-12 h-12 text-fjs-gold mb-4" />
      <h3 className="text-lg font-semibold text-fjs-gold mb-2">
        No Chats Yet
      </h3>
      <p className="text-sm text-fjs-silver mb-4">
        Start connecting with other travelers and join event discussions
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 bg-gradient-gold text-black rounded-lg font-medium"
      >
        Start a Chat
      </motion.button>
    </motion.div>
  );
};
```