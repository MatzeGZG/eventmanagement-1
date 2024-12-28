```typescript
export type ViewMode = 'map' | 'calendar' | 'list';

export interface ViewTransition {
  from: ViewMode;
  to: ViewMode;
  timestamp: number;
}

export interface ViewState {
  currentView: ViewMode;
  transitioning: boolean;
  previousView?: ViewMode;
}
```