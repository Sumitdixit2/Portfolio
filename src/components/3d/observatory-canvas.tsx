'use client';

import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import { PerformanceOrchestrator } from './performance-orchestrator';
import { usePerformanceStore } from '@/lib/performance-store';
import { CanvasErrorBoundary } from '@/components/ui/canvas-error-boundary';
import { ObservatoryScene } from './observatory-scene';
import { MotionValue } from 'framer-motion';

export function ObservatoryCanvas({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const dpr = usePerformanceStore((state) => state.dpr);

  return (
    <CanvasErrorBoundary fallbackLabel="OBSERVATORY_OFFLINE">
      <Canvas dpr={dpr} className="cursor-crosshair">
        <PerformanceOrchestrator />
        <color attach="background" args={['#020917']} />
        
        {/* Restrained peripheral fog: dissolves only extreme geometry edges */}
        <fog attach="fog" args={['#020917', 40, 90]} />

        <OrthographicCamera
          makeDefault
          position={[20, 20, 20]}
          zoom={50}
          near={-100}
          far={100}
          onUpdate={c => c.lookAt(0, 0, 0)}
        />

        {/* 3-light engineering photography rig */}
        {/* Key: crisp white from upper-right, reveals geometry edges */}
        <directionalLight position={[8, 14, 8]} intensity={5.0} color="#e6f1ff" />
        {/* Rim: teal from lower-back, carves silhouette from void */}
        <directionalLight position={[-10, -6, -12]} intensity={3.5} color="#64FFDA" />
        {/* Fill: warm-neutral from below, prevents crushed shadow reads */}
        <directionalLight position={[0, -8, 10]} intensity={1.8} color="#ccd6f6" />
        {/* Ambient: dark navy — barely hints at occluded geometry */}
        <ambientLight intensity={0.2} color="#0A192F" />

        <ObservatoryScene scrollProgress={scrollProgress} />
      </Canvas>
    </CanvasErrorBoundary>
  );
}
