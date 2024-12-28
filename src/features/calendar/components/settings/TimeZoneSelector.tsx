```typescript
import React from 'react';
import { Clock, Globe } from 'lucide-react';
import { useTimeZone } from '../../hooks/useTimeZone';
import { TimeZoneSettings } from '../../types/timezone';

interface TimeZoneSelectorProps {
  onSettingsChange: (settings: TimeZoneSettings) => void;
}

export const TimeZoneSelector: React.FC<TimeZoneSelectorProps> = ({
  onSettingsChange
}) => {
  const { settings, getTimeZones, updateSettings } = useTimeZone();
  const timeZones = getTimeZones();

  const handleSettingChange = <K extends keyof TimeZoneSettings>(
    key: K,
    value: TimeZoneSettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    updateSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-fjs-silver mb-2">
          Primary Time Zone
        </label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-fjs-gold w-5 h-5" />
          <select
            value={settings.timeZone}
            onChange={(e) => handleSettingChange('timeZone', e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black text-white rounded-lg border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
          >
            {timeZones.map((tz) => (
              <option key={tz.id} value={tz.id}>
                {tz.name} ({tz.abbreviation}, GMT{tz.offset >= 0 ? '+' : ''}{tz.offset})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-fjs-silver mb-2">
          Time Format
        </label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="12h"
              checked={settings.displayFormat === '12h'}
              onChange={() => handleSettingChange('displayFormat', '12h')}
              className="text-fjs-gold focus:ring-fjs-gold"
            />
            <span className="text-white">12-hour</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="24h"
              checked={settings.displayFormat === '24h'}
              onChange={() => handleSettingChange('displayFormat', '24h')}
              className="text-fjs-gold focus:ring-fjs-gold"
            />
            <span className="text-white">24-hour</span>
          </label>
        </div>
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.showSecondaryTimeZone}
            onChange={(e) => handleSettingChange('showSecondaryTimeZone', e.target.checked)}
            className="text-fjs-gold rounded focus:ring-fjs-gold"
          />
          <span className="text-white">Show secondary time zone</span>
        </label>

        {settings.showSecondaryTimeZone && (
          <div className="mt-2">
            <select
              value={settings.secondaryTimeZone}
              onChange={(e) => handleSettingChange('secondaryTimeZone', e.target.value)}
              className="w-full px-4 py-2 bg-black text-white rounded-lg border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
            >
              <option value="">Select secondary time zone</option>
              {timeZones.map((tz) => (
                <option key={tz.id} value={tz.id}>
                  {tz.name} ({tz.abbreviation})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};
```