import { CalendarEvent } from '../types';

export interface CalendarProvider {
  id: string;
  name: string;
  type: 'google' | 'apple' | 'microsoft';
  connected: boolean;
  lastSynced?: Date;
}

export interface SyncConfig {
  provider: CalendarProvider;
  syncDirection: 'import' | 'export' | 'both';
  autoSync: boolean;
  syncInterval: number; // in minutes
}

export interface SyncResult {
  success: boolean;
  provider: CalendarProvider;
  eventsAdded: number;
  eventsUpdated: number;
  error?: string;
  timestamp: Date;
}