```typescript
import React, { useState } from 'react';
import { Share2, Copy, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

interface CalendarShareModalProps {
  calendarId: string;
  onClose: () => void;
}

export const CalendarShareModal: React.FC<CalendarShareModalProps> = ({
  calendarId,
  onClose
}) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/calendar/${calendarId}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailShare = () => {
    const subject = 'Check out my calendar';
    const body = `I'd like to share my calendar with you: ${shareUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <div className="bg-fjs-charcoal rounded-xl p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold text-fjs-gold mb-4">Share Calendar</h2>
        
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="w-full bg-black text-white px-4 py-2 rounded-lg pr-24"
            />
            <button
              onClick={handleCopy}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-fjs-gold text-black rounded-md"
            >
              <div className="flex items-center">
                <Copy className="w-4 h-4 mr-1" />
                {copied ? 'Copied!' : 'Copy'}
              </div>
            </button>
          </div>

          <button
            onClick={handleEmailShare}
            className="w-full flex items-center justify-center px-4 py-2 bg-fjs-charcoal hover:bg-black/20 rounded-lg text-fjs-gold transition-colors"
          >
            <Mail className="w-5 h-5 mr-2" />
            Share via Email
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full px-4 py-2 bg-black/20 text-fjs-silver hover:text-white rounded-lg transition-colors"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
};
```