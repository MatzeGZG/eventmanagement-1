import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Star } from 'lucide-react';
import { useEngagementPrompts } from '../hooks/useEngagementPrompts';

export const EngagementPrompts: React.FC = () => {
  const { prompts, dismissPrompt, handleAction } = useEngagementPrompts();

  if (prompts.length === 0) return null;

  return (
    <div className="space-y-4">
      {prompts.map((prompt) => (
        <motion.div
          key={prompt.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="bg-fjs-charcoal rounded-lg p-4 flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-black/30 rounded-lg">
              {prompt.type === 'event' && <Calendar className="w-5 h-5 text-fjs-gold" />}
              {prompt.type === 'social' && <Users className="w-5 h-5 text-fjs-gold" />}
              {prompt.type === 'rewards' && <Star className="w-5 h-5 text-fjs-gold" />}
            </div>
            <div>
              <h3 className="font-medium text-white">{prompt.title}</h3>
              <p className="text-sm text-fjs-silver">{prompt.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleAction(prompt)}
              className="px-4 py-2 bg-gradient-gold text-black rounded-lg font-medium"
            >
              {prompt.actionText}
            </button>
            <button
              onClick={() => dismissPrompt(prompt.id)}
              className="p-2 text-fjs-silver hover:text-white rounded-lg"
            >
              ×
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};