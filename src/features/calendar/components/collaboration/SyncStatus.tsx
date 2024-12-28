```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, CloudOff, RefreshCw } from 'lucide-react';
import { useCollaborationStatus } from '../../hooks/useCollaborationStatus';

interface SyncStatusProps {
  calendarId: string;
}

export const SyncStatus: React.FC<SyncStatusProps> = ({ calendarId }) => {
  const { status, sync } = useCollaborationStatus(calendarId);

  return (
    <div className="flex items-center space-x-2">
      {status.online ? (
        <Cloud className="w-5 h-5 text-fjs-gold" />
      ) : (
        <CloudOff className="w-5 h-5 text-red-500" />
      )}
      
      <span className="text-sm text-fjs-silver">
        {status.lastSynced && `Last synced ${new Date(status.lastSynced).toLocaleTimeString()}`}
      </span>

      {status.pendingChanges > 0 && (
        <span className="text-sm text-fjs-gold">
          {status.pendingChanges} pending changes
        </span>
      )}

      <motion.button
        onClick={sync}
        disabled={status.syncInProgress}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-1 text-fjs-gold hover:bg-black/20 rounded-full disabled:opacity-50"
      >
        <RefreshCw className={`w-5 h-5 ${status.syncInProgress ? 'animate-spin' : ''}`} />
      </motion.button>
    </div>
  );
};
```