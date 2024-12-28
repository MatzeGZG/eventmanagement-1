```typescript
export class WorkerPool {
  private static workers: Worker[] = [];
  private static taskQueue: Array<() => Promise<any>> = [];
  private static maxWorkers = navigator.hardwareConcurrency || 4;

  static async execute<T>(task: () => Promise<T>): Promise<T> {
    if (this.workers.length < this.maxWorkers) {
      const worker = new Worker(
        new URL('./worker.ts', import.meta.url),
        { type: 'module' }
      );
      this.workers.push(worker);
    }

    return new Promise((resolve, reject) => {
      this.taskQueue.push(async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      this.processQueue();
    });
  }

  private static async processQueue(): Promise<void> {
    while (this.taskQueue.length > 0) {
      const task = this.taskQueue.shift();
      if (task) {
        await task();
      }
    }
  }

  static cleanup(): void {
    this.workers.forEach(worker => worker.terminate());
    this.workers = [];
    this.taskQueue = [];
  }
}
```