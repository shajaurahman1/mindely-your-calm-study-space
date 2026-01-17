import { useCallback, useRef, useEffect } from 'react';

// Generate a soft, calming tone using Web Audio API
const createCalmSound = (audioContext: AudioContext, frequency: number, duration: number) => {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  oscillator.type = 'sine';
  
  // Soft fade in and out for calming effect
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.1);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
};

export const useSessionSound = (enabled: boolean) => {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize audio context on first user interaction
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };

    window.addEventListener('click', initAudio, { once: true });
    window.addEventListener('touchstart', initAudio, { once: true });

    return () => {
      window.removeEventListener('click', initAudio);
      window.removeEventListener('touchstart', initAudio);
    };
  }, []);

  const playStartFocusSound = useCallback(() => {
    if (!enabled) return;
    
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      
      // Soft ascending chime for focus start
      createCalmSound(ctx, 440, 0.4);
      setTimeout(() => createCalmSound(ctx, 554, 0.4), 150);
      setTimeout(() => createCalmSound(ctx, 659, 0.6), 300);
    } catch (e) {
      console.log('Audio not available');
    }
  }, [enabled]);

  const playStartBreakSound = useCallback(() => {
    if (!enabled) return;
    
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      
      // Soft descending chime for break start
      createCalmSound(ctx, 659, 0.4);
      setTimeout(() => createCalmSound(ctx, 554, 0.4), 150);
      setTimeout(() => createCalmSound(ctx, 440, 0.6), 300);
    } catch (e) {
      console.log('Audio not available');
    }
  }, [enabled]);

  return { playStartFocusSound, playStartBreakSound };
};
