import { PerformanceMonitor } from './performanceMonitor';

export class LazyLoader {
  private static loadedModules = new Set<string>();

  static async load<T>(
    moduleName: string,
    importFn: () => Promise<{ default: T } | T>
  ): Promise<T> {
    PerformanceMonitor.start(`lazy-load-${moduleName}`);

    try {
      if (this.loadedModules.has(moduleName)) {
        const module = await importFn();
        return 'default' in module ? module.default : module;
      }

      const module = await importFn();
      this.loadedModules.add(moduleName);
      
      PerformanceMonitor.end(`lazy-load-${moduleName}`);
      return 'default' in module ? module.default : module;
    } catch (error) {
      console.error(`Failed to load module ${moduleName}:`, error);
      throw error;
    }
  }

  static preload(moduleName: string, importFn: () => Promise<any>): void {
    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => this.load(moduleName, importFn));
    }
  }
}