```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock } from 'lucide-react';
import { EventTemplate } from '../../types/eventTemplate';
import { useEventTemplates } from '../../hooks/useEventTemplates';

interface TemplateSelectorProps {
  onSelect: (template: EventTemplate) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelect }) => {
  const { templates, loading } = useEventTemplates();

  if (loading) {
    return <div className="text-center text-fjs-silver">Loading templates...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map((template) => (
        <motion.button
          key={template.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(template)}
          className="bg-fjs-charcoal p-4 rounded-lg text-left hover:shadow-lg transition-shadow"
        >
          <h3 className="text-lg font-semibold text-fjs-gold mb-2">
            {template.name}
          </h3>
          <p className="text-sm text-fjs-silver mb-4">
            {template.description}
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center text-fjs-silver">
              <Clock className="w-4 h-4 mr-2" />
              {template.defaultSchedule.sessions.length} sessions
            </div>
            <div className="flex items-center text-fjs-silver">
              <Users className="w-4 h-4 mr-2" />
              Up to {template.defaultCapacity} attendees
            </div>
            <div className="flex items-center text-fjs-silver">
              <Calendar className="w-4 h-4 mr-2" />
              {template.type}
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
};
```