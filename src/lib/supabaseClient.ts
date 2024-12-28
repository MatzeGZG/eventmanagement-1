```typescript
import { createClient } from '@supabase/supabase-js';
import { EnhancedErrorHandler } from '../utils/errorHandling/enhancedErrorHandler';
import { ErrorLogger } from '../utils/errorHandling/errorLogger';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

class SupabaseClient {
  private static instance = createClient(supabaseUrl, supabaseKey);
  private static cache = new Map<string, { data: any; timestamp: number }>();
  private static readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  static async query<T>(
    table: string,
    query: any,
    options: {
      cache?: boolean;
      optimistic?: boolean;
      offlineSupport?: boolean;
    } = {}
  ): Promise<{ data: T | null; error: Error | null }> {
    const cacheKey = `${table}-${JSON.stringify(query)}`;

    try {
      // Check cache first
      if (options.cache) {
        const cached = this.getFromCache<T>(cacheKey);
        if (cached) return { data: cached, error: null };
      }

      const { data, error } = await this.instance
        .from(table)
        .select(query);

      if (error) throw error;

      // Update cache
      if (options.cache) {
        this.setCache(cacheKey, data);
      }

      return { data: data as T, error: null };
    } catch (error) {
      await EnhancedErrorHandler.handleError(error, {
        component: 'SupabaseClient',
        action: 'query',
        metadata: { table, query }
      });

      ErrorLogger.log('DATABASE_ERROR', `Query failed for table ${table}`, {
        error,
        query
      });

      return { data: null, error: error as Error };
    }
  }

  private static getFromCache<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (!cached) return null;
    if (Date.now() - cached.timestamp > this.CACHE_TTL) {
      this.cache.delete(key);
      return null;
    }
    return cached.data;
  }

  private static setCache(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }
}

export const supabase = SupabaseClient;
```