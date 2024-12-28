```tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Twitter, Facebook, LinkedIn, Copy, Check } from 'lucide-react';
import { Event } from '../../../../types/event';
import { usePoints } from '../../../../hooks/usePoints';

interface EventShareProps {
  event: Event;
}

export const EventShare: React.FC<EventShareProps> = ({ event }) => {
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const { awardPoints } = usePoints();

  const shareUrl = `${window.location.origin}/events/${event.id}`;

  const handleShare = async (platform: string) => {
    awardPoints(15); // Award points for sharing
    
    switch (platform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `Check out ${event.title} on FunJetSetter! ${shareUrl}`
          )}`
        );
        break;
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        );
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
        );
        break;
      case 'copy':
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowShare(!showShare)}
        className="p-2 text-fjs-gold hover:bg-black/20 rounded-full"
      >
        <Share2 className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {showShare && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute right-0 mt-2 w-48 bg-fjs-charcoal rounded-lg shadow-lg overflow-hidden z-50"
          >
            <ShareButton
              icon={Twitter}
              label="Twitter"
              onClick={() => handleShare('twitter')}
            />
            <ShareButton
              icon={Facebook}
              label="Facebook"
              onClick={() => handleShare('facebook')}
            />
            <ShareButton
              icon={LinkedIn}
              label="LinkedIn"
              onClick={() => handleShare('linkedin')}
            />
            <ShareButton
              icon={copied ? Check : Copy}
              label={copied ? 'Copied!' : 'Copy Link'}
              onClick={() => handleShare('copy')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface ShareButtonProps {
  icon: React.FC<any>;
  label: string;
  onClick: () => void;
}

const ShareButton: React.FC<ShareButtonProps> = ({ icon: Icon, label, onClick }) => (
  <motion.button
    whileHover={{ x: 4 }}
    onClick={onClick}
    className="w-full flex items-center px-4 py-2 text-fjs-silver hover:text-fjs-gold hover:bg-black/20"
  >
    <Icon className="w-4 h-4 mr-2" />
    <span>{label}</span>
  </motion.button>
);
```