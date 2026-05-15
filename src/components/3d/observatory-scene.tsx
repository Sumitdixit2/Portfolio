'use client';

import { MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ReactorCore } from './reactor-core';
import { AssemblyRings } from './assembly-rings';
import { InstrumentationShell } from './instrumentation-shell';
import { AnnotationRails } from './annotation-rails';

function CalibrationGrid({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const gridRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const rawP = scrollProgress.get();
    
    if (gridRef.current) {
      gridRef.current.scale.setScalar(1 + rawP * 0.5);
      gridRef.current.rotation.y = -state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={gridRef}>
      {/* Ghosting containment sphere */}
      <mesh>
        <sphereGeometry args={[4.5, 32, 16]} />
        <meshBasicMaterial color="#64FFDA" wireframe transparent opacity={0.02} />
      </mesh>
      {/* Precision measurement rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.6, 4.62, 64]} />
        <meshBasicMaterial color="#8892B0" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <ringGeometry args={[4.6, 4.62, 64]} />
        <meshBasicMaterial color="#8892B0" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Outer measurement arcs */}
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <ringGeometry args={[5.2, 5.21, 64, 1, 0, Math.PI]} />
        <meshBasicMaterial color="#64FFDA" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
      {/* Precision Crosshairs */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 0.01]} />
        <meshBasicMaterial color="#64FFDA" transparent opacity={0.1} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.01, 14]} />
        <meshBasicMaterial color="#64FFDA" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

export function ObservatoryScene({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const drift = state.clock.elapsedTime * 0.03; // slower base drift — massive machine feel
      const rawP = scrollProgress.get();
      // Very slow drift + minimal scroll pan (PI/4 = 45° across full 1400vh)
      groupRef.current.rotation.y = drift + rawP * (Math.PI / 4);
      groupRef.current.rotation.x = Math.sin(drift) * 0.06 + rawP * 0.08;
      groupRef.current.rotation.z = Math.cos(drift) * 0.03 - rawP * 0.03;
    }
  });

  return (
    <group ref={groupRef} scale={[0.85, 0.85, 0.85]}>
      <CalibrationGrid scrollProgress={scrollProgress} />
      <ReactorCore scrollProgress={scrollProgress} />
      <AssemblyRings scrollProgress={scrollProgress} />
      <InstrumentationShell scrollProgress={scrollProgress} />
      <AnnotationRails scrollProgress={scrollProgress} />
    </group>
  );
}
