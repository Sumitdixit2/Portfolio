'use client';

import { PerformanceMonitor } from '@react-three/drei';
import { usePerformanceStore } from '@/lib/performance-store';

export function PerformanceOrchestrator() {
  const { setFpsTier, setDpr } = usePerformanceStore();

  return (
    <PerformanceMonitor
      // Step 1: When FPS drops, disable complex math first. DO NOT blur the canvas.
      onDecline={() => {
        setFpsTier('low');
        // We do NOT reduce DPR here. Maintain crisp CAD-grade fidelity.
      }}
      onIncline={() => {
        // Recover if things stabilize
      }}
      // Monitor every 1 second of frames, debounce aggressive switches
      flipflops={3}
      // Step 2: If the device completely bottoms out after math bypass, 
      // conservatively floor the DPR at 1.0 (standard HD), but never lower than 1.0.
      onFallback={() => {
        setFpsTier('low');
        setDpr(1.0); // Never go below 1.0 to preserve sharp mechanical silhouettes
      }}
    />
  );
}
