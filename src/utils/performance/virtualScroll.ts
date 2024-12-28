```typescript
export class VirtualScroll {
  private static readonly BUFFER_SIZE = 5;
  private static readonly ROW_HEIGHT = 50;

  static getVisibleRange(
    scrollTop: number,
    viewportHeight: number,
    totalItems: number
  ) {
    const start = Math.floor(scrollTop / this.ROW_HEIGHT);
    const visibleCount = Math.ceil(viewportHeight / this.ROW_HEIGHT);
    const end = Math.min(start + visibleCount + this.BUFFER_SIZE, totalItems);

    return {
      start: Math.max(0, start - this.BUFFER_SIZE),
      end
    };
  }

  static getScrollHeight(totalItems: number): number {
    return totalItems * this.ROW_HEIGHT;
  }

  static getOffsetForIndex(index: number): number {
    return index * this.ROW_HEIGHT;
  }
}
```