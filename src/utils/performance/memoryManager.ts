```typescript
export class MemoryManager {
  private static disposables = new Set<() => void>();

  static register(cleanup: () => void): void {
    this.disposables.add(cleanup);
  }

  static dispose(cleanup: () => void): void {
    if (this.disposables.has(cleanup)) {
      cleanup();
      this.disposables.delete(cleanup);
    }
  }

  static disposeAll(): void {
    this.disposables.forEach(cleanup => {
      cleanup();
    });
    this.disposables.clear();
  }

  static getRegisteredCount(): number {
    return this.disposables.size;
  }
}
```