export class EventBatcher {
  private static batchSize = 50;
  private static batchDelay = 16; // ~1 frame at 60fps

  static async processBatch<T, R>(
    items: T[],
    processor: (item: T) => Promise<R>,
    onProgress?: (progress: number) => void
  ): Promise<R[]> {
    const results: R[] = [];
    const totalBatches = Math.ceil(items.length / this.batchSize);

    for (let i = 0; i < items.length; i += this.batchSize) {
      const batch = items.slice(i, i + this.batchSize);
      const batchResults = await Promise.all(batch.map(processor));
      results.push(...batchResults);

      if (onProgress) {
        onProgress((i + batch.length) / items.length * 100);
      }

      if (i + this.batchSize < items.length) {
        await new Promise(resolve => setTimeout(resolve, this.batchDelay));
      }
    }

    return results;
  }
}