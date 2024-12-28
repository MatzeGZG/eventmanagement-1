```typescript
import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatRoomSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const ChatRoomSearch: React.FC<ChatRoomSearchProps> = ({ value, onChange }) => {
  return (
    <div className="p-4 border-b border-fjs-charcoal">
      <motion.div 
        className="relative"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-fjs-gold w-5 h-5" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search chats..."
          className="w-full pl-10 pr-4 py-2 bg-fjs-charcoal text-white rounded-lg 
                   focus:ring-2 focus:ring-fjs-gold placeholder:text-fjs-silver/50"
        />
      </motion.div>
    </div>
  );
};
```