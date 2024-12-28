import React from 'react';
import { motion } from 'framer-motion';
import { calculatePasswordStrength } from '../../../../utils/security/passwordStrength';

interface PasswordStrengthIndicatorProps {
  password: string;
  visible: boolean;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password,
  visible
}) => {
  if (!visible) return null;

  const { score, feedback, requirements } = calculatePasswordStrength(password);
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-emerald-500'];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-2 p-3 bg-black/20 rounded-lg"
    >
      {/* Strength Bar */}
      <div className="h-2 bg-black/30 rounded-full overflow-hidden mb-3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(score / 4) * 100}%` }}
          className={`h-full transition-colors ${strengthColors[score]}`}
        />
      </div>

      {/* Requirements */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        {Object.entries(requirements).map(([key, met]) => (
          <div key={key} className="flex items-center space-x-2">
            <div className={`w-1.5 h-1.5 rounded-full ${met ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className={met ? 'text-fjs-silver' : 'text-red-500'}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
          </div>
        ))}
      </div>

      {/* Feedback */}
      {feedback.length > 0 && (
        <div className="mt-2 text-sm text-fjs-silver">
          {feedback[0]}
        </div>
      )}
    </motion.div>
  );
};