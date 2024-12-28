import React from 'react';
import { Server } from 'lucide-react';
import { APIList } from './APIList';
import { APIStats } from './APIStats';
import { useAPIs } from '../../hooks/useAPIs';

export const APIOverview: React.FC = () => {
  const { apis, loading } = useAPIs();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Server className="w-6 h-6 text-fjs-gold" />
          <h2 className="text-xl font-semibold text-white">API Management</h2>
        </div>
      </div>

      <APIStats />
      <APIList apis={apis} loading={loading} />
    </div>
  );
};