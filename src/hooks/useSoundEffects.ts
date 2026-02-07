import { useRef, useCallback, useState } from 'react';

type SoundType = 'pencil' | 'scribble' | 'heartbeat' | 'chime';

// Using Web Audio API for synthesized sounds
export function useSoundEffects() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lovecalc-muted') === 'true';
    }
    return false;
  });

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playPencilSound = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    
    // Create noise for pencil scratch
    const bufferSize = ctx.sampleRate * 0.05;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.1;
    }
    
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 2000;
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();
  }, [isMuted, getAudioContext]);

  const playScribbleSound = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    
    // Quick scribble sound
    const oscillator = ctx.createOscillator();
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.08);
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.08);
  }, [isMuted, getAudioContext]);

  const playHeartbeatSound = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    
    // Two-beat heartbeat sound
    const playBeat = (delay: number) => {
      const oscillator = ctx.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(80, ctx.currentTime + delay);
      oscillator.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + delay + 0.15);
      
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + 0.15);
      
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start(ctx.currentTime + delay);
      oscillator.stop(ctx.currentTime + delay + 0.15);
    };
    
    playBeat(0);
    playBeat(0.15);
  }, [isMuted, getAudioContext]);

  const playChimeSound = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    
    // Celebratory chime
    const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    
    frequencies.forEach((freq, index) => {
      const oscillator = ctx.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.value = freq;
      
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + index * 0.1;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.8);
      
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.8);
    });
  }, [isMuted, getAudioContext]);

  const playSound = useCallback((type: SoundType) => {
    if (isMuted) return;
    
    switch (type) {
      case 'pencil':
        playPencilSound();
        break;
      case 'scribble':
        playScribbleSound();
        break;
      case 'heartbeat':
        playHeartbeatSound();
        break;
      case 'chime':
        playChimeSound();
        break;
    }
  }, [isMuted, playPencilSound, playScribbleSound, playHeartbeatSound, playChimeSound]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newValue = !prev;
      localStorage.setItem('lovecalc-muted', String(newValue));
      return newValue;
    });
  }, []);

  return { playSound, isMuted, toggleMute };
}
