```typescript
interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
}

export class PerformanceMetrics {
  private static metrics: PerformanceMetric[] = [];
  private static maxMetrics = 1000;

  static record(name: string, value: number): void {
    this.metrics.push({
      name,
      value,
      timestamp: Date.now()
    });

    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }
  }

  static getMetrics(name: string): PerformanceMetric[] {
    return this.metrics.filter(metric => metric.name === name);
  }

  static getAverageValue(name: string): number {
    const metrics = this.getMetrics(name);
    if (metrics.length === 0) return 0;
    
    const sum = metrics.reduce((acc, metric) => acc + metric.value, 0);
    return sum / metrics.length;
  }

  static clear(): void {
    this.metrics = [];
  }
}
```