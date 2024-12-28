```typescript
import { useState, useEffect, useRef, useCallback } from 'react';

export const useVoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [visualizerData, setVisualizerData] = useState<number[]>(Array(30).fill(0));
  
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const dataArray = useRef<Uint8Array | null>(null);
  const startTime = useRef<number>(0);
  const animationFrame = useRef<number>();

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Set up audio analysis
      audioContext.current = new AudioContext();
      analyser.current = audioContext.current.createAnalyser();
      const source = audioContext.current.createMediaStreamSource(stream);
      source.connect(analyser.current);
      
      analyser.current.fftSize = 64;
      dataArray.current = new Uint8Array(analyser.current.frequencyBinCount);
      
      // Set up recording
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.start();
      startTime.current = Date.now();
      setIsRecording(true);
      
      // Start visualization
      const updateVisualizer = () => {
        if (!analyser.current || !dataArray.current) return;
        
        analyser.current.getByteFrequencyData(dataArray.current);
        const normalizedData = Array.from(dataArray.current)
          .slice(0, 30)
          .map(value => value / 255);
        
        setVisualizerData(normalizedData);
        setRecordingTime(Date.now() - startTime.current);
        
        animationFrame.current = requestAnimationFrame(updateVisualizer);
      };
      
      updateVisualizer();
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (!mediaRecorder.current) return;

    return new Promise<Blob>((resolve) => {
      mediaRecorder.current!.ondataavailable = (event) => {
        resolve(event.data);
      };
      
      mediaRecorder.current!.stop();
      audioContext.current?.close();
      setIsRecording(false);
      setRecordingTime(0);
      
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    });
  }, []);

  useEffect(() => {
    return () => {
      if (audioContext.current) {
        audioContext.current.close();
      }
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return {
    isRecording,
    startRecording,
    stopRecording,
    recordingTime,
    visualizerData
  };
};
```