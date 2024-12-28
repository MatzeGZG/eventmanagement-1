```typescript
import React from 'react';
import { Map, Calendar, List } from 'lucide-react';
import { motion } from 'framer-motion';

interface ViewControlsProps {
  currentView: 'map' | 'calendar' | 'list';
  onViewChange: (view: 'map' | 'calendar' | 'list') => void;
}

export const ViewControls: React.FC<ViewControlsProps> = ({
  currentView,
  onViewChange
}) => {
  const views = [
    { id: 'map', icon: Map, label: 'Map View' },
    { id: 'calendar', icon: Calendar, label: 'Calendar View' },
    { id: 'list', icon: List, label: 'List View' }
  ] as const;

  return (
    <div className="absolute top-4 right-4 bg-black/80 rounded-lg p-2 space-x-2">
      {views.map(({ id, icon: Icon, label }) => (
        <motion.button
          key={id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onViewChange(id)}
          className={`p-2 rounded-lg transition-colors ${
            currentView === id
              ? 'bg-fjs-gold text-black'
              : 'text-fjs-gold hover:bg-fjs-charcoal'
          }`}
          title={label}
        >
          <Icon className="w-5 h-5" />
        </motion.button>
      ))}
    </div>
  );
};
```