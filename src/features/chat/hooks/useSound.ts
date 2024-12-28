```typescript
import { useCallback, useRef } from 'react';

export const useSound = () => {
  const audioContext = useRef<AudioContext | null>(null);
  const gainNode = useRef<GainNode | null>(null);

  const initAudio = useCallback(() => {
    if (!audioContext.current) {
      audioContext.current = new AudioContext();
      gainNode.current = audioContext.current.createGain();
      gainNode.current.connect(audioContext.current.destination);
      gainNode.current.gain.value = 0.1; // Low volume by default
    }
  }, []);

  const playTypingSound = useCallback(() => {
    initAudio();
    if (!audioContext.current || !gainNode.current) return;

    const oscillator = audioContext.current.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.current.currentTime);
    
    oscillator.connect(gainNode.current);
    oscillator.start();
    oscillator.stop(audioContext.current.currentTime + 0.05);
  }, [initAudio]);

  const playMessageSound = useCallback((type: 'send' | 'receive') => {
    initAudio();
    if (!audioContext.current || !gainNode.current) return;

    const oscillator = audioContext.current.createOscillator();
    oscillator.type = 'sine';
    
    // Different frequencies for send/receive
    const frequency = type === 'send' ? 660 : 440;
    oscillator.frequency.setValueAtTime(frequency, audioContext.current.currentTime);
    
    oscillator.connect(gainNode.current);
    oscillator.start();
    oscillator.stop(audioContext.current.currentTime + 0.1);
  }, [initAudio]);

  return {
    playTypingSound,
    playMessageSound
  };
};
```