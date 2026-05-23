import { create } from 'zustand';

interface PerformanceState {
  fpsTier: 'high' | 'low';
  dpr: number;
  setFpsTier: (tier: 'high' | 'low') => void;
  setDpr: (dpr: number) => void;
}

export const usePerformanceStore = create<PerformanceState>((set) => ({
  fpsTier: 'high',
  // Start at a maximum of 1.5 to prevent massive 3x/4x mobile screen pixel overhead
  // but maintain sharp CAD-grade lines. Never start below 1.0.
  dpr: typeof window !== 'undefined' ? Math.min(1.5, Math.max(1, window.devicePixelRatio || 1)) : 1,
  setFpsTier: (tier) => set({ fpsTier: tier }),
  setDpr: (dpr) => set({ dpr }),
}));
