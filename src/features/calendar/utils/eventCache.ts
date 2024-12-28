import { Event } from '../../../types/event';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export class EventCache {
  private static cache = new Map<string, CacheEntry<Event[]>>();
  private static TTL = 5 * 60 * 1000; // 5 minutes

  static set(key: string, events: Event[]): void {
    this.cache.set(key, {
      data: events,
      timestamp: Date.now()
    });
  }

  static get(key: string): Event[] | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.TTL) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  static clear(): void {
    this.cache.clear();
  }
}