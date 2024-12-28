interface APIMetrics {
  successRate: number;
  successRateTrend: number;
  avgResponseTime: number;
  responseTrend: number;
  errorRate: number;
  errorTrend: number;
  availability: number;
  availabilityTrend: number;
}

export interface API {
  id: string;
  name: string;
  description: string;
  status: 'running' | 'stopped' | 'error';
  requestsPerMinute: number;
  uptime: string;
  metrics: APIMetrics;
}

export interface APIStats {
  totalRequests: number;
  requestsPerSecond: number;
  successRate: number;
  errorRate: number;
  totalErrors: number;
  avgResponseTime: number;
}