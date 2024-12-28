import React from 'react';
import { Power, Activity, Clock, Settings } from 'lucide-react';
import { API } from '../../types/api';
import { useAPIControl } from '../../hooks/useAPIControl';

interface APIListProps {
  apis: API[];
  loading: boolean;
}

export const APIList: React.FC<APIListProps> = ({ apis, loading }) => {
  const { toggleAPI, restartAPI } = useAPIControl();

  if (loading) {
    return <div>Loading APIs...</div>;
  }

  return (
    <div className="bg-fjs-charcoal rounded-xl p-6">
      <div className="space-y-4">
        {apis.map((api) => (
          <div
            key={api.id}
            className="bg-black/20 rounded-lg p-4 hover:bg-black/30 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  api.status === 'running' ? 'bg-green-500' :
                  api.status === 'stopped' ? 'bg-red-500' :
                  'bg-yellow-500'
                }`} />
                <div>
                  <h4 className="text-white font-medium">{api.name}</h4>
                  <p className="text-sm text-fjs-silver">{api.description}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="flex items-center text-sm text-fjs-silver">
                    <Activity className="w-4 h-4 mr-1" />
                    {api.requestsPerMinute} req/min
                  </div>
                  <div className="flex items-center text-sm text-fjs-silver">
                    <Clock className="w-4 h-4 mr-1" />
                    {api.uptime} uptime
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleAPI(api.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      api.status === 'running'
                        ? 'text-red-400 hover:bg-red-400/10'
                        : 'text-green-400 hover:bg-green-400/10'
                    }`}
                  >
                    <Power className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => restartAPI(api.id)}
                    className="p-2 text-fjs-gold hover:bg-fjs-gold/10 rounded-lg"
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* API Metrics */}
            <div className="mt-4 grid grid-cols-4 gap-4">
              <MetricCard
                label="Success Rate"
                value={`${api.metrics.successRate}%`}
                trend={api.metrics.successRateTrend}
              />
              <MetricCard
                label="Avg Response Time"
                value={`${api.metrics.avgResponseTime}ms`}
                trend={api.metrics.responseTrend}
              />
              <MetricCard
                label="Error Rate"
                value={`${api.metrics.errorRate}%`}
                trend={api.metrics.errorTrend}
                inverse
              />
              <MetricCard
                label="Availability"
                value={`${api.metrics.availability}%`}
                trend={api.metrics.availabilityTrend}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface MetricCardProps {
  label: string;
  value: string;
  trend: number;
  inverse?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, trend, inverse }) => {
  const isPositive = inverse ? trend < 0 : trend > 0;
  
  return (
    <div className="bg-black/10 rounded-lg p-3">
      <div className="text-sm text-fjs-silver mb-1">{label}</div>
      <div className="flex items-center justify-between">
        <span className="text-white font-medium">{value}</span>
        <span className={`text-xs ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      </div>
    </div>
  );
};