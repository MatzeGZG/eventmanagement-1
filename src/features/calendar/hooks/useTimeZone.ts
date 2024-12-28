```typescript
import { useState, useCallback } from 'react';
import { TimeZoneSettings } from '../types/timezone';

export const useTimeZone = () => {
  const [settings, setSettings] = useState<TimeZoneSettings>({
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    displayFormat: '12h',
    showSecondaryTimeZone: false
  });

  const formatToLocalTime = useCallback((date: Date, timeZone?: string) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timeZone || settings.timeZone,
      hour: 'numeric',
      minute: 'numeric',
      hour12: settings.displayFormat === '12h'
    }).format(date);
  }, [settings]);

  const updateSettings = useCallback((newSettings: Partial<TimeZoneSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const getTimeZoneOffset = useCallback((timeZone: string) => {
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('en', {
      timeZone,
      timeZoneName: 'short'
    });
    return formatter.formatToParts(date)
      .find(part => part.type === 'timeZoneName')?.value || '';
  }, []);

  return {
    settings,
    updateSettings,
    formatToLocalTime,
    getTimeZoneOffset
  };
};
```