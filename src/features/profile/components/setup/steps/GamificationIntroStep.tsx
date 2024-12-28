import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Award, Flame } from 'lucide-react';
import { StepProps } from '../types';
import { StepButtons } from '../StepButtons';

export const GamificationIntroStep: React.FC<StepProps> = ({ 
  onComplete,
  onBack,
  isLastStep 
}) => {
  const features = [
    {
      icon: Trophy,
      title: 'Earn Points',
      description: 'Get rewarded for attending events and engaging with the community'
    },
    {
      icon: Star,
      title: 'Level Up',
      description: 'Progress through levels to unlock exclusive benefits and features'
    },
    {
      icon: Award,
      title: 'Collect Badges',
      description: 'Achieve milestones and showcase your accomplishments'
    },
    {
      icon: Flame,
      title: 'Maintain Streaks',
      description: 'Stay active to earn bonus points and special rewards'
    }
  ];

  return (
    <div className="space-y-8">
      <p className="text-fjs-silver">
        Welcome to FunJetSetter's rewards program! Start earning points and unlocking achievements.
      </p>

      <div className="grid grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/30 rounded-xl p-4 hover:bg-black/40 transition-colors"
          >
            <feature.icon className="w-8 h-8 text-fjs-gold mb-3" />
            <h3 className="text-white font-medium mb-1">{feature.title}</h3>
            <p className="text-sm text-fjs-silver">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-fjs-gold/20 to-transparent rounded-xl p-6">
        <h3 className="text-fjs-gold font-medium mb-2">Get Started Now!</h3>
        <p className="text-fjs-silver text-sm">
          Complete your profile setup to earn your first 50 points and the "Early Adopter" badge.
        </p>
      </div>

      <StepButtons 
        onNext={onComplete}
        onBack={onBack}
        isLastStep={isLastStep}
        nextLabel="Start Earning"
      />
    </div>
  );
};