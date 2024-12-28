import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Users, Calendar } from 'lucide-react';
import { StepProps } from './types';
import { StepButtons } from '../StepButtons';

export const WelcomeStep: React.FC<StepProps> = ({ 
  formData, 
  onComplete,
  isLastStep 
}) => {
  const features = [
    {
      icon: Trophy,
      title: 'Level Up',
      description: 'Earn points and unlock exclusive benefits'
    },
    {
      icon: Star,
      title: 'Discover Events',
      description: 'Find amazing experiences near you'
    },
    {
      icon: Users,
      title: 'Connect',
      description: 'Meet like-minded people'
    },
    {
      icon: Calendar,
      title: 'Stay Organized',
      description: 'Track your events and RSVPs'
    }
  ];

  return (
    <div className="text-center space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-fjs-gold mb-2">
          Welcome to FunJetSetter, {formData.name}!
        </h2>
        <p className="text-fjs-silver">
          Your account is ready. Here's what you can do:
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/30 p-4 rounded-xl text-left"
          >
            <feature.icon className="w-8 h-8 text-fjs-gold mb-2" />
            <h3 className="font-medium text-white mb-1">{feature.title}</h3>
            <p className="text-sm text-fjs-silver">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-fjs-gold/20 to-transparent p-6 rounded-xl">
        <h3 className="text-fjs-gold font-medium mb-2">Get Started Now!</h3>
        <p className="text-fjs-silver text-sm mb-4">
          Complete your first action to earn points and start your journey.
        </p>
        <StepButtons
          onComplete={onComplete}
          isLastStep={isLastStep}
          nextLabel="Start Exploring"
        />
      </div>
    </div>
  );
};