```typescript
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Check } from 'lucide-react';
import { useCalendarSync } from '../../hooks/useCalendarSync';

interface CalendarSyncButtonProps {
  provider: {
    id: string;
    name: string;
    type: 'google' | 'apple' | 'outlook';
  };
}

export const CalendarSyncButton: React.FC<CalendarSyncButtonProps> = ({ provider }) => {
  const { syncing, syncWithProvider } = useCalendarSync();
  const [syncComplete, setSyncComplete] = useState(false);

  const handleSync = async () => {
    const result = await syncWithProvider({
      provider: { ...provider, connected: true },
      syncDirection: 'both',
      dateRange: {
        start: new Date(),
        end: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days
      }
    });

    if (result.success) {
      setSyncComplete(true);
      setTimeout(() => setSyncComplete(false), 2000);
    }
  };

  return (
    <motion.button
      onClick={handleSync}
      disabled={syncing}
      className={`
        flex items-center justify-center px-4 py-2 rounded-lg
        ${syncComplete
          ? 'bg-green-500 text-white'
          : 'bg-fjs-gold text-black hover:bg-fjs-light-gold'
        }
        transition-colors disabled:opacity-50
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {syncing ? (
        <RefreshCw className="w-5 h-5 animate-spin" />
      ) : syncComplete ? (
        <Check className="w-5 h-5" />
      ) : (
        <>
          <RefreshCw className="w-5 h-5 mr-2" />
          Sync with {provider.name}
        </>
      )}
    </motion.button>
  );
};
```