'use client';

import { useState, useRef, useEffect } from 'react';
import { AudioLines, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BackgroundAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);
    // We intentionally don't autoplay on mount to respect browser policies.
    // The user must click the button to start the audio.
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.volume = 0.3; // Subtle background volume
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  if (!mounted) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src="/art-deco.mp3"
        loop
        preload="auto"
      />
      
      <button 
        onClick={togglePlay}
        className={cn(
          "fixed bottom-6 left-6 z-40 p-4 rounded-none bg-surface border border-border shadow-2xl transition-colors group flex items-center gap-2",
          isPlaying ? "hover:bg-surface/80" : "hover:bg-surface/80"
        )}
        aria-label="Toggle background music"
      >
        {isPlaying ? (
          <AudioLines className="w-5 h-5 text-accent animate-pulse" />
        ) : (
          <VolumeX className="w-5 h-5 text-muted group-hover:text-foreground transition-colors" />
        )}
        <span className="hidden sm:inline-block text-xs font-mono transition-colors tracking-wider flex-none min-w-[60px] text-left text-muted group-hover:text-foreground">
          {isPlaying ? 'SYS_BGM' : 'BGM_OFF'}
        </span>
      </button>
    </>
  );
}
