```typescript
import { useState, useCallback } from 'react';
import { useStore } from '../../../store';

export const useInterestLearning = () => {
  const [weights, setWeights] = useState<Record<string, number>>({});
  const user = useStore(state => state.user);

  const updateInterestWeight = useCallback((interestId: string, interaction: {
    type: 'view' | 'click' | 'attend';
    duration?: number;
    frequency?: number;
  }) => {
    setWeights(prev => {
      const currentWeight = prev[interestId] || 1.0;
      const interactionScore = calculateInteractionScore(interaction);
      
      return {
        ...prev,
        [interestId]: Math.min(2.0, currentWeight + interactionScore)
      };
    });
  }, []);

  const getSuggestedInterests = useCallback(() => {
    const userInterests = user?.interests || [];
    const weightedInterests = Object.entries(weights)
      .sort(([, a], [, b]) => b - a)
      .filter(([id]) => !userInterests.includes(id))
      .slice(0, 5)
      .map(([id]) => id);

    return weightedInterests;
  }, [weights, user]);

  return {
    weights,
    updateInterestWeight,
    getSuggestedInterests
  };
};

const calculateInteractionScore = (interaction: {
  type: 'view' | 'click' | 'attend';
  duration?: number;
  frequency?: number;
}): number => {
  const baseScores = {
    view: 0.1,
    click: 0.3,
    attend: 0.6
  };

  let score = baseScores[interaction.type];

  if (interaction.duration) {
    score *= Math.min(2, interaction.duration / 3600); // Duration boost based on hours
  }

  if (interaction.frequency) {
    score *= Math.min(2, interaction.frequency / 5); // Frequency boost
  }

  return score;
};
```