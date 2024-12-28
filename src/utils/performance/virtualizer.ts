```typescript
interface VirtualizerOptions {
  itemHeight: number;
  overscan: number;
  containerHeight: number;
}

export class Virtualizer {
  private itemHeight: number;
  private overscan: number;
  private containerHeight: number;

  constructor(options: VirtualizerOptions) {
    this.itemHeight = options.itemHeight;
    this.overscan = options.overscan;
    this.containerHeight = options.containerHeight;
  }

  getVisibleRange(scrollTop: number): { start: number; end: number } {
    const start = Math.floor(scrollTop / this.itemHeight);
    const visibleCount = Math.ceil(this.containerHeight / this.itemHeight);
    const end = start + visibleCount + this.overscan;

    return {
      start: Math.max(0, start - this.overscan),
      end: end
    };
  }

  getScrollHeight(totalItems: number): number {
    return totalItems * this.itemHeight;
  }

  getOffsetForIndex(index: number): number {
    return index * this.itemHeight;
  }
}
```