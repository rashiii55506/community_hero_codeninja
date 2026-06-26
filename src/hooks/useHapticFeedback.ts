import { useCallback } from 'react';

export function useHapticFeedback() {
  const triggerVibrate = useCallback((pattern: number | number[] = 15) => {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      try {
        window.navigator.vibrate(pattern);
      } catch (e) {
        console.warn('Vibration failed', e);
      }
    }
  }, []);

  const playClickSound = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;
        
        const audioCtx = new AudioContextClass();
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        const now = audioCtx.currentTime;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, now);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        
        osc.start(now);
        osc.stop(now + 0.1);
      } catch (e) {
        console.warn('Audio play failed', e);
      }
    }
  }, []);

  const trigger = useCallback((pattern: number | number[] = 15) => {
    triggerVibrate(pattern);
    playClickSound();
  }, [triggerVibrate, playClickSound]);

  return { triggerVibrate, playClickSound, trigger };
}
