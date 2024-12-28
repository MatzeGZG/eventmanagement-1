interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
}

export class PerformanceMonitor {
  private static metrics: PerformanceMetric[] = [];
  private static marks = new Map<string, number>();
  private static maxMetrics = 1000;

  static start(markName: string): void {
    if (process.env.NODE_ENV === 'development') {
      this.marks.set(markName, performance.now());
    }
  }

  static end(markName: string): void {
    if (process.env.NODE_ENV === 'development') {
      const startTime = this.marks.get(markName);
      if (startTime) {
        const duration = performance.now() - startTime;
        this.record(markName, duration);
        this.marks.delete(markName);
      }
    }
  }

  static record(name: string, value: number): void {
    this.metrics.push({
      name,
      value,
      timestamp: Date.now()
    });

    // Prevent memory leaks by limiting metrics array size
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }
  }

  static getMetrics(name: string): PerformanceMetric[] {
    return this.metrics.filter(metric => metric.name === name);
  }

  static clear(): void {
    this.metrics = [];
    this.marks.clear();
  }
}