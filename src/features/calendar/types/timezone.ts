```typescript
export interface TimeZoneSettings {
  timeZone: string;
  displayFormat: '12h' | '24h';
  showSecondaryTimeZone: boolean;
  secondaryTimeZone?: string;
}

export interface TimeZoneInfo {
  id: string;
  name: string;
  offset: number;
  abbreviation: string;
}
```