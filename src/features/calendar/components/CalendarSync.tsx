import React, { useState } from 'react';
import { Calendar, RefreshCw, Check, X } from 'lucide-react';
import { useCalendarSync } from '../hooks/useCalendarSync';
import { CalendarProvider, SyncConfig } from '../types/sync';

export const CalendarSync: React.FC = () => {
  const { syncing, lastSyncResult, syncWithProvider } = useCalendarSync();
  const [selectedProvider, setSelectedProvider] = useState<CalendarProvider | null>(null);

  const handleSync = async (provider: CalendarProvider) => {
    const config: SyncConfig = {
      provider,
      syncDirection: 'both',
      autoSync: true,
      syncInterval: 30
    };

    try {
      await syncWithProvider(provider, config);
    } catch (error) {
      console.error('Sync failed:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Calendar Sync</h3>
        {lastSyncResult && (
          <div className="text-sm text-gray-500">
            Last synced: {lastSyncResult.timestamp.toLocaleTimeString()}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <CalendarProviderCard
          provider={{
            id: 'google',
            name: 'Google Calendar',
            type: 'google',
            connected: false
          }}
          onSync={handleSync}
          syncing={syncing}
        />

        <CalendarProviderCard
          provider={{
            id: 'apple',
            name: 'Apple Calendar',
            type: 'apple',
            connected: false
          }}
          onSync={handleSync}
          syncing={syncing}
        />

        <CalendarProviderCard
          provider={{
            id: 'microsoft',
            name: 'Microsoft Calendar',
            type: 'microsoft',
            connected: false
          }}
          onSync={handleSync}
          syncing={syncing}
        />
      </div>
    </div>
  );
};

interface CalendarProviderCardProps {
  provider: CalendarProvider;
  onSync: (provider: CalendarProvider) => void;
  syncing: boolean;
}

const CalendarProviderCard: React.FC<CalendarProviderCardProps> = ({
  provider,
  onSync,
  syncing
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-4">
        <Calendar className="w-6 h-6 text-indigo-600" />
        <div>
          <h4 className="font-medium text-gray-900">{provider.name}</h4>
          <p className="text-sm text-gray-500">
            {provider.connected ? 'Connected' : 'Not connected'}
          </p>
        </div>
      </div>

      <button
        onClick={() => onSync(provider)}
        disabled={syncing || !provider.connected}
        className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
          provider.connected
            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        {syncing ? (
          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <RefreshCw className="w-4 h-4 mr-2" />
        )}
        Sync
      </button>
    </div>
  );
};