```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

interface EventSyncIndicatorProps {
  syncing: boolean;
  lastSynced: Date | null;
}

export const EventSyncIndicator: React.FC<EventSyncIndicatorProps> = ({
  syncing,
  lastSynced
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="absolute bottom-20 left-4 bg-black/80 rounded-lg p-2 text-sm"
  >
    <div className="flex items-center space-x-2">
      <RefreshCw 
        className={`w-4 h-4 text-fjs-gold ${syncing ? 'animate-spin' : ''}`} 
      />
      <span className="text-fjs-silver">
        {syncing 
          ? 'Syncing views...'
          : lastSynced 
            ? `Last synced: ${lastSynced.toLocaleTimeString()}`
            : 'Views in sync'
        }
      </span>
    </div>
  </motion.div>
);
```