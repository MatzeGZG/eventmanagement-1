```typescript
export interface EventTemplate {
  id: string;
  name: string;
  description: string;
  type: 'conference' | 'festival' | 'workshop' | 'course';
  defaultSchedule: {
    startTime: string;
    endTime: string;
    sessions: {
      title: string;
      duration: number; // in minutes
      description?: string;
    }[];
  };
  defaultCapacity: number;
  pricing: {
    base: number;
    earlyBird?: number;
    group?: number;
  };
  settings: {
    allowWaitlist: boolean;
    maxWaitlistSize?: number;
    requiresApproval: boolean;
    autoConfirmation: boolean;
  };
}
```