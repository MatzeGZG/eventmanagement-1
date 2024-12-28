```typescript
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, Square, Play, Pause } from 'lucide-react';
import { useVoiceRecorder } from '../../hooks/useVoiceRecorder';

interface VoiceMessageProps {
  onRecord: (blob: Blob) => void;
}

export const VoiceMessage: React.FC<VoiceMessageProps> = ({ onRecord }) => {
  const { 
    isRecording, 
    startRecording, 
    stopRecording,
    recordingTime,
    visualizerData 
  } = useVoiceRecorder();

  return (
    <div className="flex items-center space-x-2">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={isRecording ? stopRecording : startRecording}
        className={`p-2 rounded-full transition-colors ${
          isRecording 
            ? 'bg-red-500 text-white' 
            : 'text-fjs-gold hover:bg-black/20'
        }`}
      >
        {isRecording ? (
          <Square className="w-5 h-5" />
        ) : (
          <Mic className="w-5 h-5" />
        )}
      </motion.button>

      {isRecording && (
        <div className="flex items-center space-x-2">
          <div className="flex items-center h-8 space-x-0.5">
            {visualizerData.map((value, index) => (
              <motion.div
                key={index}
                className="w-0.5 bg-fjs-gold"
                initial={{ height: 4 }}
                animate={{ height: Math.max(4, value * 32) }}
                transition={{ duration: 0.1 }}
              />
            ))}
          </div>
          <span className="text-sm text-fjs-silver">
            {formatTime(recordingTime)}
          </span>
        </div>
      )}
    </div>
  );
};

const formatTime = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};
```