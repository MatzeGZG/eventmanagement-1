```typescript
import { useState, useCallback, useEffect } from 'react';
import { Event } from '../../../types/event';

interface WeatherInfo {
  temperature: number;
  condition: string;
  icon: string;
  precipitation: number;
}

export const useWeatherIntegration = () => {
  const [weatherCache, setWeatherCache] = useState<Map<string, WeatherInfo>>(new Map());

  const getEventWeather = useCallback(async (event: Event): Promise<WeatherInfo | null> => {
    const cacheKey = `${event.id}-${event.date.toISOString()}`;
    
    if (weatherCache.has(cacheKey)) {
      return weatherCache.get(cacheKey)!;
    }

    try {
      // Mock weather API call - replace with actual weather API
      const weather = await mockWeatherAPI(event.location.coordinates);
      setWeatherCache(prev => new Map(prev).set(cacheKey, weather));
      return weather;
    } catch (error) {
      console.error('Failed to fetch weather:', error);
      return null;
    }
  }, [weatherCache]);

  const shouldWarnWeather = useCallback((weather: WeatherInfo): boolean => {
    return (
      weather.precipitation > 50 || // >50% chance of rain
      weather.temperature < 0 || // Below freezing
      weather.temperature > 35 // Very hot
    );
  }, []);

  return {
    getEventWeather,
    shouldWarnWeather
  };
};

// Mock weather API - replace with actual implementation
const mockWeatherAPI = async (coordinates: { latitude: number; longitude: number }): Promise<WeatherInfo> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    temperature: Math.round(Math.random() * 30),
    condition: ['Sunny', 'Cloudy', 'Rainy', 'Stormy'][Math.floor(Math.random() * 4)],
    icon: '☀️',
    precipitation: Math.round(Math.random() * 100)
  };
};
```