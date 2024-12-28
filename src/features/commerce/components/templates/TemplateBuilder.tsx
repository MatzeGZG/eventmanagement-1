```tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Save, Copy } from 'lucide-react';
import { TemplateConfig } from '../../types';
import { useTemplateManager } from '../../hooks/useTemplateManager';

interface TemplateBuilderProps {
  initialTemplate?: TemplateConfig;
  onSave: (template: TemplateConfig) => void;
}

export const TemplateBuilder: React.FC<TemplateBuilderProps> = ({
  initialTemplate,
  onSave
}) => {
  const [template, setTemplate] = useState(initialTemplate);
  const { saveTemplate, duplicateTemplate } = useTemplateManager();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Layout className="w-6 h-6 text-fjs-gold" />
          <h2 className="text-xl font-semibold text-fjs-gold">
            Template Builder
          </h2>
        </div>
        
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => template && duplicateTemplate(template)}
            className="p-2 text-fjs-gold hover:bg-fjs-charcoal rounded-lg"
          >
            <Copy className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => template && saveTemplate(template)}
            className="p-2 text-fjs-gold hover:bg-fjs-charcoal rounded-lg"
          >
            <Save className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Template builder UI components */}
    </div>
  );
};
```