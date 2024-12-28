import { useCallback, useRef } from 'react';

export const useChatSounds = () => {
  const audioContext = useRef<AudioContext | null>(null);
  const gainNode = useRef<GainNode | null>(null);

  const initAudio = useCallback(() => {
    if (!audioContext.current) {
      audioContext.current = new AudioContext();
      gainNode.current = audioContext.current.createGain();
      gainNode.current.connect(audioContext.current.destination);
      gainNode.current.gain.value = 0.2; // Lower volume
    }
  }, []);

  const playSound = useCallback((type: 'message' | 'notification' | 'reaction') => {
    initAudio();
    if (!audioContext.current || !gainNode.current) return;

    const oscillator = audioContext.current.createOscillator();
    const now = audioContext.current.currentTime;

    switch (type) {
      case 'message':
        oscillator.frequency.setValueAtTime(440, now);
        oscillator.frequency.exponentialRampToValueAtTime(880, now + 0.1);
        break;
      case 'notification':
        oscillator.frequency.setValueAtTime(660, now);
        oscillator.frequency.exponentialRampToValueAtTime(880, now + 0.2);
        break;
      case 'reaction':
        oscillator.frequency.setValueAtTime(330, now);
        oscillator.frequency.exponentialRampToValueAtTime(440, now + 0.05);
        break;
    }

    oscillator.connect(gainNode.current);
    oscillator.start(now);
    oscillator.stop(now + 0.2);
  }, [initAudio]);

  return { playSound };
};