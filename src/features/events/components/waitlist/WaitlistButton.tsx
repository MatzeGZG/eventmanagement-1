```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import { useWaitlist } from '../../hooks/useWaitlist';
import { useStore } from '../../../../store';

interface WaitlistButtonProps {
  eventId: string;
  disabled?: boolean;
}

export const WaitlistButton: React.FC<WaitlistButtonProps> = ({ 
  eventId,
  disabled 
}) => {
  const { loading, addToWaitlist } = useWaitlist(eventId);
  const user = useStore(state => state.user);

  const handleClick = async () => {
    if (!user) return;
    await addToWaitlist(user.id);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      disabled={disabled || loading}
      className="flex items-center px-4 py-2 bg-fjs-gold text-black rounded-lg font-medium disabled:opacity-50"
    >
      <UserPlus className="w-5 h-5 mr-2" />
      {loading ? 'Joining Waitlist...' : 'Join Waitlist'}
    </motion.button>
  );
};
```