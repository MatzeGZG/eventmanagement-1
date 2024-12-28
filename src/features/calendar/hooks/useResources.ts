```typescript
import { useState, useCallback } from 'react';
import { useStore } from '../../../store';

interface Resource {
  id: string;
  name: string;
  type: string;
  capacity: number;
  availability?: {
    start: string;
    end: string;
    days: number[];
  };
}

export const useResources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(false);

  const addResource = useCallback((resource: Omit<Resource, 'id'>) => {
    setResources(prev => [...prev, {
      ...resource,
      id: crypto.randomUUID()
    }]);
  }, []);

  const updateResource = useCallback((id: string, updates: Partial<Resource>) => {
    setResources(prev => prev.map(resource =>
      resource.id === id ? { ...resource, ...updates } : resource
    ));
  }, []);

  const deleteResource = useCallback((id: string) => {
    setResources(prev => prev.filter(resource => resource.id !== id));
  }, []);

  const checkAvailability = useCallback((
    resourceId: string,
    date: Date
  ): boolean => {
    const resource = resources.find(r => r.id === resourceId);
    if (!resource?.availability) return true;

    const { start, end, days } = resource.availability;
    const [startHour] = start.split(':').map(Number);
    const [endHour] = end.split(':').map(Number);
    
    return (
      days.includes(date.getDay()) &&
      date.getHours() >= startHour &&
      date.getHours() < endHour
    );
  }, [resources]);

  return {
    resources,
    loading,
    addResource,
    updateResource,
    deleteResource,
    checkAvailability
  };
};
```