```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Zap, Shield, Calendar } from 'lucide-react';
import { BehavioralInsights } from '../../types/enhanced';

interface BehavioralInsightsCardProps {
  insights: BehavioralInsights;
}

export const BehavioralInsightsCard: React.FC<BehavioralInsightsCardProps> = ({ insights }) => {
  const traits = [
    {
      icon: Calendar,
      label: 'Planning Style',
      value: insights.planningStyle,
      description: 'How you prefer to organize events'
    },
    {
      icon: Zap,
      label: 'Social Energy',
      value: insights.socialEnergy,
      description: 'Your social interaction preference'
    },
    {
      icon: Clock,
      label: 'Decision Speed',
      value: insights.decisionSpeed,
      description: 'How quickly you make choices'
    },
    {
      icon: Shield,
      label: 'Risk Tolerance',
      value: insights.riskTolerance,
      description: 'Your comfort with new experiences'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-fjs-charcoal rounded-xl p-6"
    >
      <div className="flex items-center mb-4">
        <Sparkles className="w-6 h-6 text-fjs-gold mr-2" />
        <h3 className="text-lg font-semibold text-fjs-gold">Behavioral Profile</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {traits.map(({ icon: Icon, label, value, description }) => (
          <div key={label} className="bg-black/20 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Icon className="w-5 h-5 text-fjs-gold" />
              <div>
                <div className="font-medium text-white">{label}</div>
                <div className="text-sm text-fjs-silver">{description}</div>
              </div>
            </div>
            <div className="mt-2 px-3 py-1 bg-black/30 rounded-full inline-block">
              <span className="text-sm font-medium text-fjs-gold capitalize">
                {value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
```