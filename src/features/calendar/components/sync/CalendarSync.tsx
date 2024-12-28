```typescript
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, RefreshCw, Check } from 'lucide-react';
import { useCalendarSync } from '../../hooks/useCalendarSync';
import { SyncProvider } from '../../types';

export const CalendarSync: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = useState<SyncProvider | null>(null);
  const { syncing, syncWithProvider } = useCalendarSync();

  const providers: Array<{ id: SyncProvider; name: string }> = [
    { id: 'google', name: 'Google Calendar' },
    { id: 'apple', name: 'Apple Calendar' },
    { id: 'outlook', name: 'Outlook Calendar' }
  ];

  const handleSync = async (provider: SyncProvider) => {
    setSelectedProvider(provider);
    await syncWithProvider({
      provider,
      syncDirection: 'both',
      dateRange: {
        start: new Date(),
        end: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days
      }
    });
  };

  return (
    <div className="space-y-4">
      {providers.map(({ id, name }) => (
        <motion.button
          key={id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSync(id)}
          disabled={syncing}
          className="w-full flex items-center justify-between p-4 bg-fjs-charcoal 
                   rounded-lg hover:shadow-lg hover:shadow-fjs-gold/10 transition-all"
        >
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-fjs-gold mr-3" />
            <span className="text-white">{name}</span>
          </div>
          
          {syncing && selectedProvider === id ? (
            <RefreshCw className="w-5 h-5 text-fjs-gold animate-spin" />
          ) : selectedProvider === id ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : null}
        </motion.button>
      ))}
    </div>
  );
};
```