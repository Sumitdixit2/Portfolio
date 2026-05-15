'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

// --- BLUEPRINT MATERIAL PALETTE — Assembly Rings ---
const MAT_GRAPHITE = new THREE.MeshStandardMaterial({
  color: '#020617',      // near-void — ring rail backbone
  roughness: 0.9,
  metalness: 0.1,
});

const MAT_ALLOY = new THREE.MeshStandardMaterial({
  color: '#07111F',      // deep navy — segmented shielding panels
  roughness: 0.75,
  metalness: 0.2,
});

const MAT_WIRE = new THREE.MeshBasicMaterial({
  color: '#64FFDA',
  wireframe: true,
  transparent: true,
  opacity: 0.08,         // barely visible — just enough for CAD drafting feel
});

export function AssemblyRings({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const ringGroup1 = useRef<THREE.Group>(null);
  const ringGroup2 = useRef<THREE.Group>(null);
  const supportFrames = useRef<THREE.Group>(null);

  useFrame((state) => {
    const rawP = scrollProgress.get();
    // Rings explode after shell — 0.22→0.37 of scroll (~210vh at 1400vh total)
    const p = Math.max(0, Math.min(1, (rawP - 0.22) * 6.667));
    const t = state.clock.elapsedTime;

    // ── Upper ring: primary CW rotation + Y micro-oscillation after separation ──
    if (ringGroup1.current) {
      // Slow rotation that accelerates slightly during separation
      ringGroup1.current.rotation.y = t * 0.12 + p * 0.3;
      // Base separation + calibration vertical oscillation (active balancing)
      ringGroup1.current.position.y = p * 1.8 + Math.sin(t * 0.22) * 0.06 * p;
      // Radial expansion + micro breath
      const scale = 1 + p * 0.15 + Math.sin(t * 0.4) * 0.008 * p;
      ringGroup1.current.scale.set(scale, 1, scale);
      // Subtle tilt on separation axis — mechanical resonance
      ringGroup1.current.rotation.x = Math.sin(t * 0.18) * 0.02 * p;
    }

    // ── Lower ring: CCW, offset frequency from upper (creates asynchrony) ──
    if (ringGroup2.current) {
      ringGroup2.current.rotation.y = -(t * 0.09 + p * 0.2);
      // Phase-offset vertical oscillation (never in sync with upper)
      ringGroup2.current.position.y = -(p * 1.8 + Math.sin(t * 0.22 + Math.PI * 0.7) * 0.06 * p);
      const scale = 1 + p * 0.15 + Math.sin(t * 0.4 + Math.PI) * 0.008 * p;
      ringGroup2.current.scale.set(scale, 1, scale);
      ringGroup2.current.rotation.x = Math.sin(t * 0.18 + 1.1) * 0.02 * p;
    }

    // ── Relay frames: slow secondary structural drift after radial explosion ──
    if (supportFrames.current) {
      // Very slow oscillating rotation — frame flex / thermal expansion feel
      supportFrames.current.rotation.y = t * 0.035 + Math.sin(t * 0.15) * 0.04;
      const explode = 1 + p * 1.5 + Math.sin(t * 0.2) * 0.015 * p;
      supportFrames.current.scale.set(explode, 1, explode);
    }
  });

  return (
    <group>
      {/* Upper Stabilization Ring */}
      <group ref={ringGroup1}>
        <mesh material={MAT_GRAPHITE} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.06, 16, 64]} />
        </mesh>
        {/* Segmented Panels */}
        {[...Array(8)].map((_, i) => (
          <mesh key={i} material={MAT_ALLOY} rotation={[0, (i * Math.PI) / 4, 0]}>
            <cylinderGeometry args={[1.55, 1.55, 0.1, 16, 1, false, 0, 0.4]} />
          </mesh>
        ))}
      </group>

      {/* Lower Stabilization Ring */}
      <group ref={ringGroup2}>
        <mesh material={MAT_GRAPHITE} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.06, 16, 64]} />
        </mesh>
        {[...Array(8)].map((_, i) => (
          <mesh key={i} material={MAT_ALLOY} rotation={[0, (i * Math.PI) / 4, 0]}>
            <cylinderGeometry args={[1.55, 1.55, 0.1, 16, 1, false, 0, 0.4]} />
          </mesh>
        ))}
      </group>

      {/* Mechanical Relay Arms / Structural Frames */}
      <group ref={supportFrames}>
        {[...Array(4)].map((_, i) => (
          <group key={i} rotation={[0, (i * Math.PI) / 2, 0]}>
            {/* Vertical Arm */}
            <mesh material={MAT_GRAPHITE} position={[1.8, 0, 0]}>
              <boxGeometry args={[0.1, 4.0, 0.2]} />
            </mesh>
            {/* Wireframe Outline for CAD look */}
            <mesh material={MAT_WIRE} position={[1.8, 0, 0]}>
              <boxGeometry args={[0.15, 4.1, 0.25]} />
            </mesh>
            {/* Connection joints */}
            <mesh material={MAT_ALLOY} position={[1.75, 1.8, 0]}>
              <boxGeometry args={[0.2, 0.2, 0.25]} />
            </mesh>
            <mesh material={MAT_ALLOY} position={[1.75, -1.8, 0]}>
              <boxGeometry args={[0.2, 0.2, 0.25]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
