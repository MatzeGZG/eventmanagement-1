```typescript
export class EventBatcher {
  private static readonly BATCH_SIZE = 50;
  private static readonly BATCH_DELAY = 16; // ~1 frame at 60fps

  static async processBatch<T, R>(
    items: T[],
    processor: (item: T) => Promise<R>,
    onProgress?: (progress: number) => void
  ): Promise<R[]> {
    const results: R[] = [];
    const totalBatches = Math.ceil(items.length / this.BATCH_SIZE);

    for (let i = 0; i < items.length; i += this.BATCH_SIZE) {
      const batch = items.slice(i, i + this.BATCH_SIZE);
      const batchResults = await Promise.all(batch.map(processor));
      results.push(...batchResults);

      if (onProgress) {
        onProgress((i + batch.length) / items.length * 100);
      }

      if (i + this.BATCH_SIZE < items.length) {
        await new Promise(resolve => setTimeout(resolve, this.BATCH_DELAY));
      }
    }

    return results;
  }
}
```