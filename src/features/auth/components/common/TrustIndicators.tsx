import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Award, Lock } from 'lucide-react';

export const TrustIndicators: React.FC = () => {
  const indicators = [
    {
      icon: Shield,
      text: 'Bank-level security',
      subtext: '256-bit encryption'
    },
    {
      icon: Users,
      text: '10,000+ members',
      subtext: 'Join our community'
    },
    {
      icon: Award,
      text: 'Earn rewards',
      subtext: 'Start with 50 points'
    },
    {
      icon: Lock,
      text: 'Privacy first',
      subtext: 'Your data is safe'
    }
  ];

  return (
    <div className="mt-8 grid grid-cols-2 gap-4">
      {indicators.map((indicator, index) => (
        <motion.div
          key={indicator.text}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center text-center p-4 bg-black/30 rounded-lg"
        >
          <indicator.icon className="w-6 h-6 text-fjs-gold mb-2" />
          <span className="text-white font-medium">{indicator.text}</span>
          <span className="text-sm text-fjs-silver">{indicator.subtext}</span>
        </motion.div>
      ))}
    </div>
  );
};